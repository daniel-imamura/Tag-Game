var texto = document.getElementById("introducao");
var objCanvas = null;
var objContexto = null;
objCanvas = document.getElementById("meuCanvas");
objContexto = objCanvas.getContext("2d");
//dificuldade do jogo
var dificuldadeDificil = false;
var facil = document.getElementById("modoFacil");
var dificil = document.getElementById("modoDificil");
//teleporte
var limiteUso = 5;
//tempo limite
var tempoTotal = 0;
var tempoRestante = document.getElementById("tempo");
//tempo exibido
var recorde = Number.MAX_VALUE;
var recordeTxt = document.getElementById("tempoTotal");
var tempoTxt = document.getElementById("tempotxt");
var horaTxt = document.getElementById("hora");
var minTxt = document.getElementById("minuto");
var segTxt = document.getElementById("segundo");
//tempo limite por rodada
var segundos = 10;
//velocidade 
var nivel = 1;
var velocidade = 1;
//pontuação
var pontuacao = document.getElementById("pontuacao");
//imagens
var imgFundo = new Image();
var imgHeroi = new Image();
var imgMonstro = new Image();
imgFundo.src = "imagens/fundo.png";
imgHeroi.src = "imagens/heroi.png";
imgMonstro.src = "imagens/monstro.png";
//posições
var heroi = { x: 320, y: 200 };
var monstro = { x: 150, y: 200 };
//posições e tamanho 
var tamanhoPersonagem = 25;
var fundo = { largura: 512, altura: 480 };
var ladoEsquerdo = { x: 0, y: 0, largura: 30, altura: 480 };
var ladoDireito = { x: 482, y: 0, largura: 30, altura: 480 };
var ladoDeCima = { x: 0, y: 0, largura: 512, altura: 30 };
var ladoDeBaixo = { x: 0, y: 450, largura: 480, altura: 30 };
//teclas reconhecidas
var LEFT = 37,
    UP = 38,
    RIGHT = 39,
    DOWN = 40;
//direção das teclas   
var mvDireita = false,
    mvEsquerda = false,
    mvCima = false,
    mvBaixo = false;

var tempo = 0;
//Iniciar jogo 
function start() {
    objCanvas.style.display = "block";
    tempoRestante.display = "block";
    pontuacao.style.display = "block";
    tempoRestante.style.display = "block";
    facil.style.display = "none";
    dificil.style.display = "none";
    texto.style.display = "none";

    limiteUso = 5;
    tempoTotal = 0;
    velocidade = 1;
    nivel = 1;
        
    if (tempo != 0) {        
        TempoParaZerar(recorde);                
        tempoTxt.innerHTML = "Recorde: ";
        tempo = 0;
    }
    if(recorde == Number.MAX_VALUE)
        loop();
}
//manter jogo funcionando repetindo a função
function loop() {    
    window.requestAnimationFrame(loop, objCanvas);//manter loop
    window.addEventListener("keydown", iniciarMovimentoHeroi);//movimentação do herói
    window.addEventListener("keyup", pararMovimentoHeroi);//parar movimentção com teclas contrárias
    window.addEventListener("keydown", teleporte);
    pontuacao.innerHTML = `Nível : ${nivel}`;
    //funções
    if (tempo % 5 == 0)//intervalo para movimentação do monstro
        moverMonstro();

    if (tempo % 60 == 0)//intervalo de um segundo para contagem do tempo
        timer();

    update();
    mover();
    pegarMonstro();
    limitarArea();
    
    tempo++;    
}
//Jogo no modo hard
function startDificil(){
    start();
    dificuldadeDificil = true;
}
//desenhar elementos
function update() {
    objContexto.drawImage(imgFundo, 0, 0);
    objContexto.drawImage(imgHeroi, heroi.x, heroi.y);
    objContexto.drawImage(imgMonstro, monstro.x, monstro.y);
}
function iniciarMovimentoHeroi(e) {
    var tecla = e.keyCode;

    if (tecla == RIGHT && tecla != LEFT)
        mvDireita = true;

    if (tecla == LEFT && tecla != RIGHT)
        mvEsquerda = true;

    if (tecla == UP && tecla != DOWN)
        mvCima = true;

    if (tecla == DOWN && tecla != UP)
        mvBaixo = true;
}
function pararMovimentoHeroi(e) {
    var tecla = e.keyCode;

    if (tecla == RIGHT && tecla != LEFT)
        mvDireita = false;

    if (tecla == LEFT && tecla != RIGHT)
        mvEsquerda = false;

    if (tecla == UP && tecla != DOWN)
        mvCima = false;

    if (tecla == DOWN && tecla != UP)
        mvBaixo = false;
}
function mover() {
    if (mvDireita)
        heroi.x += 0.8;

    if (mvEsquerda)
        heroi.x -= 0.8;

    if (mvCima)
        heroi.y -= 0.8;

    if (mvBaixo)
        heroi.y += 0.8;
}

