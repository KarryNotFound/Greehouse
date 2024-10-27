import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

const store = new Vuex.Store({
    state:{
        _temperature: null,
        _airHumidity: null,
        _intensity: null,
        _carbondioxide: null,
        _ph: null,
        _soilHumidity: null,
        _uid: null,
    },
    mutations:{
        setTemperature(state,temperature){
            state._temperature = temperature;
        },
        setAirHumidity(state,airHumidity){
            state._airHumidity = airHumidity;
        },
        setIntensity(state,intensity){
            state._intensity = intensity;
        },
        setCarbonDioxide(state,carbondioxide){
            state._carbondioxide = carbondioxide;
        },
        setPh(state,ph){
            state._ph = ph;
        },
        setSoilHumidity(state,soilHumidity){
            state._soilHumidity = soilHumidity;
        },
        setUid(state,uid){
            state._uid = uid;
        }
    },
    actions: {
        fetchData({ commit }) {
          axios.get('/environment/day/findByUid/1')
            .then(response => {
              const data = response.data;
              commit('setTemperature', data.temperature);
              commit('setAirHumidity', data.airHumidity);
              commit('setIntensity', data.intensity);
              commit('setCarbonDioxide', data.carbondioxide);
              commit('setPh', data.ph);
              commit('setSoilHumidity', data.soilHumidity);
              commit('setUid', data.uid);
            })
            .catch(error => {
              console.error('Error fetching data:', error);
            });
        },
        updateData({ state }) {
        axios.post('/environment/day/update', {
          temperature: state._temperature,
          airHumidity: state._airHumidity,
          intensity: state._intensity,
          carbondioxide: state._carbondioxide,
          ph: state._ph,
          soilHumidity: state._soilHumidity,
          uid: state._uid
        })
        .then(response => {
          console.log('Data updated successfully:', response.data);
        })
        .catch(error => {
          console.error('Error updating data:', error);
        });
      }
    }
})



export default store