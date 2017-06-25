const commando = require('discord.js-commando')

class WhiteCommand extends commando.Command{
    constructor(client){
        super(client,{
            name: 'regulation_whitelist',
            aliases: ['rwl'],
            group: 'regulator',
            memberName: 'regulation_whitelist',
            description: 'Set or view the whitelist filter',
            format: '</regularExpression/mod> | <disable>',
            details: 'This command will set the regular expression that must match the messages regulated. If it is not supplied with any arguments, the bot will simply display the current regular expression. Add "disable to the arguments to disable the filter',
            examples: ['!regulation_whitelist /wts rivens/'],
            guildOnly: true,
            argsType: 'single',
            guarded: false
        });
    }

    async run(message, args){

        // Display request
        if ( args === null || args.trim() === '' ){
            
            // Pull existing whitelist
            var currentRegE = message.guild.settings.get('_reg_wl',null);
            var currentRegM = message.guild.settings.get('_reg_wlm',null);

            if (currentRegE === null){
                    message.reply('White list regulation is currently disabled. Specify a regular expression to enable it.');
                return;
            }

            if (currentRegM === null)
                message.reply('The current white list filter is:\n```/'+currentRegE+'/```');
            else
                message.reply('The current white list filter is:\n```/'+currentRegE+'/'+currentRegM+'```');
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
                message.reply('White list filter is now diabled');
                message.guild.settings.remove('_reg_wl');
                message.guild.settings.remove('_reg_wlm');
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

        message.reply('The white list regular expression will now be:\n```'+newRegex.toString()+'```');

        message.guild.settings.set('_reg_wl',expression);
        message.guild.settings.set('_reg_wlm',mods);
    }
}
module.exports = WhiteCommand;