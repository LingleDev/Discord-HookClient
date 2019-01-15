# discord-hookclient
    A new and lightweight wrapper for Discord's webhook feature.


# Getting started

    Hmm. Are you wondering how you would use this library?
    I'll show you how.

    ```js
        const hookclient = require('discord-hookclient')
        const webhook = new hookclient.WebhookClient('your-webhook-id', 'your-webhook-token')

        // Send a message to your webhook!
        // All options (other than content) are optional!

        const options = {
            content: "some crazy message!", // content length cannot exceed 2000 characters.
            embeds: [/* embed fields here...*/], // Put your embed fields here.
            username: "A cool and unusual username for a webhook", // Username for the webhook goes here.
            avatar_url: "A link to a .png or a .jpg file", // Link to an image goes here.
            tts: true // Makes the webhook message text to speech.
        }

        webhook.on('finish', msg => {
            console.log(msg) // If success, it will log "WEBHOOK_SEND_COMPLETE"
        })

        webhook.on('err', err => {
            console.error(err) // Logs the error that occured.
        })

        webhook.send(options) // Returns null, since Discord does not provide a response for the POST request.
    ```

# Info

View the docs [here](https://discord-hooks.js.org/intro "docs are in progress")(in progress)
Join the support server [here](https://discordapp.com/invite/Fbz24wS)