<template>
    <!-- Список всех пользователей -->
    <div class="cards-list">
        <div class="card" v-for="(user, i) of $store.state.users" :key="i">
            <p>{{ user.name }}</p>
            <p>{{ user.surname }}</p>
            <p>{{ user.fathername }}</p>
            <p>{{ user.phone }}</p>
            <p>{{ user.email }}</p>
            <p>{{ user.login }}</p>
        </div>
    </div>
</template>

<script setup>

</script>

<style scoped>



</style>