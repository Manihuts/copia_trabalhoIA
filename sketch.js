let perceptron;
let points = new Array(100);
let training = true; // Condicional de parada
let trainingComplete = false; // Condicional de parada
let accuracy = 0.98; // Precisão necessária para parar de treinar

function setup(){
    createCanvas(550,550);
    perceptron = new Perceptron(3);

    for (let i = 0; i < points.length; i++) {
        points[i] = new Point(random(-1,1), random(-1,1));
    }
}

function draw(){
    background(180);
    points.forEach(point => {
        point.show();
    });

    noStroke();

    points.forEach(pt => {
        const inputs = [pt.x, pt.y, pt.bias];
        const target = pt.label;
        const guess = perceptron.guess(inputs);

        if (guess == target){
            fill(0,255,0); // Verde, acerto
        } else {
            fill(255,0,0); // Vermelho, erro
        }
        ellipse(pt.getPixelX(), pt.getPixelY(), 15, 15);
    });

    drawLine();
    if (training && !trainingComplete){ // Treino em execução
        trainSinglePoint(); 
    } else if (!training && !trainingComplete) { // Treino parado
        const novosPontos = new Array(100);
        for (let j = 0; j < novosPontos.length; j++) {
            novosPontos[j] = new Point(random(-1,1), random(-1,1));
        }

        let acertos= 0;
        novosPontos.forEach(pt => {
            const inputs = [pt.x, pt.y, pt.bias];
            const target = pt.label;
            const guess = perceptron.guess(inputs);
            if (guess == target){
                acertos++;
            }
        })

        const newAccuracy = acertos / novosPontos.length;
        console.log("Nível de precisão: " + newAccuracy);
        trainingComplete = true;
    }
}

function drawLine() {
    // Desenha linha reta
    // stroke(0,0,255);
    // let p1 = new Point(-1, f(-1));
    // let p2 = new Point(1, f(1));
    // line(p1.getPixelX(), p1.getPixelY(), p2.getPixelX(), p2.getPixelY());

    // stroke(255,0,0);
    // let guessP1 = new Point(-1, perceptron.guessY(-1));
    // let guessP2 = new Point(1, perceptron.guessY(1));
    // line(guessP1.getPixelX(), guessP1.getPixelY(), guessP2.getPixelX(), guessP2.getPixelY());

    // Desenha parábola
    noFill();
    stroke(0,0,255);
    beginShape();
    for (let x = -1; x <= 1; x += 0.01) {
        let py = height - map(f(x), -1, 1, 0, height);
        vertex(map(x, -1, 1, 0, width), py);
    }
    endShape();
}

let ti = 0; // Training index - Índice de treinamento
function trainSinglePoint() {
    const pt = points[ti];
    const inputs = [pt.x, pt.y, pt.bias];

    perceptron.train(inputs, pt.label);
    ti++;

    if (ti == points.length){
        ti = 0;
    }
    if (perceptron.acertosConsecutivos >= (points.length * accuracy)){
        training = false;
    }
}