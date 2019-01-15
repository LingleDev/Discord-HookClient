const snekfetch = require("snekfetch")
const EventEmitter = require('events')
/** 
 * @param {String} id The ID of your webhook.  
 * @param {String} token The token of your webhook.
*/

class Webhook extends EventEmitter {

    constructor(id, token) {

        this.id = id
        this.token = token

        if (id == null || token == null) throw new TypeError("DiscordAPIError: You must provide your webhook credentials!");
    }

    /**
     * 
     * @param {Object} opts An object of options you want sent to your webhook.
     */

    send(opts) {
        const { content, username, tts, embeds, avatar_url, file } = opts

        if (content.length > 2000) throw new TypeError("Webhook content fields may not exceed 2000 characters.");

        snekfetch.post(`https://discordapp.com/api/webhooks/${this.id}/${this.token}`)
        .set("Content-Type", "application/json")
        .send({ content: content, username: username || null, tts: tts || false, embeds: embeds || [], avatar_url: avatar_url || null, file: file || null })
        .then(r => {

                if (r.body.code == null) {
                    this.emit("finish", "WEBHOOK_S  qEND_COMPLETE")
                }

                if (r.body.code == 50027) {
                    this.emit("err", "ERR_TOKEN_INVALID")

                }

                if (r.body.code == 10015) {
                    this.emit("err", "ERR_ID_INVALID")
                }
        })
    }

    delete() {
        snekfetch.delete(`https://discordapp.com/api/webhooks/${this.id}/${this.token}`)
        .then(r => {
            if (r.status == 204) return this.emit("finish", "WEBHOOK_DELETE_COMPLETE");
            if (r.status == 401) return this.emit("err", "ERR_TOKEN_INVALID");
            if (r.status == 404) return this.emit("err", "ERR_ID_INVALID");
        })
    }

    /**
     * 
     * @param {Object} opts 
     */

    edit(opts) {
        if (typeof opts !== "object") throw new RangeError("WebhookClient.edit only accepts an object.");
        if (!opts) throw new RangeError("WebhookClient.edit cannot be called with no parameters.");

        const { name, avatar } = opts

        snekfetch.patch(`https://discordapp.com/api/webhooks/${this.id}/${this.token}`)
        .set("Content-Type", "application/json")
        .send({ name: name || null, avatar: avatar || null })
        .then(r => {
            if (r.status == 200) {
                this.emit("finish", "WEBHOOK_EDIT_COMPLETE")
            }

            if (r.status == 401) {
                this.emit("err", "ERR_TOKEN_INVALID")
            }

            if (r.status == 400) {
                this.emit("err", "ERR_ID_INVALID")
            }
        })
    }
}

module.exports = Webhook