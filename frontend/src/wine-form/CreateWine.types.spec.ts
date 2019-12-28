import {isWineRequestReadyToSubmit, WineRequest} from "./CreateWine.types";

import {expect} from 'chai'

describe("Create Wine Types", () => {
    const complete : WineRequest= {
        type: "Chianti",
        producer: "Lionello",
        year: 2014,
        quantity:  12,
        country: "italy"
    };
    it('should only return is Complete when the form is complete', function () {

        expect(isWineRequestReadyToSubmit(complete)).to.be.true;
        expect(isWineRequestReadyToSubmit({})).to.be.false;
    });

    it('should not say it is complete if antyhing is missing', function () {
        expect(isWineRequestReadyToSubmit({...complete, type: undefined})).to.be.false;
        expect(isWineRequestReadyToSubmit({...complete, producer: undefined})).to.be.false;
        expect(isWineRequestReadyToSubmit({...complete, country: undefined})).to.be.false;
        expect(isWineRequestReadyToSubmit({...complete, year: undefined})).to.be.false;
        expect(isWineRequestReadyToSubmit({...complete, quantity: undefined})).to.be.false;
    });

    it('should not say it is complete if there is an empty string', function () {
        expect(isWineRequestReadyToSubmit({...complete, type: ""})).to.be.false;
        expect(isWineRequestReadyToSubmit({...complete, producer: ""})).to.be.false;
        expect(isWineRequestReadyToSubmit({...complete, country: ""})).to.be.false;
    });
});