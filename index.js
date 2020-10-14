const discord = require("discord.js");
const config = require("./config.json");

// Create a new discord client for our bot
const client = new discord.Client();
const prefix = config.prefix;

client.on("voiceStateUpdate", async function(userBefore, userAfter) {
    const displayName = userBefore.member.displayName;

    if ((displayName === "Xquiset" || displayName === "Wambo") && userBefore.member.voice.channel) {
        userBefore.member.send("Oi fuck you then huh!");
    }
});

// Login to the discord bot
client.login(config.BOT_TOKEN);