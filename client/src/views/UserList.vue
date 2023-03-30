<template>
    <h1>Users</h1>
</template>

<script>
fetch('http://localhost:5000', {
    method: 'GET', headers: {
        Accept: "application/json",
        "Content-Type": "application/json;charset=UTF-8",
    }
}).then(res=>console.log(res))

</script>