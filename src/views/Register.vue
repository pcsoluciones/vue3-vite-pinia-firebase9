<template>
    <h1 class="text-center">Register</h1>
    <a-row>
        <a-col
            :xs="{ span: 24 }"
            :sm="{ span: 18, offset: 3 }"
            :lg="{ span: 12, offset: 6 }"
        >
            <a-form
                :model="formState"
                @finishFailed="onFinishFailed"
                @finish="onFinish"
                name="basicTwo"
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
                <a-form-item
                    label="Repita Password"
                    name="repassword"
                    :rules="{ validator: validateRePass }"
                >
                    <a-input-password
                        v-model:value="formState.repassword"
                    ></a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button 
                        type="primary" 
                        html-type="submit"
                        :loading = "userStore.loadingUser"

                    >
                        Registrar
                    </a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>

<script setup>
import { message } from "ant-design-vue";
import { reactive } from "vue";
import { useUserStore } from "../stores/user";
import "ant-design-vue/es/message/style/css";

const userStore = useUserStore();

const formState = reactive({
    password: "",
    repassword: "",
    email: "",
});

const validateRePass = async (_rule, value) => {
    if (value === "") {
        return Promise.reject("Por favor repita contraseña");
    }
    if (value !== formState.password) {
        return Promise.reject("No coinciden las contraseñas");
    }
    Promise.resolve();
};

const onFinish = async (values) => {
    console.log("Success:", values);
    const error = await userStore.registerUser(values.email, values.password);

    if (!error){
        return message.success("Revisa tu email y verificalo 🌝")
    }

    switch(error){      // si existe el error
        case 'auth/email-already-in-use' :
            message.error ("email ya registrado")
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