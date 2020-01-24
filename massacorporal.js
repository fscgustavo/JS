function IMC(M){
    if(M < 16)
    {
        return 'Baixo peso muito grave';
    }
    else if(16 <= M && M <= 16.99)
    {
        return 'Baixo peso grave';
    }
    else if(17 <= M && M <= 18.49)
    {
        return 'Baixo peso';
    }
    else if(18.5 <= M && M <= 24.99)
    {
        return 'Peso normal';
    }
    else if(25 <= M && M <= 29.99)
    {
        return 'Sobrepeso';
    }
    else if(30 <= M && M <= 34.99)
    {
        return 'Obesidade grau I';
    }
    else if(35 <= M && M <= 35.99)
    {
        return 'Obesidade grau II';
    }
    else if(40 <= M )
    {
        return 'Obesidade grau III';
    }

}

let nome = prompt('Nome');
let altura = parseFloat(prompt('Altura (cm)'))/100;
let peso = parseFloat(prompt('Peso (kg)'));

let M = peso/(altura**2);
let faixa = IMC(M);

document.write(`${nome} com ${altura} m e ${peso} kg, você está na faixa "${faixa}"`);