import Vue from 'vue';
import Vuex, {Store} from 'vuex';
import {WineRecord} from "@/typings/WineRecord";

Vue.use(Vuex);

interface WineInventoryStore {
    inventory: WineRecord[]
}

export function store(): Store<WineInventoryStore> {
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
                }]
        },
        mutations: {},
        actions: {},
    });
}
