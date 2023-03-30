const { readFileSync, writeFileSync } = require('fs')
const path = require('path')

const dbPath = path.join(__dirname, './usersDB.json' )

const getUsers = () => {
    return JSON.parse(readFileSync(dbPath, 'utf8'))
}
const saveChanges = (newDB) => {
    writeFileSync(dbPath, JSON.stringify(newDB))
}


// Данные функции применялись бы при необходимости изменения данных на сервере, а не у клиента
// const getUsers = (req) => {
//     let db = JSON.parse(readFileSync(dbPath, 'utf8'))
//     if(req == {}){
//         return db
//     }
//     const res = db.filter(el => {
//         return el[req.prop] == req.value
//     })
//     return res
// }
// const deleteUser = (req) => {
//     try {
//         let db = JSON.parse(readFileSync(dbPath, 'utf8'))
//         let changed = false
//         for (let i = 0; i < db.length; i++) {
//             if (db[i][req.prop] == req.value) {
//                 if (db[i].password == req.password) {
//                     db.splice(i, 1)
//                     changed = true
//                     break
//                 }
//             }
//         }
//         if (changed) {
//             writeFileSync(dbPath, JSON.stringify(db))
//             return 'Changed succesfully.'
//         }
//         else {
//             return 'Nothing found.'
//         }
//     } catch (error) {
//         return error
//     }

// }

// const changeUser = (req) => {
//     try {
//         let db = JSON.parse(readFileSync(dbPath, 'utf8'))
//         let changed = false
//         for (let i = 0; i < db.length; i++) {
//             if (db[i][req.prop] == req.value) {
//                 if (db[i].password == req.password) {
//                     db[i] = req.newState
//                 }
//             }
//         }
//         if (changed) {
//             writeFileSync(dbPath, JSON.stringify(db))
//             return 'Changed succesfully.'
//         }
//         else {
//             return 'Nothing found.'
//         }
//     } catch (error) {
//         return error
//     }

// }



module.exports = {getUsers, saveChanges}