const express = require('express')
const cors = require('cors')
const {getUsers, saveChanges} = require('./db')
const {sendEmail} = require('./emailSender')

const app = express()

app.use(express.json())
app.use(cors())

// Получение всех пользователей
app.get('/', (req, res)=>{
    res.send(getUsers())
})

app.put('/', (req, res)=>{
    saveChanges(req.body)
    res.send('Данные занесены в базу данных!')
})

app.post('/', (req,res)=>{
    console.log(req.body)
    sendEmail(req.body.recipient, req.body.subject, req.body.text).then(res.send({text: 'Сообщение отправлено!'}))
})


app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...')
})