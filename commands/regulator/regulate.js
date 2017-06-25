const commando = require('discord.js-commando')

class RegulateCommand extends commando.Command{
    constructor(client){
        super(client,{
            name: 'regulate',
            aliases: ['rg'],
            group: 'regulator',
            memberName: 'regulate',
            description: 'Set a channel to be regulated',
            format: '#<channelName ..>',
            details: 'This command will add the specified channel to the list of channels regulated by the bot',
            examples: ['!regulate #trade'],
            guildOnly: true,
            argsType: 'single',
            guarded: false
        });
    }

    async run(message, args){

        // Check if user has required permissions
        if (! message.member.hasPermission('ADMINISTRATOR') && !this.client.isOwner(message.author)){
            message.reply('You must be a server administrator to regulate channels.');
            return;
        }

        var channelIDp = args.match(/\d{17,19}/g)
        
        // Make sure a channel an argument is provided
        if (channelIDp == null){
            message.reply('Invalid argument: You must specify a text channel.');
            return;
        }

        var presFail = false;   
        channelIDp.forEach(current =>{
            if (! message.guild.channels.has(current)){
                presFail=true;
            }
            else if (!message.guild.channels.get(current).type ==='text'){
                presFail=true;
            }
        });
        if (presFail){
            message.reply('Invalid argument: One of the identifiers entered is not a text channel.');
            return;
        }



        // Pull existing regulated channels
        var currentRegCh = message.guild.settings.get('_reg_tch',[]);

        //Verify which channel are new
        channelIDp.forEach(current =>{
            if (currentRegCh.every(chId => chId !== current)){
                message.reply('<#'+message.guild.channels.get(current).id+'> is now regulated.');
                currentRegCh.push(current);
            }
            else{
                message.reply('<#'+message.guild.channels.get(current).id+'> was already regulated.');
            }
        });

        //Save regulated channels
        message.guild.settings.set('_reg_tch',currentRegCh);
    }
}
module.exports = RegulateCommand;