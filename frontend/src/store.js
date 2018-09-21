import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
export function store() {
    return new Vuex.Store({
        state: {
            inventory: [
                {
                    year: 1985,
                    country: "France",
                    quantity: 15,
                    name: "Fancy French Wine",
                },
                {
                    year: 1999,
                    country: "Italy",
                    quantity: 12,
                    name: "Monsanto",
                }
            ]
        },
        mutations: {},
        actions: {},
    });
}
//# sourceMappingURL=store.js.map