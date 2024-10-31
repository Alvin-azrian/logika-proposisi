
let display = '';
let variableValues = {
    P: false,
    Q: false
};

const displayElement = document.getElementById('display');
const resultElement = document.getElementById('result');
const placeholderDisplay = document.getElementById('placeholderDisplay'); // UBAH: Mendapatkan elemen placeholder

function toggleVariable(variable) {
    variableValues[variable] = !variableValues[variable];
    const button = document.getElementById(`toggle${variable}`);
    button.textContent = variableValues[variable] ? 'TRUE' : 'FALSE';
    button.className = `toggle-btn toggle-${variableValues[variable] ? 'true' : 'false'}`;

    if (display && resultElement.textContent) {
        const evaluationResult = evaluateLogic(display);
        resultElement.textContent = evaluationResult;
    }
}

function evaluateLogic(expr) {
    try {
        // Mengganti simbol logika dengan operator JavaScript
        let jsExpr = expr
            .replace(/∧/g, '&&')
            .replace(/∨/g, '||')
            .replace(/¬/g, '!')
            .replace(/→/g, '<=') // Mengganti simbol implikasi dengan operator JS
            .replace(/P/g, variableValues.P.toString())
            .replace(/Q/g, variableValues.Q.toString());

        const result = eval(jsExpr);
        return result ? 'TRUE' : 'FALSE';
    } catch (error) {
        return 'Error';
    }
}

function handleClick(value) {
    if (value === 'C') {
        display = '';
        displayElement.textContent = '';
        resultElement.textContent = '';
        placeholderDisplay.style.display = 'block'; // Tampilkan placeholder saat direset
    } else if (value === '=') {
        const evaluationResult = evaluateLogic(display);
        resultElement.textContent = evaluationResult;
        if (display.trim() === '' || !isValidExpression(display)) {
            resultElement.textContent = 'Error'; // Tampilkan "Error" jika tidak valid
        } else {
            const evaluationResult = evaluateLogic(display);
            resultElement.textContent = evaluationResult;
        }
    } else if (value === 'del') {
        display = display.slice(0, -1); // Hapus karakter terakhir
        displayElement.textContent = display;
        if (display.length === 0) {
            placeholderDisplay.style.display = 'block'; // Tampilkan placeholder jika tampilan kosong
        }
    } else {
        display += value; // Tambahkan karakter baru ke tampilan
        displayElement.textContent = display;
        placeholderDisplay.style.display = 'none'; // Sembunyikan placeholder saat ada teks
    }
}
