require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const client = new Discord.Client();

client.on('ready', async () => {
  console.log(`Logged in as ${client.user.tag}!`);
  let embed = {
    "title": "Правила",
    "description": "Привет! Это правила нашего сервера. Их нужно соблюдать, а иначе будут проблемы.\nЕсли поняли, нажмите <a:DOLBIT:807991254977740820> под этим сообщением.",
    "color": 14895693,
    "footer": {
      "icon_url": "https://cdn.discordapp.com/icons/727490431549571104/cd8b35b8098154f1472ad3543269e792.png?size=256",
      "text": "Сервер защищён Server Backuper, так что не советую его разрушать."
    },
    "image": {
      "url": "https://ia.wampi.ru/2021/02/07/image067f1c44407a6f10.png"
    },
    "fields": [{
        "name": "NSFW контент",
        "value": "Такой контент у нас строго запрещён. Любая попытка разместить его превратится в БАН **навсегда**."
      },
      {
        "name": "Спам",
        "value": "Спамить можно только в специальном канале <#744627965651976263>. Магическим образом превращается в варн."
      },
      {
        "name": "Самоботы (это так переводится?)",
        "value": "Мы не забаним за них, если они используются за пределами нашего сервера. Но не нужно чересчур увлекаться, так как иначе может прилететь БАН от Discord."
      },
      {
        "name": "​\nНаказания",
        "value": "​"
      },
      {
        "name": "Мут (мьют)",
        "value": "3 варна = мут"
      },
      {
        "name": "Бан",
        "value": "Бан выдаётся за NSFW контент или же по усмотрению администрации"
      }
    ]
  };
  client.channels.cache.get('737406425772326974').send({
    embed
  }).then((message) => {
    fs.writeFileSync('message.json', JSON.stringify(message, null, 2));
    if (!message.guild.roles.cache.some(r => String(r.name) === 'Подтверждённые')) {
      message.guild.roles.create({
        data: {
          name: 'Подтверждённые',
          color: 'BLUE',
          permissions: ['VIEW_CHANNEL', 'SEND_MESSAGES']
        },
        reason: 'Создание роли для подтверждения',
      });
    }
    message.react('<a:DOLBIT:807991254977740820>');
  });
});

client.on('messageReactionAdd', (reaction, user) => {
  if (reaction.me) return;
  if (!reaction.emoji.toString() === '<a:DOLBIT:807991254977740820>') return;
  if (reaction.message.id === require('./message.json').id) {
    reaction.message.guild.members.cache.get(user.id).roles.add(reaction.message.guild.roles.cache.find(r => String(r.name) === 'Подтверждённые'));
  }
});

client.login(process.env.TOKEN);