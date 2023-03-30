const { readFileSync, writeFileSync } = require('fs')

const dbPath = './usersDB.json' 

const getUsers = (req) => {
    let db = JSON.parse(readFileSync(dbPath, 'utf8'))
    if(req == {}){
        return db
    }
    const res = db.filter(el => {
        return el[req.prop] == req.value
    })
    return res
}

const deleteUser = (req) => {
    try {
        let db = JSON.parse(readFileSync(dbPath, 'utf8'))
        let changed = false
        for (let i = 0; i < db.length; i++) {
            if (db[i][req.prop] == req.value) {
                if (db[i].password == req.password) {
                    db.splice(i, 1)
                    changed = true
                    break
                }
            }
        }
        if (changed) {
            writeFileSync(dbPath, JSON.stringify(db))
            return 'Changed succesfully.'
        }
        else {
            return 'Nothing found.'
        }
    } catch (error) {
        return error
    }

}

const changeUser = (req) => {
    try {
        let db = JSON.parse(readFileSync(dbPath, 'utf8'))
        let changed = false
        for (let i = 0; i < db.length; i++) {
            if (db[i][req.prop] == req.value) {
                if (db[i].password == req.password) {
                    db[i] = req.newState
                }
            }
        }
        if (changed) {
            writeFileSync(dbPath, JSON.stringify(db))
            return 'Changed succesfully.'
        }
        else {
            return 'Nothing found.'
        }
    } catch (error) {
        return error
    }

}



module.exports = {getUsers, deleteUser, changeUser}