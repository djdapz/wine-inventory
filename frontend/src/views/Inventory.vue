<template>
    <div id="inventory-page">
        <div id="header">
            <h1>DeeDee's Wine Inventory</h1>
        </div>
        <div id="content">
            <inventory-table/>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import InventoryTable from '@/components/InventoryTable.vue'; // @ is an alias to /src

    @Component({
        components: {
            InventoryTable,
        },
    })
    export default class Inventory extends Vue {
    }
</script>

<style>
    #content {
        display: flex;
        align-items: center;
        justify-content: center;
    }
</style>