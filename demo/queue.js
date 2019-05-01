const Client = require('cubic-client')
const inquirer = require('inquirer')
const auth = new Client({ api_url: 'ws://localhost:3030/ws' })
const name = require('random-name')
const user = name.first()

/**
 * Register dummy user
 */
async function register (user, user_secret) {
  return auth.post('/register', { user_id: user, user_secret })
}

/**
 * Queue for match
 */
async function queue () {
  // Register and login
  console.log(`Registering as ${user}`)
  const authUser = await register(user, 'test')
  console.log(`Registered with user key ${authUser.user_key} \n`)
  const client = new Client({
    user_key: authUser.user_key,
    user_secret: 'test'
  })

  // Queue
  console.log('Queueing for session...')
  const { sid } = await client.get('/queue')
  console.log('Found session:', sid, '\n')

  // Subscribe to session
  console.log(sid)
  client.subscribe(sid, data => {
    console.log(data)
  })

  return { client, sid }
}

/**
 * Input prompt
 */
async function prompt (client, sid) {
  const { input } = await inquirer.prompt({
    type: 'input',
    name: 'input',
    message: 'Enter an action (e.g. place card_name)\n'
  })
  const action = input.split(' ')[0]

  if (action === 'place') {
    const card = input.split(' ')[1]
    await client.post('/place', { sid, action: 'place', data: card })
    console.log('\n')
  }
  prompt(client, sid)
}

/**
 * Demo with user inputs
 */
async function demo () {
  const { client, sid } = await queue()
  await prompt(client, sid)
}
demo()