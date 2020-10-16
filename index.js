#!/usr/bin/env nodejs

const discord = require("discord.js");
const ytdl = require('ytdl-core');
const config = require("./config.json");

// Create a new discord client for our bot
const client = new discord.Client();

// When the bot is ready to be interacted with
// set its status to invisible
client.on('ready', () => {
    client.user.setStatus('invisible');
});

// Triggerd by any voice state change i.e joine/leave channel, mute, deafen
client.on("voiceStateUpdate", function(oldState, newState) {
    // Grab voice channel object of member who triggered state change
    const joinedChannel = newState.member.voice.channel;
    const channelName = joinedChannel != null ? joinedChannel.name : "";
    const username = newState.member.user.username;

    // Check to ensure the member is in a voice channel
    if (joinedChannel && (username === "EmmaW4tson" || username === "b nob")) {
        // Ensure that the only changed stated is that of the connection
        // a.k.a someone just joined the call
        if (oldState.deaf === newState.deaf && oldState.mute === newState.mute && oldState.streaming === newState.streaming) {
            if (channelName === "General" || channelName === "Throne Room" && joinedChannel.joinable) {
                joinedChannel.join().then(async(connection) => {
                    const dispatcher = connection.play(await ytdl('https://www.youtube.com/watch?v=qFchpvKpYm0', { quality: 'highestaudio' }));

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







/* client.on("typingStart", async function(channel, user) {
    // Grab the username from the event state update object
    const username = user.username;
    // Destructure the object returned by fetch to grab name, and guild object of channel
    const { name, guild } = await channel.fetch();
    // Build and array of reaction emojis
    const emojis = ["🤟", "🌶️", "🎯", "🦝"];

    // Check if guild name is = general
    if (name === "general") {
        // Check if users are the desired target
        if (username === "Wambo" || username === "Xquiset") {
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