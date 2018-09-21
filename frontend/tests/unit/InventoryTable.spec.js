import { expect } from 'chai';
import { shallowMount } from '@vue/test-utils';
import InventoryTable from '@/components/InventoryTable.vue';
import { store } from "@/store";
describe('InventoryTable.vue', () => {
    let wrapper;
    const mockStore = store();
    beforeEach(function () {
        wrapper = shallowMount(InventoryTable, { store: mockStore });
    });
    it('renders props.msg when passed', () => {
        expect(wrapper.findAll('th').at(0).text()).to.eq('Wine');
        expect(wrapper.findAll('th').at(1).text()).to.eq('Year');
        expect(wrapper.findAll('th').at(2).text()).to.eq('Country');
        expect(wrapper.findAll('th').at(3).text()).to.eq('Quantity');
    });
    it('renders a row for each wine in the db', () => {
        expect(wrapper.findAll(".wine-record").length).to.eq(2);
    });
    describe("wine row", () => {
        const tableElements = wrapper.findAll(".wine-record").at(0).findAll("td");
        expect(tableElements.at(0)).to.eq("Fancy French Wine");
        expect(tableElements.at(1)).to.eq(1985);
        expect(tableElements.at(2)).to.eq("France");
        expect(tableElements.at(3)).to.eq(15);
    });
});
//# sourceMappingURL=InventoryTable.spec.js.map