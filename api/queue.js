const Endpoint = require('cubic-api/endpoint')
const uuid = require('uuid')
const sleep = async (ms) => new Promise(resolve => setTimeout(resolve, ms))

class Join extends Endpoint {
  async main (req, res) {
    const user = req.user
    const queued = await this.db.collection('queue').findOne()

    // Already someone in the queue? Remove them from the queue and
    // create a session for them and the current player.
    if (queued) {
      const sid = uuid()
      await this.db.collection('queue').remove({ _id: queued._id })
      await this.db.collection('sessions').insert({
        sid,
        users: [queued.user, user]
      })
      res.send({ sid })
    } 
    
    // Nobody in the queue? Add this player to the queue and wait until
    // a session with our current user has been created.
    else {
      await this.db.collection('queue').insert({ user })
      await new Promise(async resolve => {
        while (true) {
          const session = await this.db.collection('sessions').findOne({ users: user })
          if (session) {
            res.send({ sid: session.sid })
            resolve()
            break
          }
          await sleep(500)
        }
      })
    }
  }
}

module.exports = Join