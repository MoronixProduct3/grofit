const commando = require('discord.js-commando')

class MessageCommand extends commando.Command{
    constructor(client){
        super(client,{
            name: 'regulation_msg',
            aliases: ['rgm'],
            group: 'regulator',
            memberName: 'regulation_msg',
            description: 'Set the message sent to traders',
            format: '<message>',
            details: 'This command will set the message that is to be sent to people who did not respect the format.',
            examples: ['!regulation_msg Hey there m8!'],
            guildOnly: true,
            argsType: 'single',
            guarded: false
        });
    }

    async run(message, args){

        // Check if user has required permissions
        if (! message.member.hasPermission('ADMINISTRATOR') && !this.client.isOwner(message.author)){
            message.reply('You must be a server administrator to set the message.');
            return;
        }

        if (args === null ||args.trim() === ''){
            message.reply('The message will now be reset to default');
            message.guild.settings.remove('_reg_explenation');
            return;
        }

        message.reply('The message will now be:\n'+args);
        message.guild.settings.set('_reg_explenation',args);
    }
}
module.exports = MessageCommand;