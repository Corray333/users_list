<template>
    <!-- Список всех пользователей -->
    <div class="cards-list">
        <div class="card" v-for="(user, i) of $store.state.users" :key="i">
            <p>Имя: {{ user.name }}</p>
            <p>Фамилия: {{ user.surname }}</p>
            <p>Отчество: {{ user.fathername }}</p>
            <p>Телефон: {{ user.phone }}</p>
            <p>Почта: {{ user.email }}</p>
            <p>Логин: @{{ user.login }}</p>
        </div>
    </div>
</template>

<script setup>
</script>

<style scoped>

</style>