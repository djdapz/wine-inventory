import {allCountriesFetched, top5CountriesFetched} from "./Country.actions";
import {fetchCountriesReducer} from "./Country.reducer";

describe("Country Reducer", () => {
    const empty = {top5: [], all: []};

    let countries = [
        {code: "US", name: "United States"},
        {code: "FR", name: "France"},
    ];

    it("should add top  5 to the top 5 block", () => {
        const actual = fetchCountriesReducer(empty, top5CountriesFetched(countries));
        expect(actual.all).to.eql([]);
        expect(actual.top5).to.eql(countries)
    });

    it("should add list of all to the all block", () => {
        const actual = fetchCountriesReducer(empty, allCountriesFetched(countries));
        expect(actual.top5).to.eql([]);
        expect(actual.all).to.eql(countries)
    })
});