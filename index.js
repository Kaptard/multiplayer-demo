const Cubic = require('cubic')
const cubic = new Cubic()
const Api = require('cubic-api')
const Auth = require('cubic-auth')

async function bootstrap () {
  await cubic.use(new Auth())
  await cubic.use(new Api())
}

bootstrap()