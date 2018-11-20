import {validateNumericInputFor} from "./FormComponents";

describe("Input Scrubbing", () => {
    let mockedValue: any = undefined;

    const mockInput = (val: any) => mockedValue = val;

    beforeEach(function () {
        mockedValue = "default"
    });

    it("should call the callback with undefined when empty input is passed", () => {
        validateNumericInputFor(mockInput)({target: {value: ""}});
        expect(mockedValue).to.eql(undefined)
    });

    it('should call the callback with a numeric string when valid ', function () {
        validateNumericInputFor(mockInput)({target: {value: "123"}});
        expect(mockedValue).to.eql(123)
    });

    it('should not call the callback when the input is not a number', function () {
        validateNumericInputFor(mockInput)({target: {value: "123b"}});
        expect(mockedValue).to.eql("default")
    });
});