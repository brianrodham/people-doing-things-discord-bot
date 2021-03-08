const discord = require('discord.js');
const client = new discord.Client();


client.on('ready', () => {
    console.log("ready");
    
    client.api.applications(client.user.id).guilds('316062991378546701').commands.post({
        data: {
            name: "swtp",
            description: "So, what's the plan today?"
        }
    }).catch(err => {
        console.error("Error when posting to commands");
        console.error(err);
    });

    client.ws.on('INTERACTION_CREATE', async interaction => {
        const command = interaction.data.name.toLowerCase();
        const args = interaction.data.options;

        if(command == "swtp") {
            var game = pickGame();
            client.api.interactions(interaction.id, interaction.token).callback.post({
                data: {
                    type: 4,
                    data: {
                        content: game
                    }
                }
            })
        }
    });
});

var token = require('./config.json').token;
client.login(token).catch(err => {
    console.error(err);
});


function pickGame(){
    var games = ["Final Fantasy XIV", "Warframe", "Terraria", "Genshin Impact", "Destiny"]
    return games[Math.floor(Math.random() * games.length)];
}