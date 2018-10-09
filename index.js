const botconfig = require("./botconfig.json");
const ytdl = require("ytdl-core");
const superagent = require("snekfetch");
const snek = require('snekfetch');
const Discord = require("discord.js");
var osu = require('os-utils');
var os = require('os');
var cpu = require('windows-cpu')
var platform = require('platform')
var prettyMs = require('pretty-ms');
const google = require("google");
const { RichEmbed } = require("discord.js"),
      { get } = require("node-superfetch");
const shorten = require("isgd");
const translate = require('google-translate-api');
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();

const ownerID = '297130271864520705'
const active = new Map();

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
  console.log("Couldn't find commands.");
  return;
}

  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  })

})


      let ops = {
        ownerID: ownerID,
        active: active
      }

let statuses = ["Say $help | Released v16", "24/7 Online Forever", `With ${bot.users.size} users`, `On ${bot.guilds.size} servers`];

bot.on('ready', () => {

  setInterval(function() {


    let status = statuses[Math.floor(Math.random()*statuses.length)];


    bot.user.setPresence({ game: { name: status }, status: 'online' });

    bot.user.setPresence({ activity: { name: status }, status: 'online' });

  }, 1000)

})

bot.on('ready', async () => {
  console.log(`Bot has started, with ${bot.users.size} users, in ${bot.channels.size} channels of ${bot.guilds.size} guilds.`);
})

bot.on("guildMemberAdd", async member => {
  console.log(`${member.id} Has Joined The Discord Server`);

  let welcomechannel = member.guild.channels.find(`name`, "💬selamat-datang💬");
  welcomechannel.send(`${member} Has Joined The Discord Server`);
})

bot.on("guildMemberRemove", async member => {
  console.log(`${member.id} Has Leaved The Discord Server`);

  let welcomechannel = member.guild.channels.find(`name`, "💬selamat-datang💬");
  welcomechannel.send(`${member} Has Leaved The Discord Server`);
})

bot.on("channelCreate", async channel => {


  console.log(`${channel.name} Channel Has Been Created`);

  let sChannel = channel.guild.channels.find(`name`, "💬server▪log💬");
  sChannel.send(`${channel} Has Been Created.`);
})

bot.on("guildMemberAdd", function(member) {
  let role = member.guild.roles.find("name", "✨Member ✨");
  member.addRole(role).catch(console.error);
})

