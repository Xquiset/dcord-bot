const discord = require("discord.js");
const config = require("./config.json");

// Create a new discord client for our bot
const client = new discord.Client();

// Login to the discord bot
client.login(config.BOT_TOKEN);