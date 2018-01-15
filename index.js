// Imperial Intelligence by OmenTGE

// initialise variables
const Discord = require('discord.js');
const bot = new Discord.Client();
var suffix = " I see all.";
var prefix = "!";
var serverLogId = "401440463875342336";


// sets the bot's game and status
bot.on('ready', () => {;
    bot.user.setGame('I see all.');
    bot.user.setStatus('Online');
  })

// logs
    // role change
    bot.on("guildMemberUpdate", (oldMember, newMember) => {
        var dt = new Date(); 
        var utcDate = dt.toUTCString(); 
        var roleChangeLogInfo = "[" + utcDate + " | " + newMember.guild + "] " + newMember.displayName
        console.log(roleChangeLogInfo + " has updated roles. Old roles: " + oldMember.roles.map(x=>x.name) + " | New roles: " + newMember.roles.map(x=>x.name) + "\n")
    });

    // message edit
    bot.on("messageUpdate", (oldMessage, newMessage) => {
        var dt = new Date(); 
        var utcDate = dt.toUTCString(); 
        var messageUpdateLogInfo = "[" + utcDate + " | " + newMessage.guild + "] " + oldMessage.author.displayName
        console.log(messageUpdateLogInfo + " has edited a message. Old message: " + oldMessage + " | New message: " + newMessage + "\n")
    });
    
    //

// sets up commands
bot.on('message', (message) => {;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(message.author.bot) return;
    if(message.content.indexOf(prefix) !== 0) return

    var dt = new Date(); 
    var utcDate = dt.toUTCString(); 
    let commandUser = message.member.displayName
    var logInfo = "[" + utcDate + " | " + message.guild + " | #" + message.channel.name + "] " + commandUser

// commands

// perm level: iis restrict
    // initialise
        if (command === 'initialise'){
            message.channel.send('Initialised.' + suffix);

            dt = new Date(); 
            utcDate = dt.toUTCString(); 
            console.log(logInfo + " initialised." + "\n")
            message.delete();
        }
    // 

    // fetch messages
        if (command == 'fetch'){
            const fetchCount = parseInt(args[0], 10);
            var fetchedCount = 0

            if(!fetchCount){
                return message.reply("Missing fetch count. Command usage: !fetch 100. Re-enter command.");
            }
            message.delete()
            message.channel.fetchMessages({ limit: fetchCount })
            
            while (fetchedCount != fetchCount){
                console.log("[" + message.createdTimestamp + "]" + message.author.displayName + ": " + message.content);
                fetchedCount++
            }
                console.log(logInfo + " fetched " + fetchCount + " messages." + "\n");
        }

// perm level: local restrict
    // purge
        if (command == 'purge'){
            const deleteCount = parseInt(args[0], 10);
            
            let purgeHasPermissions = message.member.hasPermission("MANAGE_MESSAGES");
            let userIsAdmin = message.member.hasPermission("ADMINISTRATOR");
            let purgeUser = message.member.displayName;

                if(!deleteCount || deleteCount < 2 || deleteCount > 100){
                    return message.reply("Missing message deletion count. Command usage: !purge 100 . Message deletion count must be between 2 and 100. Re-enter command.");
                }

                if(purgeHasPermissions == true || userIsAdmin == true){
                    message.channel.bulkDelete(deleteCount)
                    dt = new Date(); 
                    utcDate = dt.toUTCString(); 
                         console.log(logInfo + " purged " + deleteCount + " messages." + "\n")
                         message.delete();
               }
        }
    
// perm level: unrestricted
        // clock in
        if (command == 'clockin'){
            dt = new Date(); 
            utcDate = dt.toUTCString(); 
            message.channel.send(message.author + ' clocked in at ' + utcDate);
            message.delete();
        }

        // clock out
        if (command == 'clockout'){
            dt = new Date(); 
            utcDate = dt.toUTCString(); 
            message.channel.send(message.author + ' clocked out at ' + utcDate);
            message.delete();
        }
});

bot.login('NDAxNjkwNDIyMTA5NDA1MTg2.DTujpg.-8_UY5hYhnmG1HxUKxSwjfJ5tLE');

        