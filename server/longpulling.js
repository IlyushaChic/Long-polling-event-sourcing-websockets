const express = require('express');
const cors = require('cors');
const events = require('events')// нужен для управления событиями в node.js
const PORT = 5000;


const emitter = new events.EventEmitter() //позваоляет регистрировать события, подписываться на них и вызывать 

const app = express()


app.use(cors())// добавление middlewere 
app.use(express.json())

app.get('/get-messages', (req, res) => {
   emitter.once('newMessage', (message) => {
      res.json(message)
   })// регестрируем событие

})//получение сообщения


app.post('/new-messages', ((req, res) => {
   const message = req.body;
   emitter.emit('newMessage', message)
   res.status(200)
}))//отправка сообщения


app.listen(PORT, () => console.log(`server started on port ${PORT}`))


/** 
 * Пользователь отправляет get запрос, но мы не возвращаем ему ответ
 * мы подписываемся на событие и ждем 
 * 
 * 
 * когда кто-то другой отправил сообщение мы прошлое событие вызываем 
 * после чего всем участникам чата возвращается ответ с этим сообщением

*/