function moverMonstro() {
    var mvDireitaMonstro = false,
        mvEsquerdaMonstro = false,
        mvCimaMonstro = false,
        mvBaixoMonstro = false;

    var direcao = parseInt((Math.random() * 10) % 4);
    var diagonal = parseInt((Math.random() * 10) % 4);
    var distancia = 15;

    switch (direcao) {
        case 0:
            mvDireitaMonstro = true;
            break;
        case 1:
            mvEsquerdaMonstro = true;
            break;
        case 2:
            mvCimaMonstro = true;
            break;
        case 3:
            mvBaixoMonstro = true;
            break;
    }
    switch (diagonal) {
        case 0:
            mvDireitaMonstro = true;
            break;
        case 1:
            mvEsquerdaMonstro = true;
            break;
        case 2:
            mvCimaMonstro = true;
            break;
        case 3:
            mvBaixoMonstro = true;
            break;
    }
    //evita movimentos contrários
    var removerRepX = parseInt((Math.random() * 10) % 2);
    var removerRepY = parseInt((Math.random() * 10) % 2);

    if (mvDireitaMonstro = true && mvEsquerdaMonstro == true) {
        if (removerRepX == 1)
            mvDireitaMonstro = false;
        else
            mvEsquerdaMonstro = false;
    }
    if (mvCimaMonstro == true && mvBaixoMonstro == true) {
        if (removerRepY == 0)
            mvCimaMonstro = false;
        else
            mvBaixoMonstro = false;
    }
    //Caso o monstro se aproxime demais do herói, se distanciar mais rapidamente
    if(monstro.x, monstro.y, 100, 100, heroi.x, heroi.y, tamanhoPersonagem, tamanhoPersonagem)    
        distancia = 30;    

    //movimentação inteligente do monstro para fugir
    if (dificuldadeDificil == true) {
        //arredores do monstro
        var direita = { x: monstro.x + 60, y: monstro.y - 15, largura: 15, altura: 60 };
        var esquerda = { x: monstro.x - 60, y: monstro.y - 15, largura: 15, altura: 60 };
        var cima = { x: monstro.x - 15, y: monstro.y - 60, largura: 60, altura: 15 };
        var baixo = { x: monstro.x - 15, y: monstro.y + 60, largura: 60, altura: 15 };
        //mudar direção para evitar ir de encontro com o herói
        if(colisao(heroi.x, heroi.y, tamanhoPersonagem, tamanhoPersonagem, direita.x, direita.y, direita.largura, direita.altura))        
            mvDireitaMonstro = false;

        if(colisao(heroi.x, heroi.y, tamanhoPersonagem, tamanhoPersonagem, esquerda.x, esquerda.y, esquerda.largura, esquerda.altura))       
            mvEsquerdaMonstro = false;

        if(colisao(heroi.x, heroi.y, tamanhoPersonagem, tamanhoPersonagem, cima.x, cima.y, cima.largura, cima.altura))        
            mvCimaMonstro = false;

        if(colisao(heroi.x, heroi.y, tamanhoPersonagem, tamanhoPersonagem, baixo.x, baixo.y, baixo.largura, baixo.altura))        
            mvBaixoMonstro = false;
    }
    //Mover moonstro
    if (mvDireitaMonstro)
        monstro.x += distancia + (nivel * velocidade);

    if (mvEsquerdaMonstro)
        monstro.x -= distancia + (nivel * velocidade);

    if (mvCimaMonstro)
        monstro.y -= distancia + (nivel * velocidade);

    if (mvBaixoMonstro)
        monstro.y += distancia + (nivel * velocidade);

    distancia = 15;
}
function pegarMonstro() {
    if(colisao(heroi.x, heroi.y, tamanhoPersonagem, tamanhoPersonagem, monstro.x, monstro.y, tamanhoPersonagem, tamanhoPersonagem))
    {
        heroi.x = 320, heroi.y = 200;
        monstro.x = 150, monstro.y = 200;
        nivel++;
        tempoTotal += segundos;
        segundos = 10;                
        if (nivel == 11) {
            facil.style.display = "block";
            dificil.style.display = "block";

            TempoParaZerar(tempoTotal);//formatar segundos para minutos e horas

            if(tempoTotal < recorde)//guardar novo recorde
                recorde = tempoTotal;

            objCanvas.style.display = "none";
            pontuacao.style.display = "none";
            tempoRestante.style.display = "none";      
            dificuldadeDificil = false;      
        }
    }
}
//efeito com a barra de espaço
function teleporte(e) {
    var tecla = e.keyCode;

    if (limiteUso > 0) {
        if (tecla == 32) {
            if (mvDireita)
                heroi.x += 50;

            if (mvEsquerda)
                heroi.x -= 50;

            if (mvCima)
                heroi.y -= 50;

            if (mvBaixo)
                heroi.y += 50;

            if (mvDireita == true || mvEsquerda == true || mvCima == true || mvBaixo == true)
                limiteUso--;
        }
    }
}
function limitarArea() {
    //limita borda do heroi
    if(colisao(heroi.x, heroi.y, tamanhoPersonagem, tamanhoPersonagem, ladoEsquerdo.x, ladoEsquerdo.y, ladoEsquerdo.largura, ladoEsquerdo.altura))    
        heroi.x += 10;
    if(colisao(heroi.x, heroi.y, tamanhoPersonagem, tamanhoPersonagem, ladoDireito.x, ladoDireito.y, ladoDireito.largura, ladoDireito.altura))   
        heroi.x -= 10;
    if(colisao(heroi.x, heroi.y, tamanhoPersonagem, tamanhoPersonagem, ladoDeCima.x, ladoDeCima.y, ladoDeCima.largura, ladoDeCima.altura))    
        heroi.y += 10;
    if(colisao(heroi.x, heroi.y, tamanhoPersonagem, tamanhoPersonagem, ladoDeBaixo.x, ladoDeBaixo.y, ladoDeBaixo.largura, ladoDeBaixo.altura))
        heroi.y -= 10;

    //limita borda do monstro
    if(colisao(monstro.x, monstro.y, tamanhoPersonagem, tamanhoPersonagem, ladoEsquerdo.x, ladoEsquerdo.y, ladoEsquerdo.largura, ladoEsquerdo.altura))
        monstro.x += 10;
    if(colisao(monstro.x, monstro.y, tamanhoPersonagem, tamanhoPersonagem,ladoDireito.x, ladoDireito.y, ladoDireito.largura, ladoDireito.altura))
        monstro.x -= 10;
    if(colisao(monstro.x, monstro.y, tamanhoPersonagem, tamanhoPersonagem, ladoDeCima.x, ladoDeCima.y, ladoDeCima.largura, ladoDeCima.altura))
        monstro.y += 10;
    if(colisao(monstro.x, monstro.y, tamanhoPersonagem, tamanhoPersonagem, ladoDeBaixo.x, ladoDeBaixo.y, ladoDeBaixo.largura, ladoDeBaixo.altura))
        monstro.y -= 10;
}
//tempo para concluir cada nível
function timer() {
    if (nivel <= 10) {
        if (segundos == 0) {
            if (velocidade < 1.5)
                velocidade += 0.1;

            tempoTotal += segundos;
            segundos = 10;
            nivel = 1;
            heroi.x = 320, heroi.y = 200;
            monstro.x = 150, monstro.y = 200;
        }
        tempoRestante.innerHTML = `${segundos}`;
        segundos--;
    }
}
//método para formatar os segundos para minutos e horas
function TempoParaZerar(tempo) {
    var min = parseInt(tempo / 60);
    var hora = parseInt(min / 60);
    var seg = parseInt(tempo % 60);

    tempoTxt.innerHTML = "Tempo Total: ";

    if (hora > 9)
        horaTxt.innerHTML = `${hora} :`;
    else
        horaTxt.innerHTML = `0${hora} :`;

    if (min > 9)
        minTxt.innerHTML = ` ${min} :`;
    else
        minTxt.innerHTML = ` 0${min} :`;

    if (seg > 9)
        segTxt.innerHTML = `${seg}`;
    else
        segTxt.innerHTML = `0${seg}`;   
}
//detectar colisão entre elementos
function colisao(Ax, Ay, larguraA, alturaA, Bx, By, larguraB, alturaB){
    if(Ax < Bx + larguraB &&
        Bx < Ax + larguraA &&
        Ay < By + alturaB &&
        By < Ay + alturaA)
        return true;    
}