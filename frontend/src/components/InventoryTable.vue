<template>
    <table id="inventory-table">
        <tr>
            <th>Wine</th>
            <th>Year</th>
            <th>Country</th>
            <th>Quantity</th>
        </tr>
        <tr v-for="wineRecord in wineRecords" class="wine-record">
            <th>{{wineRecord.name}}</th>
            <th>{{wineRecord.year}}</th>
            <th>{{wineRecord.country}}</th>
            <th>{{wineRecord.quantity}}</th>
        </tr>
    </table>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from 'vue-property-decorator';
    import {WineRecord} from "../typings/WineRecord";

    @Component
    export default class InventoryTable extends Vue {
        @Prop() private msg!: string;

        get wineRecords(): WineRecord[] {
            return this.$store.state.inventory
        }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    h3 {
        margin: 40px 0 0;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
</style>
