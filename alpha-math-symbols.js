// Source: https://en.wikipedia.org/wiki/Mathematical_Alphanumeric_Symbols#Latin_letters

const LOWERCASE_DOUBLESTRUCK_OFFSET = 0x1D552;
const LOWERCASE_SCRIPT_OFFSET = 0x1D4B6;
const LOWERCASE_SERIF_OFFSET = 0x1D482;

const UPPERCASE_DOUBLESTRUCK_OFFSET = 0x1D538;
const UPPERCASE_SCRIPT_OFFSET = 0x1D49C;
const UPPERCASE_SERIF_OFFSET = 0x1D468;

function getDoubleStruckSymbol(letter) {
    return isUpperCase(letter) ? getUppercaseDoubleStruckSymbol() : getLowercaseDoubleStruckSymbol();

    function getUppercaseDoubleStruckSymbol() {
        const exceptions = {
            C: 0x2102,
            H: 0x210D,
            N: 0x2115,
            P: 0x2119,
            Q: 0x211A,
            R: 0x211D,
            Z: 0x2124,
        }
        return getSymbol(letter, UPPERCASE_DOUBLESTRUCK_OFFSET, exceptions)
    }

    function getLowercaseDoubleStruckSymbol() {
        return getSymbol(letter, LOWERCASE_DOUBLESTRUCK_OFFSET)
    }
}

function getScriptSymbol(letter) {
    return isUpperCase(letter) ? getUppercaseScriptSymbol() : getLowercaseScriptSymbol();

    function getUppercaseScriptSymbol() {
        const exceptions = {
            B: 0x212C,
            E: 0x2130,
            F: 0x2131,
            H: 0x210B,
            I: 0x2110,
            L: 0x2112,
            M: 0x2133,
            R: 0x211B,
        }
        return getSymbol(letter, UPPERCASE_SCRIPT_OFFSET, exceptions)
    }

    function getLowercaseScriptSymbol() {
        const exceptions = {
            e: 0x212F,
            g: 0x210A,
            o: 0x2134
        };     
        return getSymbol(letter, LOWERCASE_SCRIPT_OFFSET, exceptions)
    }
}

function getSerifSymbol(letter) {
    return isUpperCase(letter) ? getUppercaseSerifSymbol() : getLowercaseSerifSymbol();

    function getUppercaseSerifSymbol() {
        return getSymbol(letter, UPPERCASE_SERIF_OFFSET)
    }

    function getLowercaseSerifSymbol() {
        return getSymbol(letter, LOWERCASE_SERIF_OFFSET)
    }
}

function isUpperCase(letter) {
    return letter.toUpperCase() === letter;
}

function getSymbol(letter, baseOffset, exceptions = {}) {
    if (exceptions[letter]) { return String.fromCodePoint(exceptions[letter]); }

    const letterCode = baseOffset + getLetterOffset(letter);
    return String.fromCodePoint(letterCode);
}

function getLetterOffset(letter) {
    referenceCharCode = isUpperCase(letter) ? "A".charCodeAt(0) : "a".charCodeAt(0);
    const charCode = letter.charCodeAt(0);
    return charCode - referenceCharCode; 
}