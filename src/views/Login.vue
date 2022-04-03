<template>
    <div>
        <h1>Login</h1>
        <p>{{userMayuscula}}</p>
        <p>{{userStore.minuscula}}</p>
        <p>{{userStore.userData.toLocaleUpperCase()}}</p>
    </div>
</template>

<script setup>
    import { computed } from '@vue/reactivity';
    import {useUserStore} from '../stores/user'
    
    const userStore = useUserStore()
    const userMayuscula = computed(() => userStore.userData.toUpperCase())  //con propiedad computada
</script>
