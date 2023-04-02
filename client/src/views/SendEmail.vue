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
                <p>Тема письма:</p>
                <input type="text" v-model="request.subject">
            </div>
            <div class="input-block">
                <p>Текст письма:</p>
                <textarea type="text" v-model="request.text" class="autosize"></textarea>
            </div>
            <button @click="sendEmail()">Отправить письмо</button>
        </div>
    </transition>
</template>

<script setup>

import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const request = ref({
    name: '',
    surname: '',
    phone: '',
    email: '',
    password: '',
    subject: '',
    text: ''
})

const requestedUser = ref({}) // Редактируемый пользователь
const userIndex = ref() // Индекс найденного пользователя
const currentWindow = ref(0) // Текущее окно

const findUser = () => {
    if ((request.value.name != '' && request.value.surname != '') || request.value.phone != '' || request.value.email != '') {
        store.state.users.every((el, i) => {
            if ((request.value.name == '' && request.value.surname == '' || el.name == request.value.name && el.surname == request.value.surname) && (request.value.phone == '' || el.phone == request.value.phone) && (request.value.email == '' || el.email == request.value.email)) {
                Object.assign(requestedUser.value, el)
                userIndex.value = i
                return false
            }
            return true
        })
        if (userIndex.value == undefined) alert('Пользователь не найден!')
        else currentWindow.value = 1
    }
    else {
        alert('Поля не должны быть пустыми!')
    }
}


const sendEmail = () => {
    fetch('http://localhost:5000/', {
        method: 'POST',
        body: JSON.stringify({ recipient: requestedUser.value.email, subject: request.value.subject, text: request.value.text }),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => response.json()).then(data => alert(data.text))
}





</script>

<style scoped>
.card {
    gap: 15px;
    display: flex;
    flex-direction: column;
}
textarea{
    height: 250px;
}
</style>