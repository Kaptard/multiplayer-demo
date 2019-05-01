const Endpoint = require('cubic-api/endpoint')
const uuid = require('uuid')

class Play extends Endpoint {
  constructor (options) {
    super(options)
    this.schema.method = 'POST'
  }

  async main (req, res) {
    const { action, data } = req.body
    this.publish({ user: req.user.uid, action, data }, req.body.sid)
    res.send(`${action}ed ${data}`)
  }
}

module.exports = Play
