import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useEagleStore = defineStore('EagleDataStore', {
  state: function () {
    return {
      //Static data
      reactiveCams: [
        "cam1",
        "cam2",
        "cam3",
        "cam4",
        "cam5",
      ],
      reactiveCamsData: [
      ],
  
    }
  },
  //Getters are synchronous functions used to retrieve data from the state
  getters: {
    getCamData:function(state) {   
    return state.reactiveCamsData
     }
  },
  actions: {
   
    // async fetchPostcode(param1, param2) {
    //   console.log('fetchPostcode',param1,param2)
    //   const params = {
    //     apikey: import.meta.env.VITE_endpoint8apikey,
    //     zipcode: param1,
    //     number: param2,
    //   };
    //   const url = `${import.meta.env.VITE_endpoint8}postcode=${params.zipcode}&number=${params.number}`;
    //   const options = {
    //     method: "GET",
    //     headers: {
    //       'Authorization': "Bearer 1e9fe927-24ff-4afb-a7ff-e77d584506a7"
    //     }

    //   };
    //   return (this.reactiveZipData = await fetch(url, options)
    //     .then(function (response) {
    //       if (response.status === 200) {
    //         console.log("response.ok:", response.ok);
    //         console.log("response", response);
    //       }
    //       return response.json();
    //     })
    //     .catch((error) => {
    //       //request failed
    //       console.log("error", error);
    //     }));
    // },
    async fetchCams() {
      console.log('fetch:')
      const options = {
        method: 'GET',
        api_key :  'dev_test',
        headers: {
           accept: 'application/json',
           'Authorization': "Basic 3H1Bf6mCctIgpCuzvrnyekf3VhAUEnKJ"
        }
      };
      this.reactiveCamsData.length = 0;
      //fetching fetchFoodCategorie
      return (this.reactiveCamsData = await fetch(`https://rest.cameramanager.com/rest/v2.2/cameras/1841837/deviceInfo?${options.api_key}`, options)
        .then(function (response) {
          return response.json();
        })
        .catch((error) => {
          //request failed
          console.log("error", error);
        }));
    }
  }
  
})
