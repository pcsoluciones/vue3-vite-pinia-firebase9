import {defineStore} from 'pinia'

export const useUserStore = defineStore('useStore', {
    state: () => ({
        userData: 'Bluuweb@test.com'
    }),

    getters: {
        minuscula(state){
            return state.userData.toLocaleLowerCase()
        }
    },

    actions: {
        registerUser(name) {
            this.userData = name
        },
    }
})

