<template>
    <div class="card">
        <h3>Новый пользователь</h3>
        <div class="row">
            <div class="input-block">
                <p>Имя:</p>
                <input v-model="newUser.name" type="text" @change="newUser.name = validators.capitalizeFirstLetter(newUser.name)">
            </div>
            <div class="input-block">
                <p>Фамилия:</p>
                <input type="text" v-model="newUser.surname"
                    @change="newUser.surname = validators.capitalizeFirstLetter(newUser.surname)">
            </div>
        </div>
        <div class="row">
            <div class="input-block">
                <p>Отчество:</p>
                <input type="text" v-model="newUser.fathername"
                    @change="newUser.fathername = validators.capitalizeFirstLetter(newUser.fathername)">
            </div>
            <div class="input-block">
                <p>Логин</p>
                <input type="text" v-model="newUser.login">
            </div>
        </div>

        <div class="input-block">
            <p>Номер телефона:</p>
            <input type="text" @keyup="phoneFormatter" v-model="newUser.phone">
        </div>
        <div class="input-block">
            <p>Почта:</p>
            <input type="text" v-model="newUser.email" @change="validators.emailValidation(newUser.email)">
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
import { ref } from 'vue'
import { useStore } from 'vuex'
import validators from '../helpers/validators'
import additionalHelpers from '../helpers/additionalHelpers'


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

// Форматирует номер телефона
const phoneFormatter = (e) => {
    if (e.key != 'Backspace') {
        if (newUser.value.phone.length > 18) newUser.value.phone = newUser.value.phone.slice(0, newUser.value.phone.length - 1)
        if (newUser.value.phone.length == 1) newUser.value.phone = '+7-(' + newUser.value.phone
        else if (newUser.value.phone.length == 8 && newUser.value.phone[newUser.value.phone.length - 1] >= '0') newUser.value.phone = newUser.value.phone.slice(0, newUser.value.phone.length - 1) + ')-' + newUser.value.phone[newUser.value.phone.length - 1]
        else if (newUser.value.phone.length == 13 && newUser.value.phone[newUser.value.phone.length - 1] >= '0') newUser.value.phone = newUser.value.phone.slice(0, newUser.value.phone.length - 1) + '-' + newUser.value.phone[newUser.value.phone.length - 1]
        else if (newUser.value.phone.length == 16 && newUser.value.phone[newUser.value.phone.length - 1] >= '0') newUser.value.phone = newUser.value.phone.slice(0, newUser.value.phone.length - 1) + '-' + newUser.value.phone[newUser.value.phone.length - 1]
    }
    else {
        if (newUser.value.phone[newUser.value.phone.length - 1] == ')') newUser.value.phone = newUser.value.phone.slice(0, newUser.value.phone.length - 1)
        if (newUser.value.phone == '+7-(') newUser.value.phone = ''
    }
}




const addUser = async () => {
    if (validators.emailValidation(newUser.value.email) && validators.phoneValidation(newUser.value.phone) && validators.passwordValidation(newUser.value.password) && validators.wordValidation(newUser.value.name) && validators.wordValidation(newUser.value.surname) && validators.wordValidation(newUser.value.fathername)) {
        newUser.value.password = await additionalHelpers.hash(newUser.value.password)
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
    else{
        // TODO Сообщение об ошибке
        if(!validators.emailValidation(newUser.value.email)){
            alert('Почта введена в неверном формате!')
        }
        else if(!validators.phoneValidation(newUser.value.phone)){
            alert('Номер должен быть в формате +7-(999)-999-99-99.')
        }
        else if(!validators.passwordValidation(newUser.value.password)){
            alert('Пароль должен быть больше 8 символов, содержать хотя бы одну заглавную, строчную букву, спецсимвол и цифру.')
        }
        else if(!validators.wordValidation(newUser.value.name) || validators.wordValidation(newUser.value.surname) || validators.wordValidation(newUser.value.fathername)){
            alert('Имя, фамилия и отчество должно состоять только из букв.')
        }
    }

}


</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    gap: 15px;
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