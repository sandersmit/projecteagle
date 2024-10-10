import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'
import { useCollection } from 'vuefire'

// Vuetify
import 'vuetify/styles'
import vuetify from './plugins/vuetify'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

// app.use(vuetify,VueFire, {
//     // imported above but could also just be created here
//     dbRef,
//     modules: [
//       // we will see other modules later on
//       VueFireAuth(),
//     ],
//   }).mount('#app')
  app.use(vuetify).mount('#app')

