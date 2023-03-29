<template>
    <!-- Основной блок -->
    <main>
        <!-- Шапка -->
        <header>
            <img src="./components/media/i-logo.png" alt="">
            <h3>База данных</h3>
        </header>
        <!-- Блок со всей логикой -->
        <div class="content">
            <!-- Блок с выводом и информации -->
            <div class="content-container">
                <router-view></router-view>
            </div>
            <!-- Меню -->
            <ul class="sidebar">
                <li><button>Список пользователей</button></li>
                <li><button>Новый пользователь</button></li>
                <li><button>Удалить по параметру</button></li>
                <li><button>Изменить по параметру</button></li>
                <li><button>Отправить e-mail</button></li>
                <li><button>Отсортировать</button></li>
                <li><button>Сохранить изменения</button></li>
                <li><button>Выход</button></li>
            </ul>
        </div>
    </main>
</template>

<script setup>

</script>

<style scoped>
/* Стили основного блока */
main {
    background-color: var(--dark);
    width: 750px;
    height: 100%;
    border-radius: 25px;
    padding: 50px;
    display: flex;
    flex-direction: column;
    gap: 25px;
}

/* Стили шапки */
header {
    display: flex;
    align-items: center;
    gap: 15px;
    color: var(--accent);
}

header>img {
    height: 50px;
}

/* Стили блока с логикой */
.content {
    display: flex;
    width: 100%;
    justify-content: space-between;
}

.sidebar {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 15px;
    background-color: var(--semi-dark);
    padding: 25px;
    border-radius: 25px;
    box-shadow: 0 0 10px rgb(0,0,0,.3);
}
.sidebar>li>button{
    border: solid 3px var(--accent);
    border-radius: 15px;
    background-color: transparent;
    transition: .3s;
    color: var(--accent);
    padding: 15px;
    width: 100%;
    font-weight: bold;
}
.sidebar>li>button:hover{
    transition: .3s;
    transform: scale(1.1);
}
</style>
