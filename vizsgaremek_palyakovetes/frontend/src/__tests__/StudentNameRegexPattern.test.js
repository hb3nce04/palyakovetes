import {
    studentNameRegexPattern
} from "../utils/utils";

describe("Tanuló név regex tesztelése", () => {


    it("A tanuló neve tartalmazhat kis betűket és nagy betűket egyaránt.", () => {
        const validString = "Kiss Béla";
        expect(studentNameRegexPattern.test(validString)).toBe(true);
    });

    it("A tanuló nevében nem lehetnek számok.", () => {
        const invalidString = "abc123";
        expect(studentNameRegexPattern.test(invalidString)).toBe(false);
    });

    it("Tanuló név SQL támadás elleni tesztelése.", () => {
        const invalidString = "abc'; DROP TABLE users; --";
        expect(studentNameRegexPattern.test(invalidString)).toBe(false);
    });

    it("A tanuló neve nem lehet üres String.", () => {
        const invalidString = "";
        expect(studentNameRegexPattern.test(invalidString)).toBe(false);
    });

    it("A tanuló neve nem lehet 1 karakter hosszú.", () => {
        const invalidString = "a";
        expect(studentNameRegexPattern.test(invalidString)).toBe(false);
    });

    it("A tanuló neve nem lehet 100 karakternél hosszabb.", () => {
        const invalidString = "x".repeat(101);
        expect(studentNameRegexPattern.test(invalidString)).toBe(false);
    });

});