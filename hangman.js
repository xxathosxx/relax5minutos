const categories = {
    coches: ['ferrari', 'lamborghini', 'porsche', 'mercedes', 'bmw', 'audi', 'tesla', 'toyota', 'honda', 'ford', 'chevrolet', 'nissan', 'volkswagen', 'bugatti', 'mclaren', 'jaguar', 'mazda', 'subaru', 'kia', 'hyundai', 'peugeot', 'renault', 'citroen', 'fiat', 'alfa romeo', 'maserati', 'bentley', 'rolls-royce', 'aston martin', 'pagani', 'koenigsegg', 'lotus', 'mini', 'volvo', 'saab', 'skoda', 'seat', 'dacia', 'lancia', 'opel', 'vauxhall', 'suzuki', 'mitsubishi', 'isuzu', 'infiniti', 'lexus', 'acura', 'cadillac', 'lincoln', 'chrysler'],
    animales: ['perro', 'gato', 'elefante', 'jirafa', 'leon', 'tigre', 'oso', 'zorro', 'lobo', 'conejo', 'caballo', 'vaca', 'oveja', 'cerdo', 'gallina', 'pato', 'pavo', 'ganso', 'cisne', 'aguila', 'halcon', 'buho', 'cuervo', 'paloma', 'loro', 'canario', 'pez', 'tiburon', 'ballena', 'delfin', 'pulpo', 'calamar', 'cangrejo', 'langosta', 'camaron', 'medusa', 'estrella de mar', 'caballito de mar', 'tortuga', 'cocodrilo', 'serpiente', 'lagarto', 'camaleon', 'iguana', 'rana', 'sapo', 'murcielago', 'raton', 'rata', 'ardilla'],
    paises: ['colombia', 'argentina', 'brasil', 'chile', 'peru', 'ecuador', 'venezuela', 'bolivia', 'paraguay', 'uruguay', 'mexico', 'guatemala', 'honduras', 'el salvador', 'nicaragua', 'costa rica', 'panama', 'cuba', 'republica dominicana', 'puerto rico', 'espana', 'portugal', 'francia', 'italia', 'alemania', 'inglaterra', 'irlanda', 'escocia', 'gales', 'belgica', 'holanda', 'suiza', 'austria', 'suecia', 'noruega', 'dinamarca', 'finlandia', 'rusia', 'china', 'japon', 'corea del sur', 'corea del norte', 'india', 'pakistan', 'afganistan', 'iran', 'irak', 'arabia saudita', 'israel', 'egipto'],
    frutas: ['manzana', 'pera', 'platano', 'naranja', 'limon', 'mandarina', 'uva', 'fresa', 'cereza', 'mora', 'frambuesa', 'arandano', 'kiwi', 'mango', 'papaya', 'piña', 'sandia', 'melon', 'durazno', 'albaricoque', 'ciruela', 'higo', 'granada', 'guayaba', 'maracuya', 'lichi', 'carambola', 'tamarindo', 'coco', 'aguacate', 'chirimoya', 'guanabana', 'zapote', 'mamey', 'noni', 'rambutan', 'mangostan', 'pitahaya', 'kiwano', 'pepino', 'tomate', 'calabaza', 'berenjena', 'pimiento', 'chile', 'jalapeno', 'habichuela', 'esparrago', 'alcachofa'],
    colores: ['rojo', 'azul', 'verde', 'amarillo', 'naranja', 'morado', 'rosa', 'negro', 'blanco', 'gris', 'marron', 'beige', 'turquesa', 'violeta', 'lila', 'fucsia', 'ocre', 'dorado', 'plateado', 'cian', 'magenta', 'esmeralda', 'zafiro', 'ambar', 'rubi', 'topacio', 'jade', 'perla', 'coral', 'lavanda', 'malva', 'anil', 'celeste', 'carmesi', 'bermellon', 'caqui', 'chocolate', 'canela', 'caramelo', 'miel', 'mostaza', 'oliva', 'pistacho', 'salmon', 'terracota', 'vino', 'champan', 'marfil', 'plata', 'oro']
};

let selectedWord = '';
let attemptsLeft = 6;
let guessedLetters = [];
let displayWord = '';

function startGame(category) {
    selectedWord = categories[category][Math.floor(Math.random() * categories[category].length)];
    attemptsLeft = 6;
    guessedLetters = [];
    displayWord = '_ '.repeat(selectedWord.length);

    document.getElementById('categoryMenu').style.display = 'none';
    document.getElementById('hangmanGame').style.display = 'block';
    document.getElementById('wordDisplay').innerText = displayWord;
    document.getElementById('attemptsLeft').innerText = attemptsLeft;
    document.getElementById('message').innerText = '';

    drawHangman();
}

function guessLetter() {
    const letterInput = document.getElementById('letterInput');
    const letter = letterInput.value.toLowerCase();
    letterInput.value = '';

    if (letter && !guessedLetters.includes(letter)) {
        guessedLetters.push(letter);

        if (selectedWord.includes(letter)) {
            let newDisplayWord = '';
            for (let i = 0; i < selectedWord.length; i++) {
                if (guessedLetters.includes(selectedWord[i])) {
                    newDisplayWord += selectedWord[i] + ' ';
                } else {
                    newDisplayWord += '_ ';
                }
            }
            displayWord = newDisplayWord;
            document.getElementById('wordDisplay').innerText = displayWord.trim();
        } else {
            attemptsLeft--;
            document.getElementById('attemptsLeft').innerText = attemptsLeft;
            drawHangman();
        }

        if (attemptsLeft === 0) {
            document.getElementById('message').innerText = '¡Perdiste! La palabra era: ' + selectedWord;
        } else if (!displayWord.includes('_')) {
            document.getElementById('message').innerText = '¡Ganaste! La palabra es: ' + selectedWord;
        }
    }
}

function drawHangman() {
    const canvas = document.getElementById('hangmanCanvas');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Base
    if (attemptsLeft < 6) {
        ctx.beginPath();
        ctx.moveTo(10, 190);
        ctx.lineTo(190, 190);
        ctx.stroke();
    }

    // Poste
    if (attemptsLeft < 5) {
        ctx.beginPath();
        ctx.moveTo(50, 190);
        ctx.lineTo(50, 10);
        ctx.lineTo(150, 10);
        ctx.lineTo(150, 30);
        ctx.stroke();
    }

    // Cabeza
    if (attemptsLeft < 4) {
        ctx.beginPath();
        ctx.arc(150, 50, 20, 0, Math.PI * 2, true);
        ctx.stroke();
    }

    // Cuerpo
    if (attemptsLeft < 3) {
        ctx.beginPath();
        ctx.moveTo(150, 70);
        ctx.lineTo(150, 130);
        ctx.stroke();
    }

    // Brazo izquierdo
    if (attemptsLeft < 2) {
        ctx.beginPath();
        ctx.moveTo(150, 90);
        ctx.lineTo(130, 110);
        ctx.stroke();
    }

    // Brazo derecho
    if (attemptsLeft < 1) {
        ctx.beginPath();
        ctx.moveTo(150, 90);
        ctx.lineTo(170, 110);
        ctx.stroke();
    }

    // Pierna izquierda
    if (attemptsLeft < 0) {
        ctx.beginPath();
        ctx.moveTo(150, 130);
        ctx.lineTo(130, 150);
        ctx.stroke();
    }

    // Pierna derecha
    if (attemptsLeft < -1) {
        ctx.beginPath();
        ctx.moveTo(150, 130);
        ctx.lineTo(170, 150);
        ctx.stroke();
    }
}
