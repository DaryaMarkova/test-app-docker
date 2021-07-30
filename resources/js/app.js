import Vue from "vue";
import Vuex from "vuex";
import { Store } from "./store";
import App from "./views/app.vue";
Vue.use(Vuex);

const app = new Vue({
    el: "#app",
    store: new Vuex.Store(Store),
    components: { App }
});
