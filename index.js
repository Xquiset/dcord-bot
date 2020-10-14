const discord = require("discord.js");
const config = require("./config.json");

// Create a new discord client for our bot
const client = new discord.Client();
const prefix = config.prefix;

/* client.on("voiceStateUpdate", async function(userBefore, userAfter) {
    const displayName = userAfter.member.displayName;

    if ((displayName === "Xquiset" || displayName === "Wambo") && userAfter.member.voice.channel) {
        userAfter.member.guild.fetch().then((server) => {
            server.channels.cache.forEach((channel) => {
                if (channel instanceof discord.TextChannel) {
                    if (channel.name === "general") {
                        const date = new Date();
                        channel.send(date.toLocaleTimeString() + " : This is general chat!");
                    }
                }
            });
        });
    }
}); */

client.on("typingStart", async function(channel, user) {
    const username = user.username;
    const { name, guild } = await channel.fetch();
    const emojis = ["🤟", "🌶️", "🎯", "🦝"];

    if (name === "general") {
        if (username === "Wambo" || username === "Xquiset") {
            channel.send("Poggers").then((message) => {
                const index = Math.floor(Math.random() * emojis.length);
                message.react(emojis[index]);
            });
        }
    }
});

// Login to the discord bot
client.login(config.BOT_TOKEN);