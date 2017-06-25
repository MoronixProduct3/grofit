const commando = require('discord.js-commando')

class DeregulateCommand extends commando.Command{
    constructor(client){
        super(client,{
            name: 'deregulate',
            aliases: ['drg'],
            group: 'regulator',
            memberName: 'deregulate',
            description: 'Cancel regulations on a channel',
            format: '#<channelName ..> | all',
            details: 'This command will remove the specified channel from the list of channels regulated by the bot',
            examples: ['!deregulate #trade','!deregulate all'],
            guildOnly: true,
            argsType: 'single',
            guarded: true
        });
    }

    async run(message, args){

        // Check if user has required permissions
        if (!message.member.hasPermission('ADMINISTRATOR') && !this.client.isOwner(message.author)){
            message.reply('You must be a server administrator to deregulate channels.');
            return;
        }

        // Deregulate all channels
        if (args.match(/all/i) !== null){
            message.guild.settings.remove('_reg_tch');
            message.reply('All text channels are now deregulated.');
            return;
        }

        var channelIDp = args.match(/\d{17,19}/g)
        
        // Make sure a channel an argument is provided
        if (channelIDp == null){
            message.reply('Invalid argument: You must specify a text channel or \'all\'.');
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
        var newRegCh =[];
        //Verify which channel are new
        currentRegCh.forEach(current =>{
            if (channelIDp.some(chId => chId === current)){
                message.reply('<#'+message.guild.channels.get(current).id+'> is now deregulated.');
            }
            else{
                newRegCh.push(current);
            }
        });

        //Save regulated channels
        message.guild.settings.set('_reg_tch',newRegCh);

        if (newRegCh.length === currentRegCh.length){
            if (channelIDp.length > 1)
                message.reply('These channel are not regulated');
            else
                message.reply('This channel is not regulated');
        }
    }
}
module.exports = DeregulateCommand;