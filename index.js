const discord = require("discord.js");
const config = require("./config.json");

// Create a new discord client for our bot
const client = new discord.Client();
const prefix = config.prefix;

client.on("voiceStateUpdate", async function(userBefore, userAfter) {
    const displayName = userAfter.member.displayName;

    if ((displayName === "Xquiset" || displayName === "Wambo") && userAfter.member.voice.channel) {
        userAfter.member.guild.fetch().then((server) => {
            server.channels.cache.forEach((channel) => {
                if (channel instanceof discord.TextChannel) {
                    if (channel.name === "general") {
                        channel.send("This is general chat!");
                    }
                }
            });
        });
    }
});

// Login to the discord bot
client.login(config.BOT_TOKEN);