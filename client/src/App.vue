<template>
    <!-- Основной блок -->
    <main>
        <!-- Шапка -->
        <header>
            <router-link to="/">
                <img src="./components/media/i-logo.png" alt="">
                <h3>База данных</h3>
            </router-link>
        </header>
        <!-- Блок со всей логикой -->
        <div class="content">
            <!-- Блок с выводом и информации -->
            <div class="content-container">
                <router-view></router-view>
            </div>
            <!-- Меню -->
            <ul class="sidebar">
                <router-link to="/users">Список пользователей</router-link>
                <router-link to="/create-user">Новый пользователь</router-link>
                <router-link to="/delete-by-property">Удалить по параметру</router-link>
                <router-link to="/change-by-property">Изменить по параметру</router-link>
                <router-link to="/send-email">Отправить e-mail</router-link>
                <router-link to="/sort">Отсортировать</router-link>
                <button @click="saveChanges()">Сохранить изменения</button>
                <button @click="exit()">Выход</button>
            </ul>
        </div>
    </main>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const store = useStore()
const users = ref()

const router = useRouter()

// Загрузка данных с сервера
onMounted(() => {
    fetch('http://localhost:5000')
        .then(response => response.json())
        .then(data => { store.commit('set_users', data) })
        .catch(error => { users.value = `Ошибка: ${error}` })

})


const saveChanges = () => {
    const url = 'http://localhost:5000';
    const data = store.state.users

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}
const exit = async () => {
    await router.push('/')
    location.reload()
}

</script>

<style scoped>
/* Стили основного блока */
main {
    background-color: var(--dark);
    width: 850px;
    height: 100%;
    border-radius: 25px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 25px;
    box-shadow: 0 0 25px rgb(0, 0, 0, .5);
}

/* Стили шапки */
header>a {
    display: flex;
    align-items: center;
    gap: 15px;
    color: var(--accent);
}

header>a>img {
    height: 50px;
}

/* Стили блока с логикой */
.content {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 25px;
    overflow: hidden;
}

/* Стили меню навигации */
.sidebar {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: var(--semi-dark);
    padding: 25px;
    border-radius: 25px;
    box-shadow: 0 0 10px rgb(0, 0, 0, .3);
    height: fit-content;
}

.sidebar>* {
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

.sidebar>.router-link-active {
    color: var(--dark);
    background-color: var(--accent);
    border-color: var(--dark);
}

.sidebar>a:hover,
button:hover {
    transition: .3s;
    transform: scale(1.1);
}

/* Стили блока с роутами */
.content-container {
    width: 100%;
    overflow-y: scroll;
    filter: drop-shadow(0 0 7px rgb(0,0,0,.5));
    padding: 10px;
}
.content-container::-webkit-scrollbar{
    width: 0;
}
</style>
