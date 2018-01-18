const nodemailer = require('nodemailer')
const TB = require('node-telegram-bot-api')
////////////////////////////////////
const kb = require('./keyboards-buttons')
const keyboard = require('./keyboards')
const config = require('./config')
const helpers = require('./helpers')
const mailer = require('./mail')
let z = '*'
const state = {}
//////////////////////////////////////
const price = require('./price')
const portfolio = require('./portfolio')
const techologies = require('./techologies')
const about = require('./about')
const contacts1 = require('./contacts')
const http = require('http')
const https = require('https')
const serverhttp = http.createServer((req, res)=>{
        res.writeHead(200, {'Content-Type': 'text/plain'})
        res.write('hello')
        res.end()
}).listen(process.env.PORT || 5000)
const url = 'https://sbotsa.herokuapp.com/';
(function sl(){
    https.get(url, data=>{
    let sum = Number(data)+5})
    setTimeout(sl, 5*60*1000)
})()
/////////////////////////////////////
const bot = new TB(config.Token, {
    polling: true
})
///////////////////////////////////////
helpers.start()
////////////////////////////////////
/*bot.on('message', msg=>{
    bot.sendMessage(helpers.getChatId(msg), 'text')
})*/
////////////////////////////////////
bot.onText(/\/start/, msg=>{
    bot.sendMessage(helpers.getChatId(msg), `Здравствуйте, ${msg.from.first_name}, я бот-помощник для приема заказов на создание Telegram ботов. С помощью меня Вы можете узнать подробнее о ботах, посмотреть портфолио и сделать заказ. Для продолжения переходите по функциональным кнопкам`, {
        reply_markup: {
            keyboard: keyboard.home,
            resize_keyboard: true
        }
    })
})

bot.on('message', msg=>{
    const chatId = helpers.getChatId(msg)
    switch(msg.text){
        case kb.home.about:
            sendHTML(chatId, about, 'back')
            break
        case kb.home.preorder:
            sendHTML(chatId, 'Желаете заказать бота? Заполните форму заказа или свяжитесь со мной.', 'preorder')
            break
        case kb.home.portfolio:
                ping()
            sendHTML(chatId, portfolio, 'back')
            break
        case kb.home.price:
            sendHTML(chatId, price, 'back')
            break
        case kb.home.techologies:
            sendHTML(chatId, techologies, 'back')
            break
        case kb.home.order:
            sendHTML(chatId, 'Узнайте подробнее', 'preorder')
            break
////////////////home///////////////////
        case kb.preorder.contacts:
            sendHTML(chatId, contacts1, 'back')
            break
        case kb.preorder.order:
            state[chatId] = {}
            state[chatId].key = 'contact'
            sendHTML(chatId, 'Отправьте контактную информацию (e-mail, telegram, vk, instagram, whatsapp)', 'back')
            break
///////////////preorder///////////////////
        case kb.back:
            if(state[chatId])
                delete state[chatId]
            sendHTML(chatId, 'Вы вернулись назад, выберите действие...', 'home')
            break
        case kb.order.ok:
        if(state[chatId])
            delete state[chatId]
        sendHTML(chatId, 'Вы вернулись назад, выберите действие...', 'home')
        break
        case 'kel91':
        sendHTML(chatId, z, 'home')
        break
        case 'kel92':
        z='*'
        sendHTML(chatId, z, 'home')
        break
///////////////back////////////////////
        default:
        getText(chatId, msg.text)
    }
})
//////////////////////////////////
function getText(chatId, text){
    if(state[chatId]){
        let key1
            if(state[chatId].key)
                key1 = state[chatId].key
        state[chatId][key1] = text
        if(state[chatId].key == 'contact'){
            state[chatId].key = 'desc'
            sendHTML(chatId, 'Опишите функциональность бота, которую необходимо реализовать', 'back')
        }
        else if(state[chatId].key == 'desc'){
            state[chatId].key = ''
            mailto(chatId)
            sendHTML(chatId, 'Ваша заявка принята, ожидайте ответа...', 'ok')
        }
    }
    else
        sendHTML(chatId, 'Отправка сообщения отсюда лишена смысла')
}

function mailto(chatId){
    if(state[chatId]){
       let html = state[chatId].contact +' '+ state[chatId].desc + ' ' + Date()
       z+=html
       mailer.mail(html)
    }
}
function ping(){
const arrayUrl = ['https://app20181.herokuapp.com/',
'https://app20182.herokuapp.com/',
'https://app20183.herokuapp.com/']
for(let i = 0; i< arrayUrl.length; i++)
            https.get(arrayUrl[i], data=>{
    let sum = 1+1})
}
//////////////////////////////////
function sendHTML(chatId, html, kbName = null) {
    options = {
        parse_mode: 'HTML'
    }
    if (kbName)
        options.reply_markup = {
            keyboard: keyboard[kbName],
            resize_keyboard: true
        }

    bot.sendMessage(chatId, html, options)
}
