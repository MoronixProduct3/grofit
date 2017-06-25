const commando = require('discord.js-commando')


function handle(message){
    
    var code = analyze(message);

    if(code === 1){
        // Failed white test
        message.delete();
        message.author.send(
            message.guild.settings.get('_reg_explenation',
            'Your message does not comply with the trade policies of your clan.\n'+
            'It looks like you are missing some required format structures.'
        ));
    }
    else if(code === 2){
        // Failed black test
        message.delete();
        message.author.send(
            message.guild.settings.get('_reg_explenation',
            'Your message does not comply with the trade policies of your clan.\n'+
            'It looks like your message contains forbidden keywords.'
        ));
    }
}

function analyze(message){

    if(message.guild === null)
        return 0;
    
    var currentRegCh = message.guild.settings.get('_reg_tch',[]);

    if (! currentRegCh.some(ci => ci === message.channel.id))
        return 0;
    

    var rwle = message.guild.settings.get('_reg_wl',null);

    if(rwle !== null)
    {
        var rwlm = message.guild.settings.get('_reg_wlm',null);

        var result = null;
        if (rwlm === null)
            result = message.content.match(new RegExp(rwle));
        else
            result = message.content.match(new RegExp(rwle,rwlm));
        
        if (result === null)
            return 1;
    }

    var rble = message.guild.settings.get('_reg_bl',null);

    if(rble !== null)
    {
        var rblm = message.guild.settings.get('_reg_blm',null);

        var result = null;
        if (rblm === null)
            result = message.content.match(new RegExp(rble));
        else
            result = message.content.match(new RegExp(rble,rblm));
        
        if (result !== null)
            return 2;
    }

    return 0;
}

module.exports.watch = handle;