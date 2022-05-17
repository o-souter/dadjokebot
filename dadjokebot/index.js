//index.js
const token = "Insert token here!"
require("dotenv").config();
const axios = require("axios");
const {Client, Intents, GuildScheduledEvent} = require("discord.js");

const client = new Client({
    intents:[Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]
});

const dadJokeURL = "https://icanhazdadjoke.com/";

const headers = {Accept: "application/json", "User-Agent": "axios 0.21.1"};


async function getJoke() {
    console.log("Connecting to [" + dadJokeURL + "]")
    const response = await axios.get(dadJokeURL, { headers: headers });
    console.log("Fetching joke...")
    return response.data;
}
//Wait for bot to be ready

client.on("ready", () => {
    console.log("Logged in as " + client.user.tag);
});

//Listen for messages

client.on("messageCreate", async (message) => {
    //console.log("Channel id is " + message.channel)
    //console.log("Author id is " + message.author.id)
    const text = message.content.toLowerCase();
    if (message.author.bot) return;
    console.log(text.includes("joke"))
    if (text.includes("joke")) {
        try {  
            //Reply with a random joke
            console.log("Getting joke...")
            const result = await getJoke();
            console.log("Replying...")
            message.reply("Did someone say dad joke? \n" + result.joke);
        }
        catch (error) {
            console.log("Error Occured: " + error)
            message.reply("Sorry, an error occured");
        }
    
    }
});

//Log on to the server
//console.log(process.env.TOKEN);
console.log("Connecting...")
client.login(token);
