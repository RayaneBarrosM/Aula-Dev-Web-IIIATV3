const express = require('express');
const app = express();
const port = 4800;

app.get('/', (req, res) =>{ //requisição e resposta
    res.send('O servidor está ativo')
})

// Rota para cálculo do IMC
app.get('/imc', (req, res) => {
    const { peso, altura } = req.query;
    
    if (!peso || !altura) {
        return res.status(400).json({ error: 'Parâmetros peso e altura são obrigatórios' });
    }

    const pesoNum = parseFloat(peso);
    const alturaNum = parseFloat(altura);

    //Verificação se o valor não é um não numero
    if ([pesoNum, alturaNum].some(isNaN)) return res.status(400).json({ error: 'Valores devem ser numéricos' });
    //Verificação de altura negativa
    if (alturaNum <= 0) {
        return res.status(400).json({ error: '"altura" deve ser maior que zero' });
    }
    
    //Calculo
    const imc = pesoNum / (alturaNum * alturaNum);
    
    let classificacao;
    if (imc < 18.5) {
        classificacao = 'Abaixo do peso';
    } else if (imc < 25) {
        classificacao = 'Peso normal';
    } else if (imc < 30) {
        classificacao = 'Sobrepeso';
    } else if (imc < 35) {
        classificacao = 'Obesidade grau I';
    } else if (imc < 40) {
        classificacao = 'Obesidade grau II';
    } else {
        classificacao = 'Obesidade grau III';
    }

    res.json({
        imc: imc.toFixed(2),
        classificacao
    });
});

// Rota para cálculo de notas
app.get('/notas', (req, res) => {
    const { p1, p2 } = req.query;
    
    if (!p1 || !p2) {
        return res.status(400).json({ error: 'Parâmetros "p1" e "p2" são obrigatórios' });
    }

    const p1Num = parseFloat(p1);
    const p2Num = parseFloat(p2);

    if (isNaN(p1Num) || isNaN(p2Num)) {
        return res.status(400).json({ error: 'As notas devem ser números válidos' });
    }

    const media = (p1Num + p2Num) / 2;
    const aprovado = media >= 6;

    res.json({
        media: media.toFixed(2),
        situacao: aprovado ? 'Aprovado' : 'Reprovado'
    });
});

// Rota para conversão de dólar
app.get('/dolar', (req, res) => {
    const { r, d } = req.query;
    
    if (!r || !d) {
        return res.status(400).json({ error: 'Parâmetros "r" (reais) e "d" (valor do dólar) são obrigatórios' });
    }

    const reais = parseFloat(r);
    const dolar = parseFloat(d);

    if (isNaN(reais) || isNaN(dolar)) {
        return res.status(400).json({ error: 'Os valores devem ser números válidos' });
    }

    if (dolar <= 0) {
        return res.status(400).json({ error: 'O valor do dólar deve ser maior que zero' });
    }

    const dolaresComprados = reais / dolar;

    res.json({
        reais: reais.toFixed(2),
        valorDolar: dolar.toFixed(2),
        dolares: dolaresComprados.toFixed(2)
    });
});

app.listen(port, ()=>{
    console.log('Servidor iniciado com sucesso!')
})