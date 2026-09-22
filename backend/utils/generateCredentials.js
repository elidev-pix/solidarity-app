const ALPHANUM = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

function randomString(length) {
    let result = "";
    for (let i = 0; i < length; i++) {
        result += ALPHANUM[Math.floor(Math.random() * ALPHANUM.length)];
    }
    return result;
}

/** Ex: SG8A3K9Z */
export function generateMemberId() {
    return `SG${randomString(6)}`;
}

/** Mot de passe temporaire lisible, 8 caractères */
export function generateTempPassword() {
    return randomString(8);
}