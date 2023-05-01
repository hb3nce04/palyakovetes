import {
    passwordPattern
} from "../utils/utils";

describe('Jelszó regex tesztelése.', () => {
    describe('Érvényes jelszó', () => {
        it('Legalább 1 nagy betű, 1 kis betű, 1 speciális karakter, 1 szám illetve 8-24 karakter közé kell essen.', () => {
            const password = 'Password1#';
            const result = passwordPattern.test(password);
            expect(result).toBe(true);
        });
    });

    describe('Érvénytelen jelszó: Nincs nagy betű.', () => {
        it('A jelszónak tartalmaznia kell legalább 1 nagy betűt.', () => {
            const password = 'password1#';
            const result = passwordPattern.test(password);
            expect(result).toBe(false);
        });
    });

    describe('Érvénytelen jelszó: Nincs kis betű.', () => {
        it('A jelszónak tartalmaznia kell legalább 1 kis betűt.', () => {
            const password = 'PASSWORD1#';
            const result = passwordPattern.test(password);
            expect(result).toBe(false);
        });
    });

    describe('Érvénytelen jelszó: Nincsenek benne számok.', () => {
        it('A jelszónak tartalmaznia kell legalább 1 számot.', () => {
            const password = 'Password#';
            const result = passwordPattern.test(password);
            expect(result).toBe(false);
        });
    });

    describe('Érvénytelen jelszó: Nincs benne speciális karakter.', () => {
        it('A jelszónak tartalmaznia kell legalább 1 speciális karaktert.', () => {
            const password = 'Password1';
            const result = passwordPattern.test(password);
            expect(result).toBe(false);
        });
    });

    describe('Érvénytelen jelszó: Túl rövid.', () => {
        it('A jelszónak legalább 8 karaktert kell tartalmaznia.', () => {
            const password = 'Pass1#';
            const result = passwordPattern.test(password);
            expect(result).toBe(false);
        });
    });

    describe('Érvénytelen jelszó: Túl hosszú.', () => {
        it('A jelszó nem lehet 24 karakternél hosszabb.', () => {
            const password = 'Password123456789012345678901#';
            const result = passwordPattern.test(password);
            expect(result).toBe(false);
        });
    });
});