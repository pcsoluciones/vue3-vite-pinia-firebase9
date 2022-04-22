import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from 'firebase/firestore/lite'
import {defineStore} from 'pinia'
import { auth, db } from '../firebaseConfig'
import { nanoid } from 'nanoid'
import router from "../router"

export const useDatabaseStore = defineStore('database', {
    state: () => ({
        documents: [],
        loadingDoc: false,
        loading: false
    }),

    actions: {
        async getUrls() {
            //if (this.documents,length !== 0){
            //    return
            //}
            this.documents = []
            this.loadingDoc = true
            try {
                const q = query(
                    collection(db, "urls")
                        , where("user", "==", auth.currentUser.uid)
                )
                const querySnapshot = await getDocs(q)
                console.log("ID y DATA")
                querySnapshot.forEach(doc => {
                    console.log(doc.id, doc.data())
                    this.documents.push({
                        id: doc.id,
                        ...doc.data(),      // destructuracion del objeto data
                    })
                })
            } catch (error) {
                console.log(error)

            } finally {
                this.loadingDoc = false
            }
        },

        async addUrl(nameUrl) {
            this.loading = true
            try {
              const objetoDoc = {
                  name : nameUrl,
                  short: nanoid(6),
                  user: auth.currentUser.uid
              } 

              const docRef = await addDoc(collection(db,"urls"), objetoDoc)
              console.log(docRef.id)

              this.documents.push({
                  ...objetoDoc,     // le paso las propiedades destructuradas
                  id: docRef.id     // es el id de Agregar documento
              })
            } 
            catch (error) {
                console.log(error.code)
                return error.code
            } finally {
                this.loading = false
            }
        },

        async leerUrl(id) {
            console.log(id)
            try {
                const docRef = doc(db, "urls", id)  //referencia del documento de firestore
                const docSnap = await getDoc(docRef)

                if (!docSnap.exists()){
                    throw new Error("no existe el doc")
                }

                if (docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("no le pertenese este documento")
                }
                //console.log(docSnap.data().name)
                return docSnap.data().name

            } catch (error) {
                console.log(error.message)
            } finally {

            }
        },


        async updateUrl(id, nameUrl) {
            this.loading = true

            try {
                const docRef = doc(db, "urls", id)  //referencia del documento de firestore

                const docSnap = await getDoc(docRef)
                if (!docSnap.exists()){
                    throw new Error("no existe el doc")
                }

                if (docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("no le pertenese este documento")
                }

                await updateDoc(docRef, {
                    name: nameUrl
                })
                // modificamos el almacen, map siempre se le deven devolver todos sus elementos a diferencia del filter
                this.documents = this.documents.map(item => item.id === id ? ({...item, name:nameUrl}) : item)
                router.push('/')

            } catch (error) {
                console.log(error.message)
                return error.message
            }   finally {
                this.loading = false
            }
        },

        async deleteUrl(id){
            this.loading = true
            try {
                const docRef = doc(db, "urls", id)  //referencia del documento de firestore

                const docSnap = await getDoc(docRef)
                if (!docSnap.exists()){
                    throw new Error("no existe el doc")
                }

                if (docSnap.data().user !== auth.currentUser.uid){
                    throw new Error("no le pertenese este documento")
                }

                await deleteDoc(docRef)             // borramos de firestore
                this.documents = this.documents.filter(
                    item => item.id != id)                  // eliminamos ese registro del vuex
            } catch (error) {
                //console.log(error.code)
                return error.message
            }   finally {
                    this.loading = false
            }
        }
    }

})