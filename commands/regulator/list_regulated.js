const commando = require('discord.js-commando')

class List_regulatedCommand extends commando.Command{
    constructor(client){
        super(client,{
            name: 'list_regulated',
            aliases: ['lr','list_regulate'],
            group: 'regulator',
            memberName: 'list_regulated',
            description: 'List channels regulated by the bot',
            details: 'This command will list all the text channels which are affected by this bot.',
            examples: ['!list_regulated','!lr'],
            guildOnly: true
        });
    }

    async run(message, args){

        // Pull existing regulated channels
        var currentRegCh = message.guild.settings.get('_reg_tch',[]);


        if (currentRegCh.length < 1){
            message.reply('No text channel is currently under trade regulation.');
        }
        else{
            var response = 'Here are the text channels currently under trade regulation:\n';

            currentRegCh.forEach(current =>{
                response = response +'\n    <#'+current+'>';
            });

            message.reply(response);
        }
    }
}
module.exports = List_regulatedCommand;