<script setup lang="ts">
import { ref } from 'vue'
import { useEagleStore } from '../stores/DataEagleStore';
const knownUser = ref(false)
const camDataStore = useEagleStore();

function fetchCamData() {
  camDataStore.fetchCams()
}
fetchCamData()
</script>




<template>
  <div class="overview" v-if="knownUser">
    <h1>show camera's</h1>
  </div>
  <div class="overview" v-else>
    <h1>need to be loged in</h1>
    <a href="" @click.prevent="fetchCamData()">get data</a>
    camDataStore.getCamData: {{ camDataStore.getCamData }}
  </div>
  
</template>

<style>
@media (min-width: 1024px) {
  .overview {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