bot.on("channelDelete", async channel => {


  console.log(`${channel.name} Channel Has Been Deleted`);

  let sChannel = channel.guild.channels.find(`name`, "💬server▪log💬");
  sChannel.send(`${channel} Has Been Deleted`);
})

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1); 

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  if(cmd === `${prefix}botinfo`){
    let boticon = bot.user.displayAvatarURL;
    message.delete()
    let botembed = new Discord.RichEmbed()
    .setTitle("Information Bot ๖̶̶̶ζ͜͡Gᴇɴ X ๖̶̶̶ζ͜͡Tᴇᴀᴍ")
    .setColor("#42f4ad")
    .setThumbnail(boticon)
    .addField("Bot Username", "๖̶̶̶ζ͜͡Gᴇɴ X ๖̶̶̶ζ͜͡Tᴇᴀᴍ", true)
    .addField("Developer Bot Name", "``FaiqGamingYT``", true)
    .addField("Bot Has Created At", bot.user.createdAt)
    .addField(":office: Server Has Used!", `${bot.guilds.size} Server`, true)
    .addField(":desktop: Platform", "Linux64 System", true)
    .addField(":books: Discord Library", "Discord.JS Node.JS", true)
    .addField(":notebook_with_decorative_cover: Bot Version", "Version: 16.0.2.3", true)
    .addField("Application Has Used Created The Bot", "VisualStudioCode Application & Atom Application")

    return message.channel.send(botembed);
  }

  if(cmd === `${prefix}youtube`){
    let youtube = args.slice(0).join('+');

    let link = `https://www.youtube.com/results?search_query=` + youtube;
    if(!youtube)return message.reply(`Please enter a word `)
    if(!link)return message.reply("Console error")
    let embed = new Discord.RichEmbed()

     
    .setColor("RED")
     
      .setTimestamp()
    
      .addField('Action:', 'Searching on youtube')

      .addField("Word:", `${args.slice(0).join(' ')}`)

      .addField('Link:', `${link}`)
     
      .setFooter("You're avatar", message.author.avatarURL);
      
          message.channel.send(embed);
          message.author.send(`You have searched for ${link} in ${ message.guild.name}`);
  }

  if(cmd === `${prefix}statistic`){
    message.delete()

    let FooterHinami = [
      `${bot.user.username} is here to support!`,
      `${bot.user.username} brought some coffee!`,
      `${bot.user.username} is providing any assistance when ready`,
      `${bot.user.username} is stalking you`,
      `${bot.user.username} is accepting your support..\nTreat ${bot.user.username} well or she will haunt you.`
    ]
    try {
      cpu.cpuInfo().then(cpus => {        })
      let cpus = await cpu.cpuInfo();
      let datainfoEmbed = new Discord.RichEmbed(message)
      .setAuthor(bot.user.username, bot.user.avatarURL)
      .setFooter(FooterHinami[Math.floor(Math.random() * FooterHinami.length)])
      .setColor(0x0000ff)
      .addField("Neural Network Terminal [NNL]", "Statics for the server as well as the server I am being run on!\n Yay for me to exist & to serve Coffee!", false)
      .addField("Total Memory", `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
      .addBlankField(true)
      .addField("CPU Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`, true)
      .addField("Current System CPU", `${cpus}`, true)
      .addBlankField(true)
      .addField(`Users Logged`, `${bot.users.size}`, true)
      .addField(`Servers Logged`, `${bot.guilds.size}`, true)
      .addField(`Channels Logged`, `${bot.channels.size}`, true)
      .addField(`Current Operating System`, `${platform.os}`, true)
      .addField(`Hinami System Time`, `${prettyMs(osu.processUptime())}`, true)
      .addField(`Datacentre Server Time`, `${prettyMs(osu.sysUptime())}`, true)
      message.channel.send(datainfoEmbed)
      
    } catch (err) {console.log("Error With Stats - Please see below\n"+err)}
  }

  if(cmd === `${prefix}serverinfo`){

    let sicon = message.guild.iconURL;
    message.delete()
    let serverembed = new Discord.RichEmbed()

    .setDescription("Information Discord Server")
    .setColor("#15f153")
    .setThumbnail(message.guild.iconURL)
    .addField('Server Owner', `@${message.guild.owner.user.tag}`)
    .addField("Discord Server Name", message.guild.name)
    .addField("Created The Discord Server In", message.guild.createdAt)
    .addField("You Has Joined The Discord Server", message.member.joinedAt)
    .addField("Total Members On Discord Server", `${message.guild.memberCount} Member Discord`);

    return message.channel.send(serverembed);
  }
  
  if(cmd === `${prefix}avatar`){
    let user = message.mentions.users.first() || message.author;

    message.delete()
    let embed = new Discord.RichEmbed()
    .setAuthor(`${user.username}`)
    .setImage(user.displayAvatarURL)

    message.channel.send(embed);
  }

  if(cmd === `${prefix}NewdNeko`){
    if (!message.channel.nsfw) return message.channel.send('You can use this commands on NSFW Channel!')
    superagent.get('https://nekos.life/api/v2/img/lewd')
        .end((err, response) => {
      const lewdembed = new Discord.RichEmbed()
      .setImage(response.body.url)
      .setColor(`RANDOM`)
  message.channel.send(lewdembed);
    })
  }

  if(cmd === `${prefix}reboot`){
    if(message.author.id !== "297130271864520705") return message.channel.send("You cannot use this command because, you are not a developer.")

    
    rebootBot(message.channel);
         function rebootBot(channel) {
             message.react('✅')
                 .then(message => bot.destroy())
                 .then(message => bot.destroy())
                .then(() => bot.login("botconfig.token"));
             message.channel.send("``๖̶̶̶ζ͜͡Gᴇɴ X ๖̶̶̶ζ͜͡Tᴇᴀᴍ has successfully rebooted!``")
         }
      }
  
  if(cmd === `${prefix}meme`){
    let m = await message.channel.send(`**Please Wait To Get Image...**`);
    try {
    const { body } = await get('https://api-to.get-a.life/meme')
  
    message.delete()
    let memeEmbed = new RichEmbed() 
    .setColor("#ff9900") 
    .setTitle(body.text)
    .setImage(body.url)
    .setTimestamp()
    .setFooter(`Request by: ${message.author.tag}`);
    
    message.channel.send(memeEmbed).then(() => { m.delete();});
    } catch (e) {
      message.channel.send(`Oh no an error occurred :( \`${e.message}\` try again later!`);
    } 
  }

  if(cmd === `${prefix}dog`){
    let {body} = await superagent
    .get(`https://random.dog/woof.json`);

    message.delete()
    let dogembed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Image Dog :dog:")
    .setImage(body.url);

    message.channel.send(dogembed);

  }

  if(cmd === `${prefix}cat`){
    let {body} = await superagent
    .get('https://aws.random.cat/meow');

    message.delete()
    let catembed = new Discord.RichEmbed()
    .setColor("#ff9900")
    .setTitle("Image Cat :cat:")
    .setImage(body.file);

    message.channel.send(catembed);

  }

  if(cmd === `${prefix}yesorno`){
    let color = ''
    const { body } = await superagent
  .get('https://yesno.wtf/api/');
  if(body.answer === 'yes') color = '0x01DF01';
  if(body.answer === 'no') color = '0xFF0000';
  message.delete()
  const embed = new Discord.RichEmbed()
  .setColor(color)
  .setImage(`${body.image}`)
  message.channel.send(`The magic API says: **${body.answer}**`, {embed});

}

