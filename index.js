const Commando = require('discord.js-commando');
const sqlite = require('sqlite');
const GrofitWatch = require(__dirname+'/grofit/grofit_watch.js');
const fs = require('fs');



const bot = new Commando.Client({
    owner: fs.readFileSync(__dirname + "/owner.txt",'utf8').trim()
});

bot.setProvider(
	sqlite.open(__dirname + '/settings.sqlite3').then(db => new Commando.SQLiteProvider(db))
).catch(console.error);

bot.registry.registerGroup('regulator','Regulator options');
bot.registry.registerDefaults();
bot.registry.registerCommandsIn(__dirname + "/commands");

bot.on('message',GrofitWatch.watch);

bot.login(fs.readFileSync(__dirname + "/key.txt",'utf8').trim());
