class Perceptron {
    weights = [];
    lr = 0.1;    // Learning ratio - Taxa de aprendizado 
    acertosConsecutivos = 0;

    constructor(numWeights) {
        this.weights = new Array(numWeights);
        for (let i = 0; i < this.weights.length; i++){
            this.weights[i] = random(-1,1);
        }
    }

    train(inputs, target) {
        const guess = this.guess(inputs);
        const error = target - guess;

        for (let i = 0; i < this.weights.length; i++){
            this.weights[i] += error * inputs[i] * this.lr;
        }
        if (error == 0){
            this.acertosConsecutivos++;
        } else {
            this.acertosConsecutivos = 0;
        }
    }

    guess(inputs) {
        let sum = 0;
        for (let i = 0; i < this.weights.length; i++){
            sum += inputs[i] * this.weights[i];
        }

        let output = sign(sum);
        return output;
    }

    guessY(x){
        let w0 = this.weights[0];
        let w1 = this.weights[1];
        let w2 = this.weights[2];

        return -(w2/w1) - (w0/w1) * x;
    }
}

function sign(num) {
    return num >= 0 ? 1 : -1;
}