if(cmd === `${prefix}nick`){
  let nickname = args.join(' ')
  message.guild.members.get('459152313467011072')
  	.setNickname(nickname);
  await message.channel.send({
  	embed: new Discord.RichEmbed()

  		.setTitle(`Changed Server Nickname to ${nickname}`)
  })
}

if(cmd === `${prefix}shorten`){
    // The command will take one require argument, and one optional (link, title)
 
  // We also want to check if they typed anything at all, if not run this
  if (!args[0]) return message.channel.send('**Proper Usage: $shorten <URL> [title]**')
 
  // First, we need to check if they entered an optional title
  if (!args[1]) { // If the second argument in the message is undefined, run this
   
    shorten.shorten(args[0], function(res) { // This will run the shorten function and pass it 'res'
      if (res.startsWith('Error:')) return message.channel.send('**Please enter a valid URL**'); // The only possible error here would be that it's not a valid URL.
     
      message.channel.send(`**<${res}>**`); // If no error encountered, it will return with the response in the res variable
   
    })
   
  } else { // If the second argument IS defined, run this
   
    shorten.custom(args[0], args[1], function(res) { // This is sort of the same thing from earlier, although this will pass the first and second arguments to the shortener, then return 'res'
     
      // There are a few possible error messages, so we can just tell them what the shortener says
      if (res.startsWith('Error:')) return message.channel.send(`**${res}**`); // This will return the full error message
      // Make sure you return, so it doesn't run the rest of the code
     
      message.channel.send(`**<${res}>**`); // If no errors encountered, it will return the link.
     
     
    }) // We also can use <> to make sure it doesn't show an embed, now let's test it!
   
  }
 
}

  if(cmd === `${prefix}report`){

    //!report @ned this is the reason

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if (!rUser) return message.channel.send("Couldnt't find user.");
    let reason = args.join(" ").slice(22);


    message.delete()
    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#1c15f0")
    .addField("Reported User", `${rUser}`)
    .addField("Reported By", `${message.author}`)
    .addField("Channel", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", reason);

    let reportschannel = message.guild.channels.find(`name`, "💬server▪log💬");
    if(!reportschannel) return message.channel.send("Couldn't find server log channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }

  if(cmd === `${prefix}kick`){

    //!kick @daeshan askin for it

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("Can't Find The User To Kicked!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You Can't Use The Commands!");
    if(kUser.hasPermission("ADMINISTRATOR")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    .setColor("#42f4d9")
    .addField("Kicked User", `${kUser}`)
    .addField("Kicked By", `<@${message.author.id}>`)
    .addField("Kicked In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", kReason);

    let kickChannel = message.guild.channels.find(`name`, "💬server▪log💬");
    if(!kickChannel) return message.channel.send("Can't find server log channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`){

    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("Can't Find The User To Banned!");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("You Can't Use The Commands!");
    if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("That person can't be banned!");

    let banEmbed = new Discord.RichEmbed()
    .setDescription("~Ban~")
    .setColor("#f4e842")
    .addField("Banned User", `${bUser}`)
    .addField("Banned By", `<@${message.author.id}>`)
    .addField("Banned In", message.channel)
    .addField("Time", message.createdAt)
    .addField("Reason", bReason);

    let incidentchannel = message.guild.channels.find(`name`, "💬server▪log💬");
    if(!incidentchannel) return message.channel.send("Can't find server log channel.");

    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);


    return;
  }

  if(cmd === `${prefix}pingbot`){
    message.channel.send(`The Bot Current Ping Is ${Date.now() - message.createdTimestamp} ms`);
  }

  if(cmd === `${prefix}tempmute`){

    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("No can do.");
    if(args[0] == "help"){
      message.reply("Usage: !tempmute <user> <1s/m/h/d>");
      return;
    }
    let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!tomute) return message.reply("Couldn't find user.");
    if(tomute.hasPermission("MANAGE_MESSAGES")) return message.reply("Can't mute them!");
    let reason = args.slice(2).join(" ");
    if(!reason) return message.reply("Please supply a reason.");
  
    let muterole = message.guild.roles.find(`name`, "muted");
    //start of create role
    if(!muterole){
      try{
        muterole = await message.guild.createRole({
          name: "muted",
          color: "#000000",
          permissions:[]
        })
        message.guild.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      }catch(e){
        console.log(e.stack);
      }
    }
    //end of create role
    let mutetime = args[1];
    if(!mutetime) return message.reply("You didn't specify a time!");
  
    message.delete().catch(O_o=>{});
  
    try{
      await tomute.send(`Hi! You've been muted for ${mutetime}. Sorry!`)
    }catch(e){
      message.channel.send(`A user has been muted... but their DMs are locked. They will be muted for ${mutetime}`)
    }
  
    let muteembed = new Discord.RichEmbed()
    .setDescription(`Mute executed by ${message.author}`)
    .setColor(orange)
    .addField("Muted User", tomute)
    .addField("Muted in", message.channel)
    .addField("Time", message.createdAt)
    .addField("Length", mutetime)
    .addField("Reason", reason);
  
    let incidentschannel = message.guild.channels.find(`name`, "💬server▪log💬");
    if(!incidentschannel) return message.reply("Please create a server log channel first!");
    incidentschannel.send(muteembed);
  
    await(tomute.addRole(muterole.id));
  
    setTimeout(function(){
      tomute.removeRole(muterole.id);
      message.channel.send(`<@${tomute.id}> has been unmuted!`);
  }, ms(mutetime));
  }

  if(cmd === `${prefix}help`){
    message.delete()
    const embed = new Discord.RichEmbed()
    .setColor("#127191")
    .setTitle("Command List Bot ๖̶̶̶ζ͜͡Gᴇɴ X ๖̶̶̶ζ͜͡Tᴇᴀᴍ!")
    .addField(":hammer_pick: Utility", "**Play,** **Leave,** **Avatar,** **Lmgtfy,** **Queue,** **Npm,**")
    .addField(":gear: Administrator", "**Clear,** **Ban,** **TempMute,** **Kick,** **Warn,** **Report,**")
    .addField(":hammer: Core", "**Help,** **Ping,** **Botinfo,** **Roleinfo** **Serverinfo,** **Invite,** **Pingbot,** **Roles,** **Statistic,**")
    .addField(":checkered_flag: Fun", "**Cat,** **Dog,** **Osd,** **Youtube,** **Meme,** **Yesorno,** **Shorten,** **8Ball,** **Quiz,**")
    .addField(":pick: Developer", "**Reboot,** **Eval,** **Reload**")
    .addField("Using Prefix!", "**Use $<command>**");
    message.channel.send({embed})
  }

  if (cmd === `${prefix}kickbot`){
     if (message.author.id !== ownerID) return message.channel.send("You are not authorized to use this command.");

     var error17 = new Discord.RichEmbed().setColor("990033")
          .setDescription('**Please enter a valid server ID.**')
          .setColor(0xff0000)

     var error18 = new Discord.RichEmbed().setColor("990033")
          .setDescription('**You cannot kick the bot from this server!**')
          .setColor(0xff0000)


     if (isNaN(args[0])) return message.channel.send(error17).then(msg => {
          msg.delete(9000)
     })

     //If tried kick bot from a main server (like for emote provider) will return error18
     if (args[0] !== 373950345153609729 || 481663437705838602) return message.channel.send(error18).then(msg => {
           msg.delete(9000)
      })

     bot.guilds.get(args[0]).leave();
     message.channel.send(`**Bot was been removed from server id [${args[0]}]**`)
 }

  if(cmd === `${prefix}lmgtfy`){
      // First, we need to get the arguments. Although, if you use the command handler it will be stored in `args`, so we can just combine it.
  let question = encode(args.join(' ')); // We are combining by space, since we split by spaces before. Then, we are encoding it so we can turn it into a url.
 
  // Now, we can form the link.
  let link = `https://www.lmgtfy.com/?q=${question}`; // Now, this holds the link since it just adds the encoded string to the end.
 
  // Output to chat
  message.channel.send(`**<${link}>**`); // Enclosing in ** makes it bold, enclosing in <> hides the embed that comes from the link.
 
} // Let's test it!

  if(cmd === `${prefix}roleinfo`){
        // Tries to get the first mentioned role or a role ID or a role name (role names are case sensitive)
        let role = message.mentions.roles.first() || message.guild.roles.get(args[0]) || message.guild.roles.find(role => role.name === args[0]);

        // If we can't find any role, then just default to the author's highest role
        if (!role) role = message.member.highestRole;
    
    
        // Define our embed
        message.delete()
        const embed = new Discord.RichEmbed()
            .setColor(role.hexColor)
            .setTitle(`Role: ${role.name}`)
            .addField('Members', role.members.size, true)
            .addField('Hex', role.hexColor, true)
            .addField('Creation Date', role.createdAt.toDateString(), true)
            .addField('Editable', role.editable.toString(), true)
            .addField('Managed', role.managed.toString(), true)
            .addField('ID', role.id, true);
        return message.channel.send({
            embed: embed
        })
    }

  if(cmd === `${prefix}play`){
    message.delete()
    // First, we need to check if the author is connected to voice channel.
    if(!message.member.voiceChannel) return message.channel.send("Please connect to a voice channel.");
    // if not, return & send a message to chat

    // Check if author input a url
    if(!args[0]) return message.channel.send("Sorry, please input a url following the command.");

    // Validate info
    let validate = await ytdl.validateURL(args[0]);

    // Check validation
    if(!validate) return message.channel.send("Sorry, please input a **valid** url following the command.");
    // validate will contain a boolean if the url is valid or not

    // We also need to define info, we can do that here -- It will store the video info
    let info = await ytdl.getInfo(args[0]);

    // Essentialy, everything under the validate statement will be changed

    // First, we need to fetch the active -- Also, if it's not defined it will be hold {}
    let data = ops.active.get(message.guild.id) || {};
    
    // Next, we need to update the data
    if (!data.connection) data.connection = await message.member.voiceChannel.join(); // If there isn't a connection create one
    if (!data.queue) data.queue = []; // If there isn't a query array, create one
    data.guildID = message.guild.id; // This one won't be reset over, so we can just set it whenever we run this
    
    // Next, we need to add the song to the queue
    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    })

    // If there isn't a dispatcher already created, run the play function
    if (!data.dispatcher) play(bot, ops, data); // We will define this later
    else { // Altough, if there is already a dispatcher, run this
        
        // Send added to queue message
        message.channel.send(`Added to Queue: ${info.title} | Requested By: ${message.author.id}`);

    }

    // Finally, update the map
    ops.active.set(message.guild.id, data);

} // Finally, remember to do these two things...

// Now, we can define the play function
async function play(bot, ops, data) { // It will take these 3 parameters, so when calling it when need to pass those through

    // First, we can send the now playing message
    bot.channels.get(data.queue[0].announceChannel).send(`Now Playing: ${data.queue[0].songTitle} | Requested By: ${data.queue[0].requester}`);

    // Next, update the dispatcher data
    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, { filter: 'audioonly'}));
    data.dispatcher.guildID = data.guildID;

    // Finally, create a listener event that will run when the song ends
    data.dispatcher.once('finish', function() {
        // When this happens, we want to run a finish function
        finish(bot, ops, this); //  We also want to pass these 3 parameters
    })

}

