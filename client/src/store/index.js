import {createStore} from 'vuex'

const store =  createStore({
    state:{
        users:[]
    },
    getters:{},
    mutations:{
        set_users(state, newList){
            state.users = newList
        },
        add_user(state, user){
            state.users.push(user)
        }
    }
})

export default store