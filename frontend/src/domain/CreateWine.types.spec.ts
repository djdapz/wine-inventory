import {CreateWineRequest} from "./CreateWine.types";

import {expect} from 'chai'

describe("Create Wine Types", () => {

    const subject = new CreateWineRequest();

    const subjectWithYear = subject.withYear(2012);
    const subjectWithProducer = subject.withProducer("Cantine Faliese");
    const subjectWithType = subject.withType("Barolo");
    const subjectWithQuantity = subject.withQuantity(12);
    const subjectWithCounty = subject.withCountry("Italy");

    it('should not have modified original state', function () {
        expect(subject).to.eql(new CreateWineRequest(undefined, undefined, undefined, undefined, undefined))
    });

    it('should have returned a new instance with a year', function () {
        expect(subjectWithYear.year).to.eql(2012)
    });

    it('should have returned a new instance with a producer', function () {
        expect(subjectWithProducer.producer).to.eql("Cantine Faliese")
    });

    it('should have returned a new instance with a quantity', function () {
        expect(subjectWithQuantity.quantity).to.eql(12)
    });

    it('should have returned a new instance with a country', function () {
        expect(subjectWithCounty.country).to.eql("Italy")
    });

    it('should have returned a new instance with a type', function () {
        expect(subjectWithType.type).to.eql("Barolo")
    });

    it('should only return is Complete when the form is complete', function () {
        expect(new CreateWineRequest("Chianti", "Lionello", 2014, 12, "italy").isComplete()).to.be.true;
        expect(new CreateWineRequest().isComplete()).to.be.false;
    });

    it('should not say it is complete if antyhing is missing', function () {
        expect(new CreateWineRequest(undefined, "Lionello", 2014, 12, "italy").isComplete()).to.be.false;
        expect(new CreateWineRequest("Chianti", undefined, 2014, 12, "italy").isComplete()).to.be.false;
        expect(new CreateWineRequest("Chianti", "Lionello", undefined, 12, "italy").isComplete()).to.be.false;
        expect(new CreateWineRequest("Chianti", "Lionello", 2014, undefined, "italy").isComplete()).to.be.false;
        expect(new CreateWineRequest("Chianti", "Lionello", 2014, 12, undefined).isComplete()).to.be.false;
    });

    it('should not say it is complete if there is an empty string', function () {
        expect(new CreateWineRequest("", "Lionello", 2014, 12, "italy").isComplete()).to.be.false;
        expect(new CreateWineRequest("Chianti", "", 2014, 12, "italy").isComplete()).to.be.false;
        expect(new CreateWineRequest("Chianti", "Lionello", 2014, 12, "").isComplete()).to.be.false;
    });
});