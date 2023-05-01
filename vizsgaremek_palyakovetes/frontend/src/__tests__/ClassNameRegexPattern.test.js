import {
    classNameRegexPattern
} from "../utils/utils";

describe("Osztály név regex tesztelése.", () => {


    it("Osztály név tesztelés kis betűkkel", () => {
        const validString = "abcxyz";
        expect(classNameRegexPattern.test(validString)).toBe(true);
    });

    it("Osztály név tesztelés kis betűkkel, illetve számokkal", () => {
        const invalidString = "abc123";
        expect(classNameRegexPattern.test(invalidString)).toBe(true);
    });

    it("Osztály név tesztelés SQL támadással", () => {
        const invalidString = "abc'; DROP TABLE users; --";
        expect(classNameRegexPattern.test(invalidString)).toBe(false);
    });

    it("Osztály név hossza nem lehet kevesebb mint 2 karakter", () => {
        const validString = "1A";
        expect(classNameRegexPattern.test(validString)).toBe(true);
    });

    it("Osztály név hossza nem lehet több mint 50 karakter", () => {
        const invalidString = "a".repeat(51);
        expect(classNameRegexPattern.test(invalidString)).toBe(false);
    });

});