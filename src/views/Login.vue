<template>
    <h1 class="text-center">Login</h1>
    <a-row>
        <a-col
            :xs="{ span: 24 }"
            :sm="{ span: 18, offset: 3 }"
            :lg="{ span: 12, offset: 6 }"
        >
            <a-form
                :model="formState"
                @finish="onFinish"
                @finishFailed="onFinishFailed"
                name="basic"
                layout="vertical"
                autocomplete="off"
            >
                <a-form-item
                    label="Email"
                    name="email"
                    :rules="[
                        {
                            required: true,
                            type: 'email',
                            message: 'Por favor escriba un email válido',
                        },
                    ]"
                >
                    <a-input v-model:value="formState.email"></a-input>
                </a-form-item>
                <a-form-item
                    label="Password"
                    name="password"
                    :rules="[
                        {
                            required: true,
                            min: 6,
                            message:
                                'Por favor escriba una contraseña de 6 carácteres',
                        },
                    ]"
                >
                    <a-input-password
                        v-model:value="formState.password"
                    ></a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button 
                        type="primary" 
                        html-type="submit"
                        :disabled="userStore.loadingUser"
                        :loading = "userStore.loadingUser"
                    >
                        Acceder
                    </a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>

<script setup>
import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import {message} from 'ant-design-vue'
//import "ant-design-vue/es/message/style/css";


const userStore = useUserStore();

const formState = reactive({
    password: "",
    email: "",
});

const onFinish = async (values) => {
    console.log("Success:", values);
    const error = await userStore.loginUser(formState.email, formState.password);

    if (!error){
        return message.success("Bienvenido a la super apps 🚀")
    }

    switch(error){      // si existe el error
        case 'auth/user-not-found' :
            message.error ("no existe esa cuenta")
            break
        case 'auth/wrong-password' :
            message.error('error en contraseña')
            break
        default:
            message.error('falló algo desde firebase, intentelo nuevamente')
            break
    }
};

const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
};
</script>