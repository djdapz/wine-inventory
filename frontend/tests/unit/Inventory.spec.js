import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import Inventory from '@/views/Inventory.vue';
import InventoryTable from '@/components/InventoryTable.vue';
describe('Inventory.vue', () => {
    it('renders a inventory table', () => {
        const wrapper = shallowMount(Inventory);
        expect(wrapper.findAll(InventoryTable).length).to.eq(1);
    });
    it('renders a header', () => {
        const wrapper = shallowMount(Inventory);
        expect(wrapper.find('h1').text()).to.eq('DeeDee\'s Wine Inventory');
    });
});
//# sourceMappingURL=Inventory.spec.js.map