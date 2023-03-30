const express = require('express')
const cors = require('cors')
const {getUsers, deleteUser, changeUser} = require('./db')

const app = express()

app.use(express.json())
app.use(cors())

// Получение всех пользователей
app.get('/', (req, res)=>{
    res.send(getUsers({}))
})


app.listen(5000, ()=>{
    console.log('Server is listening on port 5000...')
})