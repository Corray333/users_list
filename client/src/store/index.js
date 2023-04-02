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
        },
        change_user(state, req){
            state.users[req.id] = req.value
        },
        delete_user(state, id){
            state.users.splice(id, 1)
        },
        sort_users(state, params){
            state.users.sort(( a, b ) => {
                if ( params.descending ? a[params.option] < b[params.option] : a[params.option] > b[params.option]  ){
                  return 1;
                }
                  if ( params.descending ? a[params.option] > b[params.option] : a[params.option] < b[params.option]  ){
                  return -1;
                }
                return 0;
              })
        }
    }
})

export default store