<template>
    <transition>
        <div class="card" v-if="currentWindow == 0">
            <h3>Поиск пользователя</h3>
            <div class="row">
                <div class="input-block">
                    <p>Имя:</p>
                    <input type="text" v-model="request.name">
                </div>
                <div class="input-block">
                    <p>Фамилия:</p>
                    <input type="text" v-model="request.surname">
                </div>
            </div>
            <div class="input-block">
                <p>Номер телефона:</p>
                <input type="text" v-model="request.phone">
            </div>
            <div class="input-block">
                <p>Почта:</p>
                <input type="text" v-model="request.email">
            </div>
            <button @click="findUser()">Найти пользователя</button>
        </div>
    </transition>
    <transition>
        <div class="card" v-if="currentWindow == 1">
            <div class="input-block">
                <p>Пароль:</p>
                <input type="password" v-model="request.password">
            </div>
            <button @click="checkPassword()">Ввести пароль</button>
        </div>
    </transition>
    <transition>
        <div class="card" v-if="currentWindow == 2">
            <h3>Новый пользователь</h3>
            <div class="row">
                <div class="input-block">
                    <p>Имя:</p>
                    <input v-model="requestedUser.name" type="text" @change="requestedUser.name = validators.capitalizeFirstLetter(requestedUser.name)">
                </div>
                <div class="input-block">
                    <p>Фамилия:</p>
                    <input type="text" v-model="requestedUser.surname"
                        @change="requestedUser.surname = validators.capitalizeFirstLetter(requestedUser.surname)">
                </div>
            </div>
            <div class="row">
                <div class="input-block">
                    <p>Отчество:</p>
                    <input type="text" v-model="requestedUser.fathername"
                        @change="requestedUser.fathername = validators.capitalizeFirstLetter(requestedUser.fathername)">
                </div>
                <div class="input-block">
                    <p>Логин</p>
                    <input type="text" v-model="requestedUser.login">
                </div>
            </div>

            <div class="input-block">
                <p>Номер телефона:</p>
                <input type="text" @keyup="phoneFormatter" v-model="requestedUser.phone">
            </div>
            <div class="input-block">
                <p>Почта:</p>
                <input type="text" v-model="requestedUser.email" @change="validators.emailValidation(requestedUser.email)">
            </div>
            <button @click="changeUser()">Изменить данные</button>
        </div>
    </transition>
</template>

<script setup>

import { ref } from 'vue'
import { useStore } from 'vuex'
import validators from '../helpers/validators'

const store = useStore()

const request = ref({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: ''
})

const requestedUser = ref({}) // Редактируемый пользователь
const userIndex = ref() // Индекс найденного пользователя
const currentWindow = ref(0) // Текущее окно

const phoneFormatter = (e) => {
    if (e.key != 'Backspace') {
        if (requestedUser.value.phone.length > 18) requestedUser.value.phone = requestedUser.value.phone.slice(0, requestedUser.value.phone.length - 1)
        if (requestedUser.value.phone.length == 1) requestedUser.value.phone = '+7-(' + requestedUser.value.phone
        else if (requestedUser.value.phone.length == 8 && requestedUser.value.phone[requestedUser.value.phone.length - 1] >= '0') requestedUser.value.phone = requestedUser.value.phone.slice(0, requestedUser.value.phone.length - 1) + ')-' + requestedUser.value.phone[requestedUser.value.phone.length - 1]
        else if (requestedUser.value.phone.length == 13 && requestedUser.value.phone[requestedUser.value.phone.length - 1] >= '0') requestedUser.value.phone = requestedUser.value.phone.slice(0, requestedUser.value.phone.length - 1) + '-' + requestedUser.value.phone[requestedUser.value.phone.length - 1]
        else if (requestedUser.value.phone.length == 16 && requestedUser.value.phone[requestedUser.value.phone.length - 1] >= '0') requestedUser.value.phone = requestedUser.value.phone.slice(0, requestedUser.value.phone.length - 1) + '-' + requestedUser.value.phone[requestedUser.value.phone.length - 1]
    }
    else {
        if (requestedUser.value.phone[requestedUser.value.phone.length - 1] == ')') requestedUser.value.phone = requestedUser.value.phone.slice(0, requestedUser.value.phone.length - 1)
        if (requestedUser.value.phone == '+7-(') requestedUser.value.phone = ''
    }
}



const findUser = () => {
    if ((request.value.name != '' && request.value.surname != '') || request.value.phone != '' || request.value.email != '') {
        store.state.users.every((el, i)=>{
            if((request.value.name == '' && request.value.surname == '' || el.name == request.value.name && el.surname == request.value.surname) && (request.value.phone == '' || el.phone == request.value.phone) && (request.value.email == '' || el.email == request.value.email)){
                Object.assign(requestedUser.value, el)
                userIndex.value = i
                return false
            }
            return true
        })
        if (requestedUser.value.length == 0) alert('Пользователь не найден!')
        else currentWindow.value = 1
    }
    else {
        alert('Поля не должны быть пустыми!')
    }
}

const hash = async (text) => {
    const msgBuffer = new TextEncoder().encode(text)
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
    const hashArray = Array.from(new Uint8Array(hashBuffer))                 
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
    return hashHex
}

const checkPassword = async ()=>{
    const enteredPass = await hash(request.value.password)
    if(enteredPass == requestedUser.value.password) currentWindow.value = 2
    else alert('Неверный пароль!')
}



const changeUser = () => {
    if (validators.emailValidation(requestedUser.value.email) && validators.phoneValidation(requestedUser.value.phone)&& validators.wordValidation(requestedUser.value.name) && validators.wordValidation(requestedUser.value.surname) && validators.wordValidation(requestedUser.value.fathername)) {
        console.log(userIndex.value)
        store.commit('change_user', {value: requestedUser.value, id: userIndex.value})
        requestedUser.value = {
            name: '',
            surname: '',
            fathername: '',
            phone: '',
            email: '',
            login: '',
            password: ''
        }
        currentWindow.value = 0
    }
    else{
        // TODO Сообщение об ошибке
        if(!validators.emailValidation(requestedUser.value.email)){
            alert('Почта введена в неверном формате!')
        }
        else if(!validators.phoneValidation(requestedUser.value.phone)){
            alert('Номер должен быть в формате +7-(999)-999-99-99.')
        }
        else if(!validators.wordValidation(requestedUser.value.name) || validators.wordValidation(requestedUser.value.surname) || validators.wordValidation(requestedUser.value.fathername)){
            alert('Имя, фамилия и отчество должно состоять только из букв.')
        }
    }

}

</script>

<style scoped>
.card {
    gap: 15px;
    display: flex;
    flex-direction: column;
}
</style>