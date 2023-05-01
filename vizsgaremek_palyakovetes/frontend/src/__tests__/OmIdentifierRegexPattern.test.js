import {
    omIdentifierPattern
} from "../utils/utils";

describe('OM azonosító regex tesztelése', () => {
    describe('Érvényes OM azonosító.', () => {
        it('Az OM azonosítónak meg kell egyeznie 11 számmal.', () => {
            const omIdentifier = '12345678901';
            const result = omIdentifierPattern.test(omIdentifier);
            expect(result).toBe(true);
        });
    });

    describe('Érvénytelen OM azonosító: Túl rövid.', () => {
        it('Az OM azonosító nem lehet 11 számjegynél kevesebb.', () => {
            const omIdentifier = '1234567890';
            const result = omIdentifierPattern.test(omIdentifier);
            expect(result).toBe(false);
        });
    });

    describe('Érvénytelen OM azonosító: Túl hosszú.', () => {
        it('Az OM azonosító nem lehet 11 számjegynél több.', () => {
            const omIdentifier = '123456789012';
            const result = omIdentifierPattern.test(omIdentifier);
            expect(result).toBe(false);
        });
    });

    describe('Érvénytelen OM azonosító: Csak számokból állhat.', () => {
        it('Az OM azonosító csak számokból állhat.', () => {
            const omIdentifier = '1234abcde01';
            const result = omIdentifierPattern.test(omIdentifier);
            expect(result).toBe(false);
        });
    });
});