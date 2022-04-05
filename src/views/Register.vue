<template>
    <div>
        <h1>Register</h1>

        <form @submit.prevent="handleSubmit">
            <input type="email" placeholder="Ingrese email" v-model.trim="email">
            <input type="password" placeholder="Ingrese contraseña" v-model="password">
            <button type="submit" :disabled="userStore.loadingUser" >Crear usuario</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useUserStore } from '../stores/user';
//import router from '../router';
//import {useRouter} from 'vue-router'

    //const router = useRouter()
    const userStore = useUserStore()
    const email = ref('')
    const password = ref('')

    const handleSubmit = async () => {
        console.log(email.value)
        //console.log(password.value.length)
        if (!email.value || password.value.length < 6){
            return alert('llena los campos')        // return hace que no siga procesando el código
        }

        console.log('procesando formulario...')
        await userStore.registerUser(email.value, password.value)
        //router.push('/')

    }

</script>

