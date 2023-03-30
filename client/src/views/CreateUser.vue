<template>
    <div class="card">
        <h3>Новый пользователь</h3>
        <div class="row">
            <div class="input-block">
                <p>Имя:</p>
                <input v-model="newUser.name" type="text" @change="newUser.name = capitalizeFirstLetter(newUser.name)">
            </div>
            <div class="input-block">
                <p>Фамилия:</p>
                <input type="text" v-model="newUser.surname" @change="newUser.surname = capitalizeFirstLetter(newUser.surname)">
            </div>
        </div>
        <div class="row">
            <div class="input-block">
                <p>Отчество:</p>
                <input type="text" v-model="newUser.fathername" @change="newUser.fathername = capitalizeFirstLetter(newUser.fathername)">
            </div>
            <div class="input-block">
                <p>Логин</p>
                <input type="text" v-model="newUser.login">
            </div>
        </div>

        <div class="input-block">
            <p>Номер телефона:</p>
            <input type="text" @keyup="phoneValidation" v-model="newUser.phone">
        </div>
        <div class="input-block">
            <p>Почта:</p>
            <input type="text" v-model="newUser.email">
        </div>
        <div class="input-block">
            <p>Пароль:</p>
            <input type="password" v-model="newUser.password">
        </div>
        <button @click="addUser()">Добавить пользователя</button>
    </div>
</template>

<script setup>
// Импорт зависимостей
import { ref, computed } from 'vue'
import {useStore} from 'vuex'

// Ссылка на глобальное хранилище
const store = useStore()

// Объект нового пользователя
const newUser = ref({
    name: '',
    surname: '',
    fathername: '',
    phone: '',
    email: '',
    login: '',
    password: ''
})

// Валидация данных
const phoneValidation = (e) => {
    if (e.key != 'Backspace') {
        if(newUser.value.phone.length > 18) newUser.value.phone = newUser.value.phone.slice(0, newUser.value.phone.length-1)
        if (newUser.value.phone.length == 1) newUser.value.phone = '+7-(' + newUser.value.phone
        else if (newUser.value.phone.length == 8 && newUser.value.phone[newUser.value.phone.length - 1] >= '0') newUser.value.phone = newUser.value.phone.slice(0, newUser.value.phone.length-1) + ')-' + newUser.value.phone[newUser.value.phone.length-1]
        else if (newUser.value.phone.length == 13 && newUser.value.phone[newUser.value.phone.length - 1] >= '0') newUser.value.phone = newUser.value.phone.slice(0, newUser.value.phone.length-1) + '-' + newUser.value.phone[newUser.value.phone.length-1]
        else if (newUser.value.phone.length == 16 && newUser.value.phone[newUser.value.phone.length - 1] >= '0')newUser.value.phone = newUser.value.phone.slice(0, newUser.value.phone.length-1) + '-' + newUser.value.phone[newUser.value.phone.length-1]
    }
    else{
        if(newUser.value.phone[newUser.value.phone.length-1]==')') newUser.value.phone = newUser.value.phone.slice(0, newUser.value.phone.length-1)
        if(newUser.value.phone == '+7-(') newUser.value.phone = ''
    }
}

const capitalizeFirstLetter = (string) => {
    console.log(string)
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const emailValidation = (email)=>{
    const reg = /^((([0-9A-Za-z]{1}[-0-9A-z\.]{1,}[0-9A-Za-z]{1})|([0-9А-Яа-я]{1}[-0-9А-я\.]{1,}[0-9А-Яа-я]{1}))@([-A-Za-z]{1,}\.){1,2}[-A-Za-z]{2,})$/
    return reg.test(email)
}

const addUser = ()=>{
    store.commit('add_user', newUser.value)
    newUser.value = {
    name: '',
    surname: '',
    fathername: '',
    phone: '',
    email: '',
    login: '',
    password: ''
}
}


</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.row {
    display: flex;
    gap: 15px;
}

.input-block {
    width: 100%;
    font-size: 14px;
    font-weight: bold;
}

.input-block>input {
    margin-top: 5px;
    width: 100%;
    background-color: var(--bluish);
    border: none;
    border-radius: 10px;
    padding: 5px;
    height: 35px;
    color: white;
    padding-left: 15px;
    transition: .3s;
}

.input-block>input:focus {
    box-shadow: 0 0 5px 4px rgb(0, 0, 0, .2);
    transition: .5s;
}

button {
    border: solid 3px var(--accent);
    border-radius: 15px;
    background-color: transparent;
    transition: .3s;
    color: var(--accent);
    padding: 15px;
    width: 100%;
    font-weight: bold;
    text-align: center;
}

button:hover {
    transition: .3s;
    transform: scale(1.1);
}
</style>