function finish(bot, ops, dispatcher) {

    // First, fetch the guild object from the map
    let fetched = ops.active.get(dispatcher.guildID);

    // Remove first item in queue
    fetched.queue.shift();

    // Then, check if the queue is empty
    if (fetched.queue.length > 0) { // If not, run this
        
        // Update the map with the new queue
        ops.active.set(dispatcher.guildID, fetched);

        // Finally, run the play function again which starts the next song
        play(bot, ops, fetched); // Remember to pass these 3 parameters

    } else { // This will run if the queue is empty
        
        // Delete the guild object from the map
        ops.active.delete(dispatcher.guildID);

        // Leave the voice channel
        let vc = bot.guilds.get(dispatcher.guildID).me.voiceChannel; // This get voiceChannel of the bot in the guild
        if (vc) vc.leave(); // If it's in a voice channel, leave it

    } // Remember, to intially pass the play arguments when we set it earlier

}

  if(cmd === `${prefix}queue`){
    message.delete()
    // First, we need to fetch the guild object from the Map
    let fetched = ops.active.get(message.guild.id);

    // Then, we need to check if there was an object there
    if (!fetched) return message.channel.send('There currently isn\'t any music playing in this guild!');

    // Variables
    let queue = fetched.queue;
    let nowPlaying = queue[0]; // Now playing will always be the first item in the queue

    // We can start to form the response, with the first now playing line
    let resp = `__**Now Playing**__\n**${nowPlaying.songTitle}** -- **Requested By:** *${nowPlaying.requester}*\n\n__**Queue**\n`;

    // Next, we need to loop the other items in the queue, so everything after the first one
    for (var i = 1; i < queue.length; i++) {
      resp += `${i}. **${queue[i].songTitle}** -- **Requested By:** *${queue[i].requester}*\n`;
      // This follows the same format as the now playing row
    }

    // Finally, send the output to chat
    message.channel.send(resp);

  } // Now, lets test it!

  if(cmd === `${prefix}reload`){
    resetBot(message.channel);
    function resetBot(channel) {
        message.react('✅')
            .then(message => bot.destroy())
            .then(() => bot.login("botconfig.token"));
}
  }

  if(cmd === `${prefix}invite`){
    message.delete()
    const embed = new Discord.RichEmbed()
    .addField("Invite Your Bot", "Coming Soon!")
    .setColor("#f49542")
    message.channel.send({embed})
  }

  if(cmd === `${prefix}clear`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(":x: ** You must specify the number of messages to delete. **");
    if(!args[0]) return message.channel.send("**You must specify the number of messages to delete**");
    message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`:pencil2: ${args[0]} messages have been deleted.`).then(msg => msg.delete(2000));
  })
}

  if(cmd === `${prefix}say`){

    let say = args.join(' ');
    message.delete()
    message.channel.send(say);
  }

  if(message.content === 'What Is My Avatar?'){

    message.delete()
    message.reply(message.author.avatarURL);
  }

  if(message.content === 'What GEN X TEAM Developer?'){

    message.delete()
    message.reply("```The Bot Developer Is >> FaiqGamingYT <<```");
  }

  if(message.content === 'Dab Player'){

    message.delete()
    message.reply("Saya Adalah Master Of Dab Coy");
  }

  if(message.content === 'Platform'){

    message.delete()
    message.reply("The Platform Is Linux64 System!");
  }

  if(cmd === `${prefix}osd`){
    console.log("OSD Commands Has Running")
    message.delete()
    message.channel.sendMessage("Developer Is FaiqGamingYT");
    message.channel.sendMessage("Platform Is Linux64 System");
    message.channel.sendMessage("System x64");
    message.channel.sendMessage("DiscordLibrary Is Discord.JS");
  }

  if(message.content === 'oof'){

    message.delete()
    message.reply("Thank You So Much You OOF Me On This :heart:")
  }

  if(message.content === 'Hai'){

    message.reply("Hi Juga!")
  }

  if(message.content === 'Sepi'){

    message.reply("Ramein Dong!")
  }

  if(message.content === 'Rame'){

    message.reply("Lanjutin Lagi Coy Ramenya!")
  }

  if(message.content === 'hai'){

    message.reply("Hi Juga!")
  }

  if(message.content === 'sepi'){

    message.reply("Ramein Dong!")
  }

  if(message.content === 'rame'){

    message.reply("Lanjutin Lagi Coy Ramenya!")
  }

  if(cmd === `${prefix}stream`){
    message.delete()
    bot.user.setActivity("" + args.join(" "), { type: "STREAMING", url: "https://www.twitch.tv/jfavignano"})
  }

  if(cmd === `${prefix}watch`){
    message.delete()
    bot.user.setActivity("" + args.join(" "), { type: "WATCHING"})
  }

  if(cmd === `${prefix}listen`){
    message.delete()
    bot.user.setActivity("" + args.join(" "), { type: "LISTENING"})
  }
  
  if(cmd === `${prefix}playing`){
    message.delete()
    bot.user.setActivity("" + args.join(" "), { type: "PLAYING"})
  }

  if(cmd === `${prefix}ping`){
    message.delete()
    message.reply(`Current Ping Is \`${bot.pings[0]}ms\``)
  }

  if(cmd === `${prefix}translate`){
    if (args[0]) {
        let from_language = "auto" // default languages
        let to_language = "en" // default languages
        let tobe_translated = message.content.slice(prefix.length + command.length + 1) // Getting the text
        if (args[0].startsWith("from:")) { // Checking if there is a from:language & to:language, this part is not optimized
            from_language = args[0].slice(5)
            tobe_translated = tobe_translated.slice(args[0].length + 1)
            if (args[1].startsWith("to:")) {
                to_language = args[1].slice(3)
                tobe_translated = tobe_translated.slice(args[1].length + 1) // cutting the from & to from the text
            }
        } else if (args[0].startsWith("to:")) { // Checking if there is a to:language & from:language, Yes I check 2 times :/
            to_language = args[0].slice(3)
            tobe_translated = tobe_translated.slice(args[0].length + 1)
            if (args[1].startsWith("from:")) {
                from_language = args[1].slice(5)
                tobe_translated = tobe_translated.slice(args[1].length + 1) // cutting the from & to from the text
            }
        }
        translate(tobe_translated, {
            from: from_language,
            to: to_language
        }).then(res => { // We translate the text
            from_language = res.from.language.iso
            if (res.from.text.value) tobe_translated = res.from.text.value
            final_text = res.text
            let translateembed = new Discord.RichEmbed()
                .setTitle("Translate") // Optionnal stuff
                .setColor(`0x3980b3`) // Optionnal stuff
                .setDescription("Bip Bip Boop\nThe internet magic is here") // Optionnal stuff
                .addField("`from: " + from_language + "`", "```" + tobe_translated + "```")
                .addField("`to: " + to_language + "`", "```" + final_text + "```")
                .setThumbnail("https://cdn.dribbble.com/users/1341307/screenshots/3641494/google_translate.gif") // Optionnal stuff
            message.channel.send(translateembed)
        }).catch(err => {
            message.channel.send(":x: Usage: `" + prefix + "translate [from:iso] [to:iso] <some text>` \nThe from: and to: are optional, you can check out <http://bit.ly/ISO_codesWiki> for the iso codes\nExample: ```" + prefix + "translate from:ro to:fr Salut, ce mai faci?```") // Yes, I used Romanian for my example. Do you have any problem?
        })
    } else {
        message.channel.send(":x: Usage: `" + prefix + "translate [from:iso] [to:iso] <some text>` \nThe from: and to: are optional, you can check out <http://bit.ly/ISO_codesWiki> for the iso codes\nExample: ```" + prefix + "translate from:ro to:fr Salut, ce mai faci?```")
    }
  
}

})

bot.login(botconfig.token);
