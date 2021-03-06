#!/usr/bin/env nodejs

const discord = require("discord.js");
//const fs = require('fs');
//const ytdl = require('ytdl-core');
const config = require("./config.json");
const targets = {
    // iDubbz What are you fucking gay
    "Wambo": { media: '/var/www/html/dcord-bot/assets/iDubbbz.mp3', options: { bitrate: 'auto', seek: 0.9, volume: 1 } },
    // Rick and Morty My man
    "Xquiset": { media: '/var/www/html/dcord-bot/assets/my_man.mp3', options: { bitrate: 'auto', seek: 0, volume: 1 } },
    // Sponge Bob My Leg
    "b nob": { media: '/var/www/html/dcord-bot/assets/my_leg.mp3', options: { bitrate: 'auto', seek: 4.5, volume: 1 } }
};

// Create a new discord client for our bot
const client = new discord.Client();

// When the bot is ready to be interacted with
// set its status to invisible
// client.on('ready', () => {
//     client.user.setStatus('invisible');
// });

/* client.on("typingStart", async function(channel, user) {
    // Grab the username from the event state update object
    const username = user.username;
    // Destructure the object returned by fetch to grab name, and guild object of channel
    const { name, guild } = await channel.fetch();
    // Build and array of reaction emojis
    const emojis = ["🤟", "🌶️", "🎯", "🦝"];

    // Check if guild name is = general
    if (name === "dank-overlords-only") {
        // Check if users are the desired target
        if (Object.keys(targets).includes(username)) {
            // Send a message to the text channel the user started to type in
            // then grab a random emoji from the emojis array
            channel.send("Poggers").then((message) => {
                // Generate a random number from 0 to emojis.length
                const index = Math.floor(Math.random() * emojis.length);
                // Send the emoji reaction with the random index
                message.react(emojis[index]);
            });
        }
    }
}); */

// Triggerd by any voice state change i.e joine/leave channel, mute, deafen
client.on("voiceStateUpdate", function(oldState, newState) {
    // Grab voice channel object of member who triggered state change
    const joinedChannel = newState.member.voice.channel;
    const channelName = joinedChannel != null ? joinedChannel.name : "";
    const username = newState.member.user.username;

    // Check to ensure the member is in a voice channel
    if (joinedChannel != null && Object.keys(targets).includes(username)) {
        // Ensure that the only changed stated is that of the connection
        // a.k.a someone just joined the call
        if (oldState.deaf === newState.deaf && oldState.mute === newState.mute && oldState.streaming === newState.streaming) {
            if (channelName === "General" || channelName === "Bhrone bRoom" && joinedChannel.joinable) {
                //let media_stream = ytdl(targets[username].media, targets[username].options);

                joinedChannel.join().then(async(connection) => {
                    //const dispatcher = connection.play(media_stream, { volume: 1 });
                    const dispatcher = connection.play(targets[username].media, targets[username].options);

                    dispatcher.on('finish', () => {
                        joinedChannel.leave();
                    });
                }).catch((error) => {
                    console.log(error);
                });
            }
        }
    }
});

// Login to the discord bot
client.login(config.BOT_TOKEN);