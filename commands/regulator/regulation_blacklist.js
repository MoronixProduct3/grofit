const commando = require('discord.js-commando')

class BlackCommand extends commando.Command{
    constructor(client){
        super(client,{
            name: 'regulation_blacklist',
            aliases: ['rbl'],
            group: 'regulator',
            memberName: 'regulation_blacklist',
            description: 'Set or view the blacklist filter',
            format: '</regularExpression/mod> | <disable>',
            details: 'This command will set the regular expression that must not be found in messages. If it is not supplied with any arguments, the bot will simply display the current regular expression. Add "disable" to the arguments to disable the filter',
            examples: ['!regulation_blacklist /wts rivens/'],
            guildOnly: true,
            argsType: 'single',
            guarded: false
        });
    }

    async run(message, args){

        // Display request
        if ( args === null || args.trim() === '' ){
            
            // Pull existing blacklist
            var currentRegE = message.guild.settings.get('_reg_bl',null);
            var currentRegM = message.guild.settings.get('_reg_blm',null);

            if (currentRegE === null){
                    message.reply('Black list regulation is currently disabled. Specify a regular expression to enable it.');
                return;
            }

            if (currentRegM === null)
                message.reply('The current black list filter is:\n```/'+currentRegE+'/```');
            else
                message.reply('The current black list filter is:\n```/'+currentRegE+'/'+currentRegM+'```');
            return;
        }

        // Check if user has required permissions
        if (! message.member.hasPermission('ADMINISTRATOR') && !this.client.isOwner(message.author)){
            message.reply('You must be a server administrator to set filters.');
            return;
        }

        var expression = args.match(/(?!\/).*(?=\/)/);
        
        if (expression === null || expression.length < 1){
            
            if (args.match(/disable/i) !== null){
                message.reply('Black list filter is now diabled');
                message.guild.settings.remove('_reg_bl');
                message.guild.settings.remove('_reg_blm');
            }else{
                message.reply('Invalid argument: Please enter one regular expression.');
            }
            return;
        }

        var mods = args.match(/(?!\/.*\/)[gmiyu]{1,5}$/);

        if (mods !== null)
            var newRegex = new RegExp(expression, mods);
        else
            var newRegex = new RegExp(expression);

        message.reply('The black list regular expression will now be:\n```'+newRegex.toString()+'```');

        message.guild.settings.set('_reg_bl',expression);
        message.guild.settings.set('_reg_blm',mods);
    }
}
module.exports = BlackCommand;