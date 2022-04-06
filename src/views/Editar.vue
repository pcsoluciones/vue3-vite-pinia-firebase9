<template>
    <div>
        <h1>Editar id: route.params</h1>

        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingrese URL" v-model = "url">
            <button type="submit">Cambiar</button>
        </form>        
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {useRoute} from 'vue-router'
import { useDatabaseStore } from '../stores/database'

const databaseStore = useDatabaseStore()
const route = useRoute()
//console.log(route.params.id)

const handleSubmit = () => {
    // hacer validaciones del input
    databaseStore.updateUrl(route.params.id, url.value)
}

const url = ref('')

onMounted(async () => {
    //console.log(route.params.id)
    url.value = await databaseStore.leerUrl(route.params.id)
})

</script>

