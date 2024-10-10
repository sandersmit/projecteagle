<script setup lang="ts">
// import TheWelcome from '../components/TheWelcome.vue'
import { ref } from 'vue'

import { useField, useForm } from 'vee-validate'

import { ref as databaseRef,getDatabase, push, set, update, child, onValue } from "firebase/database";

import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs } from 'firebase/firestore'

//vuefire
import { useCollection, useDatabaseList } from 'vuefire'

//const firebaseApp = initializeApp({ projectId: 'projeteagle' })
const firebaseConfig = {
    // your application settings
    apiKey: "AIzaSyC_uOiSsA5hNpw26G5sClRATuIue5jM_eE",
    authDomain: "projeteagle.firebaseapp.com",
    databaseURL: "https://projeteagle-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "projeteagle",
    storageBucket: "projeteagle.appspot.com",
    messagingSenderId: "127615114263",
    appId: "1:127615114263:web:ac60ed097803ee46795052"
  }
const firebaseApp = initializeApp(firebaseConfig);


const firestoreDb = getFirestore(firebaseApp);
const firesbaseRTdb = getDatabase(firebaseApp);

const userCollection = collection(firestoreDb, 'users')
const userCollectionRef = databaseRef(firesbaseRTdb, 'users/' )

const usersFirestoreDb = useCollection(userCollection)
const usersRTdb = ref()

const { handleSubmit, handleReset } = useForm({
  validationSchema: {
    name(value) {
      if (value?.length >= 2) return true

      return 'Name needs to be at least 2 characters.'
    },
    pass(value) {
      if (/^[0-9-]{7,}$/.test(value)) return true

      return 'Pass needs to be at least 7 digits.'
    },
    email(value) {
      if (/^[a-z.-]+@[a-z.-]+\.[a-z]+$/i.test(value)) return true

      return 'Must be a valid e-mail.'
    },
    select(value) {
      if (value) return true

      return 'Select an item.'
    },
    checkbox(value) {
      if (value === '1') return true

      return 'Must be checked.'
    },
  },
})
const name = useField('name')
const pass = useField('pass')
const email = useField('email')
const select = useField('select')
const checkbox = useField('checkbox')

const items = ref([
  'Item 1',
  'Item 2',
  'Item 3',
  'Item 4',
])

const loginToggle = ref(true)

const submit = handleSubmit(values => {
  alert(JSON.stringify(values, null, 2))
})

onValue(userCollectionRef, (snapshot) => {
  usersRTdb.value = snapshot.val();
});

function userLogin(){
  onValue(userCollectionRef, (snapshot) => {
  snapshot.forEach((childSnapshot) => {
    const childKey = childSnapshot.key;
    const childData = childSnapshot.val();
    console.log( childData)
      childData.pass === pass.value.value? console.log("acces!"):console.log("acces denied")
    // ...
  });
});
}

function toggleLoginForm() {
  loginToggle.value = !loginToggle.value
}

function writeNewPostCheck(){
  !name.errorMessage.value&&!pass.errorMessage.value&&!email.errorMessage.value?writeNewPost(name.value.value, pass.value.value, email.value.value):null
  
}

function writeNewPost(username, userpass, useremail) {
  // const db = getDatabase();

  // A post entry.
  const postData = {
    name: username,
    pass: userpass,
    email: useremail,
  };

  // Get a key for a new User.
  const newPostKey = push(child(databaseRef(firesbaseRTdb), 'users')).key;

  // Write the new post's data simultaneously in the posts list and the user's post list.
  const updates = {};
  updates['/users/' + newPostKey] = postData;

  return update(databaseRef(firesbaseRTdb), updates);
}

</script>
<style>
@media (min-width: 1024px) {
  .login {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
<template>
  <ul>
    usersFirestoreDb: {{ usersFirestoreDb }}
    <br>
    usersRealtimeDb: {{ usersRTdb }}
    <!-- <li v-for="user in users" :key="user.id"> 
      <span>{{ user.email }}</span>
    </li> -->
  </ul>
  <!-- <p v-if="user">Hello {{ user.providerData.displayName }}</p> -->
    <section id="grid" class="login">
      <v-container>

        <v-row justify="space-around">

          <v-col cols="12" sm="12">
            <!-- <TheWelcome /> -->
            <form @submit.prevent="submit" v-if="loginToggle">
              <h1 class="my-5">Create new login{{name.value.value}}</h1>
              <v-text-field v-model="name.value.value" :counter="10" :error-messages="name.errorMessage.value"
                label="Name"></v-text-field>

              <v-text-field v-model="pass.value.value" :counter="7" :error-messages="pass.errorMessage.value"
                label="Password"></v-text-field>
       
              <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value"
                label="E-mail"></v-text-field>
              <v-row justify="space-around">
                <v-col cols="12" class="d-flex">
                  <v-btn class="me-4" type="submit" @click="writeNewPostCheck()">
                    submit
                  </v-btn>
                  <v-btn @click="handleReset">
                    clear
                  </v-btn>
                  <a href="" @click.prevent="toggleLoginForm()" class="text-blue-darken-1 ml-auto">
                    {{ loginToggle ? 'Login' : 'Create new login' }}
                  </a>
                </v-col>
              </v-row>
            </form>
            <form @submit.prevent="submit" v-else>
              <h1 class="my-5">Login</h1>
              <v-text-field v-model="pass.value.value" :counter="7" :error-messages="pass.errorMessage.value"
                label="password"></v-text-field>

              <v-text-field v-model="email.value.value" :error-messages="email.errorMessage.value"
                label="E-mail"></v-text-field>
              <v-row justify="space-around">
                <v-col cols="12" class="d-flex">
                  <v-btn class="me-4" type="submit"  @click.prevent="userLogin()" >
                    submit
                  </v-btn>

                  <v-btn @click="handleReset">
                    clear
                  </v-btn>
                  <a href="" @click.prevent="toggleLoginForm()" class="text-blue-darken-1 ml-auto">
                    {{ !loginToggle ? 'Create new login' : 'Login' }}
                  </a>
                </v-col>
              </v-row>
            </form>
          </v-col>
        </v-row>
      </v-container>
    </section>
</template>
