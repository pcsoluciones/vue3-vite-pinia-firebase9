<template>
    <a-form
        name="addform"
        autocomplete="off"
        layout="vertical"
        :model="formState"
        @finish="onFinish"
    >
        <a-form-item
            name="url"
            label="Ingrese una URL"
            :rules="[{
                required: true,
                whitespace: true,
                pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                message: 'Ingrese una URL válida'
            }]"
        >
            <a-input v-model:value="formState.url"></a-input>
        </a-form-item>

            <a-form-item>
                <a-button
                    type="primary"
                    html-type="submit"
                    :loading="databaseStore.loading"
                    :disabled = "databaseStore.loading"
                >
                    Agregar URL
                </a-button>
            </a-form-item>
    </a-form>
</template>






<script setup>
import { message } from 'ant-design-vue';
import { reactive } from 'vue';
import { useDatabaseStore } from '../stores/database';

const databaseStore = useDatabaseStore()


const formState = reactive({
    url:''
})

const onFinish = async(value) => {
    console.log('todocorrecto ' + value)
    const error = await databaseStore.addUrl(formState.url)
    if (!error){
        formState.url = ''
        message.success('URL agregada 🌞')
    }

    switch(error){      // si existe el error
        // buscar lor errores que entrega firestore
        default:
            message.error('falló algo desde firebase, intentelo nuevamente')
            break
    }    
}

</script>




