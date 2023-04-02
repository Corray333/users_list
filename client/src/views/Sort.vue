<template>
    <div class="card">
            <h3>Поиск пользователя</h3>
            <div class="input-block">
                <p>Сортировать по:</p>
                <select v-model="request.option">
                    <option value="name">Имя</option>
                    <option value="surname">Фамилия</option>
                    <option value="login">Логин</option>
                </select>
            </div>
            <div class="row">
                <p>По убыванию:</p>
                <input type="checkbox" v-model="request.descending">
            </div>
            <button @click="sortUsers()">Найти пользователя</button>
        </div>
</template>

<script setup>

import { ref } from 'vue'
import { useStore } from 'vuex'

const store = useStore()

const request = ref({
    option: 'name',
    descending: false
})

const sortUsers = ()=>{
    store.commit('sort_users', request.value)
}




</script>

<style scoped>
.card {
    gap: 15px;
    display: flex;
    flex-direction: column;
}
select{
    padding: 7px;
    background-color: var(--bluish);
    border: none;
    border-radius: 10px;
    color: white;
    width: 100%;
    margin-top: 5px;
}
input{
    width: 15px;
    height: 15px;
    padding: 0;
}
input:focus{
    box-shadow: none;
}
textarea{
    height: 250px;
}
</style>