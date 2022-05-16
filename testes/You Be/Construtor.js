// VARIAVÉIS

var sombraHorizontal = 3;
var sombraVertical = 3;
var incrementoSombra;
var tempoSol = 5000;
var loop;

var imagensTempo = 200;

var canvasPrincipalLigado = true;

var loopAlerta = true;

var x1 = 17, y1 = 20;

//

var circuloPosicaoX = 350;

var circuloPosicaoY = 100;

var circuloTamanho = 100;

var anguloInicial = (Math.PI / 180) * 0;

var anguloFinal = (Math.PI / 180) * 360;

//O SENTIDO DE DESENHO É APARTIR DO ANGULO FINAL
var sentidoCirculo = true;

//

//IMAGENS:

var imagemEmBranco = new Image();

imagemEmBranco.src = "../../imagens/texture/2D/emBranco.png";

//

var imagemCidade2 = new Image();
imagemCidade2.src = "../../imagens/texture/2D/cidade2.png"

// SECAO TELA PERSONAGEM:

var secaoTelaPersonagem = document.getElementById('secaoTelaPersonagem');

var secaoTelaPersonagemPropriedades = secaoTelaPersonagem.getBoundingClientRect();

var secaoTelaPersonagemLargura = secaoTelaPersonagemPropriedades.width;

var secaoTelaPersonagemAltura = secaoTelaPersonagemPropriedades.height;

//CANVAS TELA PRINCIPAL:

var telaCanvasPrincipal = document.getElementById('telaCanvasPrincipal');

var contextoTelaCanvasPrincipal = telaCanvasPrincipal.getContext('2d');

telaCanvasPrincipal.width = secaoTelaPersonagemLargura;

telaCanvasPrincipal.height = secaoTelaPersonagemAltura;

// FUNÇÕES CONSTRUTORAS

// CIDADES:

function Cidade()
{
    this.imagem = new Image();
    this.imagem.src = "../../imagens/texture/2D/cidade1.png"

    this.imagem.posicaoXRecorte = 0;
    this.imagem.posicaoYRecorte = 0;
    this.imagem.larguraRecorte = this.imagem.width;
    this.imagem.alturaRecorte = this.imagem.height;
    this.imagem.posicaoX = 0;
    this.imagem.posicaoY = 0;
    this.imagem.largura = this.imagem.width;
    this.imagem.altura = this.imagem.height;
    this.imagem.margemNorte = this.imagem.posicaoY;
    this.imagem.margemSul = this.imagem.posicaoY + this.imagem.height;
    this.imagem.margemLeste = this.imagem.posicaoX + this.imagem.width;
    this.imagem.margemOeste = this.imagem.posicaoX;    
}

function Quarteirao(cidade, posicaoX, posicaoY, largura, altura)
{
    this.posicaoXAtual = posicaoX;

    this.posicaoYAtual = posicaoY;

    this.posicaoX = cidade.imagem.posicaoX - cidade.imagem.posicaoXRecorte + this.posicaoXAtual;

    this.posicaoY = cidade.imagem.posicaoY - cidade.imagem.posicaoYRecorte + this.posicaoYAtual;

    this.largura = largura;

    this.altura = altura;
}

//

function localDeInteracao(cidade, posicaoX, posicaoY, largura, altura)
{
    this.posicaoXAtual = posicaoX;
    this.posicaoYAtual = posicaoY;
    this.posicaoX = cidade.imagem.posicaoX - cidade.imagem.posicaoXRecorte + this.posicaoXAtual;

    this.posicaoY = cidade.imagem.posicaoY - cidade.imagem.posicaoYRecorte + this.posicaoYAtual;

    this.largura = largura;

    this.altura = altura;
}

// PLAYER

class Player
{
    constructor( cidade, posicaoX, posicaoY, largura, altura, velocidade, imagem )
    {
        this.posicaoX = parseInt(posicaoX ? posicaoX : telaCanvasPrincipal.width / 2);// 
        this.posicaoY = parseInt(posicaoY ? posicaoY : telaCanvasPrincipal.height / 2); //
        this.largura = largura ? largura : cidade.imagem.largura/100; //
        this.altura = altura ? altura : cidade.imagem.altura/100; //   
        this.velocidade = velocidade ? velocidade : 3; //
        this.direcaoX = 0; //
        this.direcaoY = 0; //
        this.distanciaInimigo = 100;
        
        this.posicaoXGlobal = cidade.imagem.posicaoX - cidade.imagem.posicaoXRecorte + this.posicaoX;

        this.posicaoYGlobal = cidade.imagem.posicaoY - cidade.imagem.posicaoYRecorte + this.posicaoY;

        //IMAGEM:

        this.imagem = new Image();
        this.imagem.src = imagem ? imagem : "../../imagens/texture/2D/personagem1.png";

        // POSIÇÕES ATUAIS DA IMAGEM DO PLAYER 1:

        this.imagemPosInicialX = 0;
        this.imagemPosInicialY = 125;
        this.imagemCorteLargura = 37;
        this.imagemCorteAltura = 54;

        // CORRENDO DIREITA:

        this.imagemPosInicialXCorrendoD1 = 6;
        this.imagemPosInicialXCorrendoD2 = 67;
        this.imagemPosInicialXCorrendoD3 = 133;
        this.imagemPosInicialXCorrendoD4 = 197;

        this.imagemPosInicialYCorrendoD1 = 704;
        this.imagemPosInicialYCorrendoD2 = 705;
        this.imagemPosInicialYCorrendoD3 = 704;
        this.imagemPosInicialYCorrendoD4 = 704;

        this.imagemCorteLarguraCorrendoD1 = 25;
        this.imagemCorteLarguraCorrendoD2 = 25;
        this.imagemCorteLarguraCorrendoD3 = 25;
        this.imagemCorteLarguraCorrendoD4 = 25;

        this.imagemCorteAlturaCorrendoD1 = 48;
        this.imagemCorteAlturaCorrendoD2 = 48;
        this.imagemCorteAlturaCorrendoD3 = 48;
        this.imagemCorteAlturaCorrendoD4 = 48;

        // CORRENDO ESQUERDA:

        this.imagemPosInicialXCorrendoE1 = 6;
        this.imagemPosInicialXCorrendoE2 = 69;
        this.imagemPosInicialXCorrendoE3 = 133;
        this.imagemPosInicialXCorrendoE4 = 198;

        this.imagemPosInicialYCorrendoE1 = 576;
        this.imagemPosInicialYCorrendoE2 = 578;
        this.imagemPosInicialYCorrendoE3 = 578;
        this.imagemPosInicialYCorrendoE4 = 577;

        this.imagemCorteLarguraCorrendoE1 = 21;
        this.imagemCorteLarguraCorrendoE2 = 25;
        this.imagemCorteLarguraCorrendoE3 = 22;
        this.imagemCorteLarguraCorrendoE4 = 23;

        this.imagemCorteAlturaCorrendoE1 = 48;
        this.imagemCorteAlturaCorrendoE2 = 47;
        this.imagemCorteAlturaCorrendoE3 = 47;
        this.imagemCorteAlturaCorrendoE4 = 47;

        // CORRENDO PARA CIMA:

        this.imagemPosInicialXCorrendoC1 = 1;
        this.imagemPosInicialXCorrendoC2 = 65;
        this.imagemPosInicialXCorrendoC3 = 129;
        this.imagemPosInicialXCorrendoC4 = 193;

        this.imagemPosInicialYCorrendoC1 = 511;
        this.imagemPosInicialYCorrendoC2 = 511;
        this.imagemPosInicialYCorrendoC3 = 511;
        this.imagemPosInicialYCorrendoC4 = 512;

        this.imagemCorteLarguraCorrendoC1 = 30;
        this.imagemCorteLarguraCorrendoC2 = 30;
        this.imagemCorteLarguraCorrendoC3 = 30;
        this.imagemCorteLarguraCorrendoC4 = 29;

        this.imagemCorteAlturaCorrendoC1 = 48;
        this.imagemCorteAlturaCorrendoC2 = 48;
        this.imagemCorteAlturaCorrendoC3 = 49;
        this.imagemCorteAlturaCorrendoC4 = 49;

        // CORRENDO PARA BAIXO:

        this.imagemPosInicialXCorrendoB1 = 194;
        this.imagemPosInicialXCorrendoB2 = 257;
        this.imagemPosInicialXCorrendoB3 = 321;
        this.imagemPosInicialXCorrendoB4 = 385;

        this.imagemPosInicialYCorrendoB1 = 640;
        this.imagemPosInicialYCorrendoB2 = 639;
        this.imagemPosInicialYCorrendoB3 = 639;
        this.imagemPosInicialYCorrendoB4 = 639;

        this.imagemCorteLarguraCorrendoB1 = 29;
        this.imagemCorteLarguraCorrendoB2 = 30;
        this.imagemCorteLarguraCorrendoB3 = 30;
        this.imagemCorteLarguraCorrendoB4 = 30;

        this.imagemCorteAlturaCorrendoB1 = 49;
        this.imagemCorteAlturaCorrendoB2 = 50;
        this.imagemCorteAlturaCorrendoB3 = 49;
        this.imagemCorteAlturaCorrendoB4 = 50;

        //PARADO:

        this.imagemPosInicialXParado1 = 1;
        this.imagemPosInicialYParado1 = 127;
        this.imagemCorteLarguraParado1 = 30;
        this.imagemCorteAlturaParado1 = 49;

        this.imagemPosInicialXParado2 = 65;
        this.imagemPosInicialYParado2 = 127;
        this.imagemCorteLarguraParado2 = 30;
        this.imagemCorteAlturaParado2 = 49;

        this.imagemPosInicialXParado3 = 385;
        this.imagemPosInicialYParado3 = 127;
        this.imagemCorteLarguraParado3 = 34;
        this.imagemCorteAlturaParado3 = 49;

        this.imagemPosInicialXParado4 = 1;
        this.imagemPosInicialYParado4 = 639;
        this.imagemCorteLarguraParado4 = 30;
        this.imagemCorteAlturaParado4 = 49;

        //
    }
}

class Civil extends Player
{
    constructor ( cidade, posicaoX, posicaoY, largura, altura, velocidade, imagem, emAlerta,moradaX,moradaY)
    {
        super( cidade, posicaoX, posicaoY, largura, altura, velocidade, imagem);

        this.posicaoXMorada = moradaX ? moradaX : 740; //
        this.posicaoYMorada = moradaY ? moradaY : 20; //
        this.posicaoXAtual = posicaoX ? posicaoX : 740; //
        this.posicaoYAtual = posicaoY ? posicaoY : 400; //
        this.posicaoXFixo = cidade.imagem.posicaoX - cidade.imagem.posicaoXRecorte + this.posicaoXMorada; //
        this.posicaoYFixo = cidade.imagem.posicaoY - cidade.imagem.posicaoYRecorte + this.posicaoYMorada; //
        this.posicaoX = cidade.imagem.posicaoX - cidade.imagem.posicaoXRecorte + this.posicaoXAtual; //
        this.posicaoY = cidade.imagem.posicaoY - cidade.imagem.posicaoYRecorte + this.posicaoYAtual; //    
        this.largura = largura ? largura : cidade.imagem.largura/100; //
        this.altura = altura ? altura : cidade.imagem.altura/100; //  
        this.velocidade = velocidade ? velocidade : 3; //
        this.direcaoX = 0; //
        this.direcaoY = 1; //
        this.emAlerta = emAlerta ? emAlerta : false; //

        this.imagem = new Image();
        this.imagem.src = "../../imagens/texture/2D/pacman3d.png"

        // POSIÇÃO ATUAL DA IMAGEM:
    
        this.imagemPosInicialX = 6;
        this.imagemPosInicialY = 161;
        this.imagemCorteLargura = 36;
        this.imagemCorteAltura = 36;

        // CORRENDO DIREITA:

        this.imagemPosInicialXCorrendoD1 = 5;
        this.imagemPosInicialXCorrendoD2 = 5;
        this.imagemPosInicialXCorrendoD3 = 5;
        this.imagemPosInicialXCorrendoD4 = 5;

        this.imagemPosInicialYCorrendoD1 = 11;
        this.imagemPosInicialYCorrendoD2 = 61;
        this.imagemPosInicialYCorrendoD3 = 111;
        this.imagemPosInicialYCorrendoD4 = 11;

        this.imagemCorteLarguraCorrendoD1 = 36;
        this.imagemCorteLarguraCorrendoD2 = 36;
        this.imagemCorteLarguraCorrendoD3 = 36;
        this.imagemCorteLarguraCorrendoD4 = 36;

        this.imagemCorteAlturaCorrendoD1 = 37;
        this.imagemCorteAlturaCorrendoD2 = 37;
        this.imagemCorteAlturaCorrendoD3 = 37;
        this.imagemCorteAlturaCorrendoD4 = 37;

        // CORRENDO ESQUERDA:

        this.imagemPosInicialXCorrendoE1 = 6;
        this.imagemPosInicialXCorrendoE2 = 6;
        this.imagemPosInicialXCorrendoE3 = 9;
        this.imagemPosInicialXCorrendoE4 = 6;

        this.imagemPosInicialYCorrendoE1 = 310;
        this.imagemPosInicialYCorrendoE2 = 360;
        this.imagemPosInicialYCorrendoE3 = 410;
        this.imagemPosInicialYCorrendoE4 = 310;

        this.imagemCorteLarguraCorrendoE1 = 39;
        this.imagemCorteLarguraCorrendoE2 = 39;
        this.imagemCorteLarguraCorrendoE3 = 39;
        this.imagemCorteLarguraCorrendoE4 = 39;

        this.imagemCorteAlturaCorrendoE1 = 39;
        this.imagemCorteAlturaCorrendoE2 = 39;
        this.imagemCorteAlturaCorrendoE3 = 39;
        this.imagemCorteAlturaCorrendoE4 = 39;

        // CORRENDO PARA CIMA:

        this.imagemPosInicialXCorrendoC1 = 6;
        this.imagemPosInicialXCorrendoC2 = 6;
        this.imagemPosInicialXCorrendoC3 = 6;
        this.imagemPosInicialXCorrendoC4 = 6;

        this.imagemPosInicialYCorrendoC1 = 460;
        this.imagemPosInicialYCorrendoC2 = 509;
        this.imagemPosInicialYCorrendoC3 = 560;
        this.imagemPosInicialYCorrendoC4 = 460;

        this.imagemCorteLarguraCorrendoC1 = 37;
        this.imagemCorteLarguraCorrendoC2 = 37;
        this.imagemCorteLarguraCorrendoC3 = 37;
        this.imagemCorteLarguraCorrendoC4 = 37;

        this.imagemCorteAlturaCorrendoC1 = 39;
        this.imagemCorteAlturaCorrendoC2 = 39;
        this.imagemCorteAlturaCorrendoC3 = 39;
        this.imagemCorteAlturaCorrendoC4 = 39;

        // CORRENDO PARA BAIXO:

        this.imagemPosInicialXCorrendoB1 = 6;
        this.imagemPosInicialXCorrendoB2 = 6;
        this.imagemPosInicialXCorrendoB3 = 6;
        this.imagemPosInicialXCorrendoB4 = 6;

        this.imagemPosInicialYCorrendoB1 = 160;
        this.imagemPosInicialYCorrendoB2 = 211;
        this.imagemPosInicialYCorrendoB3 = 261;
        this.imagemPosInicialYCorrendoB4 = 160;

        this.imagemCorteLarguraCorrendoB1 = 37;
        this.imagemCorteLarguraCorrendoB2 = 37;
        this.imagemCorteLarguraCorrendoB3 = 37;
        this.imagemCorteLarguraCorrendoB4 = 37;

        this.imagemCorteAlturaCorrendoB1 = 39;
        this.imagemCorteAlturaCorrendoB2 = 39;
        this.imagemCorteAlturaCorrendoB3 = 39;
        this.imagemCorteAlturaCorrendoB4 = 39; 
}
}

// CONTROLE

function Controle(key1, key2, key3, key4,key5)
{
    this.teclaSetaParaCimaPressionada = false;
    this.teclaSetaParaBaixoPressionada = false;

    this.teclaSetaParaDireitaPressionada = false;
    this.teclaSetaParaEsquerdaPressionada = false;

    this.teclaEPressionada = false;

    this.keyUp = function (eventoAcionado)
    {
        if (eventoAcionado.keyCode == key1)
        {
            controle1.teclaSetaParaCimaPressionada = false;

        } else if (eventoAcionado.keyCode == key2)
        {
            controle1.teclaSetaParaBaixoPressionada = false;
        } else if (eventoAcionado.keyCode == key3)
        {
            controle1.teclaSetaParaDireitaPressionada = false;

        } else if (eventoAcionado.keyCode == key4)
        {
            controle1.teclaSetaParaEsquerdaPressionada = false;

        } else if (eventoAcionado.keyCode == key5)
        {
            controle1.teclaEPressionada = false;
        }
    }

    this.keyDown = function (eventoAcionado)
    {
        if (eventoAcionado.keyCode == key1)
        {
            controle1.teclaSetaParaCimaPressionada = true;

        } else if (eventoAcionado.keyCode == key2)
        {
            controle1.teclaSetaParaBaixoPressionada = true;
        } else if (eventoAcionado.keyCode == key3)
        {
            controle1.teclaSetaParaDireitaPressionada = true;

        } else if (eventoAcionado.keyCode == key4)
        {
            controle1.teclaSetaParaEsquerdaPressionada = true;

        }else if (eventoAcionado.keyCode == key5)
        {
            controle1.teclaEPressionada = true;
        }
    }

    this.mover = function (direcao)
    {
        switch (direcao) 
        {
            case "paraCima":
                controle1.teclaSetaParaCimaPressionada = true;
                break;

            case "paraBaixo":
                controle1.teclaSetaParaBaixoPressionada = true;
                break;

            case "paraDireita":
                controle1.teclaSetaParaDireitaPressionada = true;
                break;

            case "paraEsquerda":
                controle1.teclaSetaParaEsquerdaPressionada = true;
                break;

            default:
                controle1.teclaSetaParaCimaPressionada = false;
                controle1.teclaSetaParaBaixoPressionada = false;
                controle1.teclaSetaParaDireitaPressionada = false;
                controle1.teclaSetaParaEsquerdaPressionada = false;
                break;
        }
    }

    this.parar = function ()
    {
        controle1.teclaSetaParaCimaPressionada = false;
        controle1.teclaSetaParaBaixoPressionada = false;
        controle1.teclaSetaParaDireitaPressionada = false;
        controle1.teclaSetaParaEsquerdaPressionada = false;
        controle1.teclaEPressionada = false;
    }

    this.apertar = function (tecla)
    {
        switch (tecla) 
        {
            case "letraE":
                controle1.teclaEPressionada = true;
                break;            

            default:
              
                break;
        }
    }
}

//

function quarteiraoEmCima(quarteirao, player)
{
    return player.posicaoX + player.largura >= quarteirao.posicaoX && player.posicaoX <= quarteirao.posicaoX + quarteirao.largura && player.posicaoY <= quarteirao.posicaoY && player.posicaoY + player.altura >= quarteirao.posicaoY;
}

function quarteiraoEmBaixo(quarteirao, player)
{
    return player.posicaoX + player.largura >= quarteirao.posicaoX && player.posicaoX <= quarteirao.posicaoX + quarteirao.largura && player.posicaoY <= quarteirao.posicaoY + quarteirao.altura && player.posicaoY + player.altura >= quarteirao.posicaoY + quarteirao.altura;

}

function quarteiraoEsquerda(quarteirao, player)
{
    return player.posicaoX + player.largura >= quarteirao.posicaoX && player.posicaoX <= quarteirao.posicaoX && player.posicaoY + player.altura >= quarteirao.posicaoY && player.posicaoY <= quarteirao.posicaoY + quarteirao.altura;
}

function quarteiraoDireita(quarteirao, player)
{
    return player.posicaoX <= quarteirao.posicaoX + quarteirao.largura && player.posicaoX + player.largura >= quarteirao.posicaoX + quarteirao.largura && player.posicaoY + player.altura >= quarteirao.posicaoY && player.posicaoY <= quarteirao.posicaoY + quarteirao.altura;
}

//

function interacao(local, player)
{
    return player.posicaoX + player.largura >= local.posicaoX && player.posicaoX <= local.posicaoX + local.largura && player.posicaoY <= local.posicaoY + local.altura && player.posicaoY + player.altura >= local.posicaoY;
}

////SPRITES:

// SPRITE - CORRENDO DIREITA:

function imagensCorrendoDireita(elemento)
{
    //elemento.imagemPosInicialX:

    if (elemento.imagemPosInicialX == elemento.imagemPosInicialXCorrendoD1)
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoD2; }, imagensTempo)

    } else if (elemento.imagemPosInicialX == elemento.imagemPosInicialXCorrendoD2)
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoD3; }, imagensTempo)

    } else if (elemento.imagemPosInicialX == elemento.imagemPosInicialXCorrendoD3)
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoD4; }, imagensTempo)
    } else
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoD1; }, imagensTempo)
    }

    //elemento.imagemPosInicialY:

    if (elemento.imagemPosInicialY == elemento.imagemPosInicialYCorrendoD1)
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoD2; }, imagensTempo)

    } else if (elemento.imagemPosInicialY == elemento.imagemPosInicialYCorrendoD2)
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoD3; }, imagensTempo)

    } else if (elemento.imagemPosInicialY == elemento.imagemPosInicialYCorrendoD3)
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoD4; }, imagensTempo)
    } else
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoD1; }, imagensTempo)
    }

    //elemento.imagemCorteLargura:

    if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraCorrendoD1)
    {
        setTimeout(() => {  elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoD2; }, imagensTempo)
       
    } else if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraCorrendoD2)
    {
        setTimeout(() => {  elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoD3; }, imagensTempo)        
    
    } else if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraCorrendoD3)
    {
        setTimeout(() => {   elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoD4; }, imagensTempo)
       
    } else
    {
        setTimeout(() => {  elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoD1; }, imagensTempo)
        
    }

    //elemento.imagemCorteAltura:

    if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaCorrendoD1)
    {
        setTimeout(() => {  elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoD2; }, imagensTempo)        
    
    } else if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaCorrendoD2)
    {
        setTimeout(() => {  elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoD3; }, imagensTempo)        
    
    } else if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaCorrendoD3)
    {
        setTimeout(() => {  elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoD4; }, imagensTempo)

    } else
    {
        setTimeout(() => {  elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoD1; }, imagensTempo)

    }
}

// SPRITE - CORRENDO ESQUERDA:

function imagensCorrendoEsquerda(elemento)
{
    //elemento.imagemPosInicialX:

    if (elemento.imagemPosInicialX == elemento.imagemPosInicialXCorrendoE1)
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoE2; }, imagensTempo)

    } else if (elemento.imagemPosInicialX == elemento.imagemPosInicialXCorrendoE2)
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoE3; }, imagensTempo)

    } else if (elemento.imagemPosInicialX == elemento.imagemPosInicialXCorrendoE3)
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoE4; }, imagensTempo)
    } else
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoE1; }, imagensTempo)
    }

    //elemento.imagemPosInicialY:

    if (elemento.imagemPosInicialY == elemento.imagemPosInicialYCorrendoE1)
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoE2; }, imagensTempo)

    } else if (elemento.imagemPosInicialY == elemento.imagemPosInicialYCorrendoE2)
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoE3; }, imagensTempo)

    } else if (elemento.imagemPosInicialY == elemento.imagemPosInicialYCorrendoE3)
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoE4; }, imagensTempo)
    } else
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoE1; }, imagensTempo)
    }

    //elemento.imagemCorteLargura:

    if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraCorrendoE1)
    {
        setTimeout(() => { elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoE2; }, imagensTempo)
    
    } else if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraCorrendoE2)
    {
        setTimeout(() => {  elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoE3; }, imagensTempo)        
    
    } else if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraCorrendoE3)
    {
        setTimeout(() => { elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoE4; }, imagensTempo)
        
    } else
    {
        setTimeout(() => {  elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoE1; }, imagensTempo)
        
    }

    //elemento.imagemCorteAltura:

    if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaCorrendoE1)
    {
        setTimeout(() => { elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoE2; }, imagensTempo)        
    
    } else if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaCorrendoE2)
    {
        setTimeout( () => { elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoE3; }, imagensTempo )
        
    } else if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaCorrendoE3)
    {
        setTimeout(() => { elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoE4;}, imagensTempo)
        
    } else
    {
        setTimeout(() => {  elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoE1; }, imagensTempo)
        
    }
}

// SPRITE - CORRENDO PARA CIMA:

function imagensCorrendoParaCima(elemento)
{
    //elemento.imagemPosInicialX:

    if (elemento.imagemPosInicialX == elemento.imagemPosInicialXCorrendoC1)
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoC2; }, imagensTempo)

    } else if (elemento.imagemPosInicialX == elemento.imagemPosInicialXCorrendoC2)
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoC3; }, imagensTempo)

    } else if (elemento.imagemPosInicialX == elemento.imagemPosInicialXCorrendoC3)
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoC4; }, imagensTempo)
    } else
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoC1; }, imagensTempo)

    }

    //elemento.imagemPosInicialY:

    if (elemento.imagemPosInicialY == elemento.imagemPosInicialYCorrendoC1)
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoC2; }, imagensTempo)

    } else if (elemento.imagemPosInicialY == elemento.imagemPosInicialYCorrendoC2)
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoC3; }, imagensTempo)

    } else if (elemento.imagemPosInicialY == elemento.imagemPosInicialYCorrendoC3)
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoC4; }, imagensTempo)

    } else
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoC1; }, imagensTempo)
    }

    //elemento.imagemCorteLargura:

    if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraCorrendoC1)
    {
        setTimeout(() => { elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoC2; }, imagensTempo)
    
    } else if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraCorrendoC2)
    {
        setTimeout(() => { elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoC3;}, imagensTempo)       

    } else if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraCorrendoC3)
    {
        setTimeout(() => { elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoC4; }, imagensTempo)
        
    } else
    {
        setTimeout(() => { elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoC1; }, imagensTempo)
        
    }

    //elemento.imagemCorteAltura:

    if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaCorrendoC1)
    {
        setTimeout(() => {  elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoC2; }, imagensTempo)       
    
    } else if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaCorrendoC2)
    {
        setTimeout(() => { elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoC3;}, imagensTempo)        
    
    } else if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaCorrendoC3)
    {
        setTimeout(() => { elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoC4; }, imagensTempo)
        
    } else
    {
        setTimeout(() => { elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoC1; }, imagensTempo)
        
    }
}

// SPRITE - CORRENDO PARA BAIXO:

function imagensCorrendoParaBaixo(elemento)
{
    //elemento.imagemPosInicialX:

    if (elemento.imagemPosInicialX == elemento.imagemPosInicialXCorrendoB1)
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoB2; }, imagensTempo)

    } else if (elemento.imagemPosInicialX == elemento.imagemPosInicialXCorrendoB2)
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoB3; }, imagensTempo)

    } else if (elemento.imagemPosInicialX == elemento.imagemPosInicialXCorrendoB3)
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoB4; }, imagensTempo)

    } else
    {
        setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXCorrendoB1; }, imagensTempo)
    }

    //elemento.imagemPosInicialY:

    if (elemento.imagemPosInicialY == elemento.imagemPosInicialYCorrendoB1)
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoB2; }, imagensTempo)


    } else if (elemento.imagemPosInicialY == elemento.imagemPosInicialYCorrendoB2)
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoB3; }, imagensTempo)


    } else if (elemento.imagemPosInicialY == elemento.imagemPosInicialYCorrendoB3)
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoB4; }, imagensTempo)


    } else
    {
        setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYCorrendoB1; }, imagensTempo)

    }

    //elemento.imagemCorteLargura:

    if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraCorrendoB1)
    {
        setTimeout(() => { elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoB2; }, imagensTempo)

    } else if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraCorrendoB2)
    {
        setTimeout(() => { elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoB3; }, imagensTempo)        

    } else if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraCorrendoB3)
    {
        setTimeout(() => { elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoB4; }, imagensTempo)        

    } else
    {
        setTimeout(() => { elemento.imagemCorteLargura = elemento.imagemCorteLarguraCorrendoB1; }, imagensTempo)
        
    }

    //elemento.imagemCorteAltura:

    if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaCorrendoB1)
    {
        setTimeout(() => { elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoB2; }, imagensTempo)        

    } else if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaCorrendoB2)
    {
        setTimeout(() => { elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoB3;}, imagensTempo)        

    } else if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaCorrendoB3)
    {
        setTimeout(() => { elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoB4; }, imagensTempo)        

    } else
    {
        setTimeout(() => { elemento.imagemCorteAltura = elemento.imagemCorteAlturaCorrendoB1;}, imagensTempo)       
        
    }
}

//PARADO

function imagemParado(elemento,tempo)
{
    switch (elemento)
    {
        case player1:
     
            //elemento.imagemPosInicialX:

            if (elemento.imagemPosInicialX == elemento.imagemPosInicialXParado1)
            {
                setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXParado2; }, tempo)

            } else if (elemento.imagemPosInicialX == elemento.imagemPosInicialXParado2)
            {
                setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXParado3; }, tempo)

            } else if (elemento.imagemPosInicialX == elemento.imagemPosInicialXParado3)
            {
                setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXParado4; }, tempo)

            } else if (elemento.imagemPosInicialX == elemento.imagemPosInicialXParado4)
            {
                setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXParado1; }, tempo)

            }else
            {
                setTimeout(() => { elemento.imagemPosInicialX = elemento.imagemPosInicialXParado1; }, tempo)
            }

            //elemento.imagemPosInicialY:

            if (elemento.imagemPosInicialY == elemento.imagemPosInicialYParado1)
            {
                setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYParado2; }, tempo)


            } else if (elemento.imagemPosInicialY == elemento.imagemPosInicialYParado2)
            {
                setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYParado3; }, tempo)


            } else if (elemento.imagemPosInicialY == elemento.imagemPosInicialYParado3)
            {
                setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYParado4; }, tempo)


            } else if (elemento.imagemPosInicialY == elemento.imagemPosInicialYParado4)
            {
                setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYParado1; }, tempo)

            } else
            {
                setTimeout(() => { elemento.imagemPosInicialY = elemento.imagemPosInicialYParado1; }, tempo)

            }

            //elemento.imagemCorteLargura:

            if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraParado1 )
            {
                setTimeout(() => {elemento.imagemCorteLargura = elemento.imagemCorteLarguraParado2; }, tempo)

            } else if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraParado2)
            {
                setTimeout(() => {elemento.imagemCorteLargura = elemento.imagemCorteLarguraParado3; }, tempo)                

            } else if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraParado3)
            {
                setTimeout(() => {elemento.imagemCorteLargura = elemento.imagemCorteLarguraParado4; }, tempo)                

            } else if (elemento.imagemCorteLargura == elemento.imagemCorteLarguraParado4)
            {
                setTimeout(() => {elemento.imagemCorteLargura = elemento.imagemCorteLarguraParado1; }, tempo)                

            } else
            {
                setTimeout(() => {elemento.imagemCorteLargura = elemento.imagemCorteLarguraParado1; }, tempo)             
                
            }

            //elemento.imagemCorteAltura:

            if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaParado1)
            {
                setTimeout(() => {elemento.imagemCorteAltura = elemento.imagemCorteAlturaParado2; }, tempo)                

            } else if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaParado2)
            {
                setTimeout(() => {elemento.imagemCorteAltura = elemento.imagemCorteAlturaParado3; }, tempo)                

            } else if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaParado3)
            {
                setTimeout(() => {elemento.imagemCorteAltura = elemento.imagemCorteAlturaParado4; }, tempo)                

            } else if (elemento.imagemCorteAltura == elemento.imagemCorteAlturaParado4)
            {
                 setTimeout(() => {    elemento.imagemCorteAltura = elemento.imagemCorteAlturaParado1; }, tempo)            

            } else
            {
                setTimeout(() => {
                    elemento.imagemCorteAltura = elemento.imagemCorteAlturaParado1 ; }, tempo)                
            }
            break;

        case civil1:

            elemento.imagemPosInicialX = 6;
            elemento.imagemPosInicialY = 161;
            elemento.imagemCorteLargura = 36;
            elemento.imagemCorteAltura = 36;
            break;
        
            case civil2:

                elemento.imagemPosInicialX = 6;
                elemento.imagemPosInicialY = 161;
                elemento.imagemCorteLargura = 36;
                elemento.imagemCorteAltura = 36;
                break;
    
        default:

            break;
    }
}

//// AÇÕES DO PERSONAGEM:

// COMER:

function comer(comida)
{

    if (comida == "cochinha")
    {
        localStorage.fomeStatus = localStorage.fomeStatus - 30;
        if (localStorage.fomeStatus <= 0)
        {
            localStorage.fomeStatus = 0;
            barraFome.value = localStorage.fomeStatus;
        } else
        {
            barraFome.value = localStorage.fomeStatus;
        }
    } else
    {
        localStorage.fomeStatus = localStorage.fomeStatus - 10;
        barraFome.value = localStorage.fomeStatus;
    }
}

// BEBER:

function beber(bebida)
{

    if (bebida == "agua")
    {
        localStorage.sedeStatus = localStorage.sedeStatus - 30;
        if (localStorage.sedeStatus <= 0)
        {
            localStorage.sedeStatus = 0;
        } else
        {
            barraSede.value = localStorage.sedeStatus;
        }
    } else
    {
        localStorage.sedeStatus = localStorage.sedeStatus - 10;
        barraSede.value = localStorage.sedeStatus
    }
}

// USAR BANHEIRO:

function usarBanheiro()
{
    localStorage.banheiroStatus = localStorage.banheiroStatus - 30;

    if (localStorage.banheiroStatus <= 0)
    {
        localStorage.banheiroStatus = 0;
        barraBanheiro.value = localStorage.banheiroStatus;
    } else
    {
        barraBanheiro.value = localStorage.banheiroStatus;
    }
}

// TOMAR BANHO:

function tomarBanho()
{
    localStorage.higieneStatus = localStorage.higieneStatus - 30;

    if (localStorage.higieneStatus <= 0)
    {
        localStorage.higieneStatus = 0;
        barraHigiene.value = localStorage.higieneStatus;
    } else
    {
        barraHigiene.value = localStorage.higieneStatus;
    }
}

// DORMIR:

function dormir()
{
    localStorage.energiaStatus = localStorage.energiaStatus - 30;

    if (localStorage.energiaStatus <= 0)
    {
        localStorage.energiaStatus = 0;
        barraEnergia.value = localStorage.energiaStatus;
    } else
    {
        barraEnergia.value = localStorage.energiaStatus;
    }
}

// RELAXAR:

function relaxar()
{
    localStorage.estresseStatus = localStorage.estresseStatus - 30;

    if (localStorage.estresseStatus <= 0)
    {
        localStorage.estresseStatus = 0;
        barraEstresse.value = localStorage.estresseStatus;
    } else
    {
        barraEstresse.value = localStorage.estresseStatus;
    }
}

// CONVERSAR:

function conversar()
{
    localStorage.socialStatus = localStorage.socialStatus - 30;

    if (localStorage.socialStatus <= 0)
    {
        localStorage.socialStatus = 0;
        barraSocial.value = localStorage.socialStatus;
    } else
    {
        barraSocial.value = localStorage.socialStatus;
    }
}

// TOMAR REMEDIO:

function tomarRemedio()
{
    localStorage.saudeStatus = localStorage.saudeStatus - 30;

    if (localStorage.saudeStatus <= 0)
    {
        localStorage.saudeStatus = 0;
        barraSaude.value = localStorage.saudeStatus;
    } else
    {
        barraSaude.value = localStorage.saudeStatus;
    }
}

//////// DE REAÇÃO/ EVENTOS:

////  REAÇÕES DAS NECESSIDADES:

// FOME:

setTimeout(fome, 1000);

function fome()
{

    localStorage.fomeStatus = parseInt(localStorage.fomeStatus) + 1;

    if (localStorage.fomeStatus >= 100)
    {
        localStorage.fomeStatus = 100;
        barraFome.value = localStorage.fomeStatus;
    } else
    {
        barraFome.value = localStorage.fomeStatus;

    }

    setTimeout(fome, 1000);
}

// SEDE:

setTimeout(sede, 1000);

function sede()
{
    localStorage.sedeStatus = parseInt(localStorage.sedeStatus) + 1;

    if (localStorage.sedeStatus >= 100)
    {
        localStorage.sedeStatus = 100;
        barraSede.value = localStorage.sedeStatus;
    } else
    {
        barraSede.value = localStorage.sedeStatus;
    }

    setTimeout(sede, 1000);
}

// USAR BANHEIRO:

setTimeout(banheiro, 1000);

function banheiro()
{
    localStorage.banheiroStatus = parseInt(localStorage.banheiroStatus) + 1;

    if (localStorage.banheiroStatus >= 100)
    {
        localStorage.banheiroStatus = 100;
        barraBanheiro.value = localStorage.banheiroStatus;
    } else
    {
        barraBanheiro.value = localStorage.banheiroStatus;
    }

    setTimeout(banheiro, 1000);
}

// TOMAR BANHO:

setTimeout(higiene, 1000);

function higiene()
{
    localStorage.higieneStatus = parseInt(localStorage.higieneStatus) + 1;

    if (localStorage.higieneStatus >= 100)
    {
        localStorage.higieneStatus = 100;
        barraHigiene.value = localStorage.higieneStatus;
    } else
    {
        barraHigiene.value = localStorage.higieneStatus;
    }

    setTimeout(higiene, 1000);
}

// ENERGIA:

setTimeout(energia, 1000);

function energia()
{
    localStorage.energiaStatus = parseInt(localStorage.energiaStatus) + 1;

    if (localStorage.energiaStatus >= 100)
    {
        localStorage.energiaStatus = 100;
        barraEnergia.value = localStorage.energiaStatus;
    } else
    {
        barraEnergia.value = localStorage.energiaStatus;
    }

    setTimeout(energia, 1000);
}

// ESTRESSE:

setTimeout(estresse, 1000);

function estresse()
{
    localStorage.estresseStatus = parseInt(localStorage.estresseStatus) + 1;

    if (localStorage.estresseStatus >= 100)
    {
        localStorage.estresseStatus = 100;
        barraEstresse.value = localStorage.estresseStatus;
    } else
    {
        barraEstresse.value = localStorage.estresseStatus;
    }

    setTimeout(estresse, 1000);
}

// SOCIAL:

setTimeout(social, 1000);

function social()
{
    localStorage.socialStatus = parseInt(localStorage.socialStatus) + 1;

    if (localStorage.socialStatus >= 100)
    {
        localStorage.socialStatus = 100;
        barraSocial.value = localStorage.socialStatus;
    } else
    {
        barraSocial.value = localStorage.socialStatus;
    }

    setTimeout(social, 1000);
}

// SAUDE:

setTimeout(saude, 1000);

function saude()
{
    localStorage.saudeStatus = parseInt(localStorage.saudeStatus) + 1;

    if (localStorage.saudeStatus >= 100)
    {
        localStorage.saudeStatus = 100;
        barraSaude.value = localStorage.saudeStatus;
    } else
    {
        barraSaude.value = localStorage.saudeStatus;
    }

    setTimeout(saude, 1000);
}

//

function reiniciar()
{
    cidade1.imagem.posicaoXRecorte = 0;
    cidade1.imagem.posicaoYRecorte = 0;
    
    player1.posicaoX = parseInt(telaCanvasPrincipal.width/2);
    player1.posicaoY = parseInt(telaCanvasPrincipal.height/2);

    civil1.posicaoXAtual = civil1.posicaoXMorada;
    civil1.posicaoYAtual = civil1.posicaoYMorada;

    civil2.posicaoXAtual = civil2.posicaoXMorada;
    civil2.posicaoYAtual = civil2.posicaoYMorada ;
}

//

function patrulhar(elemento)
{

}

//

var cidade1 = new Cidade();

//LUGARES BLOQUEADOS:

var quarteirao1 = new Quarteirao(cidade1, 20, 20, 100, 100);
var quarteirao2 = new Quarteirao(cidade1, 320, 17, 180, 120);
var quarteirao3 = new Quarteirao(cidade1, 430, 310, 250, 100);

// LOCAIS DE INTERAÇÃO:

var portaCasa01 = new localDeInteracao(cidade1, (quarteirao3.posicaoX + 50), (quarteirao3.posicaoY + quarteirao3.altura), 50, 50);

///////////////////////////// ATRIBUIÇÃO DE METODOS DO SISTEMA NATIVO:

Storage.prototype.setObj = function (key, obj)
{
    return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function (key)
{
    return JSON.parse(this.getItem(key))
}

///////////////////////////// VARIAVEIS LOCAIS:

//DEFININDO NOME USUARIO:

if (localStorage.nome == "null" || localStorage.nome == null || localStorage.nome == "undefined" || localStorage.nome == undefined || localStorage.nome == "Sem Nome")
{
    var nomePrompt = prompt("Qual seu nome?");

    localStorage.setItem("nome", nomePrompt);

    if (localStorage.nome == "null" || localStorage.nome == "Sem nome")
    {
        localStorage.setItem("nome", "Sem Nome");
    } else
    {
        localStorage.setItem("nome", nomePrompt);
    }
}

// NECESSIDADES:

if (localStorage.primeiroAcesso == undefined)
{
    localStorage.fomeStatus = new Number();
    localStorage.sedeStatus = new Number();
    localStorage.banheiroStatus = new Number();
    localStorage.higieneStatus = new Number();
    localStorage.energiaStatus = new Number();
    localStorage.estresseStatus = new Number();
    localStorage.socialStatus = new Number();
    localStorage.saudeStatus = new Number();

    localStorage.primeiroAcesso = "Definido";
} else
{
    localStorage.primeiroAcesso = "Definido";
}

// SENTIMENTOS - EMOÇÃO:

var sentimentosBons = ['FELICIDADE', 'ALEGRIA', 'GRATIDÃO', 'ESPERANÇA', 'ANIMAÇÃO', 'EUFORIA', 'PAIXÃO', 'AUTOESTIMA ALTA', 'ADMIRAÇÃO', 'ADORAÇÃO', 'ALIVIO', 'EXCITAÇÃO', 'DESEJO', 'CURIOSIDADE', 'SURPRESA', 'ESPIRITUAL', 'SATIFAÇÃO', 'CALMA', 'CORAGEM', 'AMOR', 'CONFIANÇA', 'FORÇA', 'SAÚDAVEL', 'PAZ', 'CARIDADE', 'COMPREENSÃO', 'ENTUSIASMO', 'ORGULHO', 'PROSPERIDADE'];

var sentimentosRuins = ['LUTO', 'INGRATIDÃO', 'DEPRESSÃO', 'RAIVA', 'DESCONFIANÇA', 'MEDO', 'CIUMES', 'AUTOESTIMA BAIXA', 'APAVORAÇÃO', 'FRAQUEZA', 'INQUIETAÇÃO', 'FÚRIA', 'NEUROZE', 'DOR', 'LOUCURA', 'DESESPERO', 'ÓDIO', 'ARREPENDIMENTO', 'ANSIEDADE', 'CONFUSÃO', 'ESPANTO', 'INVEJA', 'HORROR', 'NOJO', 'TÉDIO', 'VIGANÇA', 'TRISTEZA', 'DECEPÇÃO', 'CARENCIA'];

localStorage.setObj('sentimentosBons', sentimentosBons);

localStorage.setObj('sentimentosRuins', sentimentosRuins);

// ITENS:

localStorage.dinheiro;
localStorage.celular;
localStorage.relogio;
localStorage.computador;

// DADOS:

localStorage.nome;
localStorage.generoSexo;
localStorage.idade;
localStorage.vivo;

// REGISTROS:

localStorage.dataAtual;
localStorage.horaAtual;
localStorage.dataCriação;
localStorage.horaCriação;
localStorage.primeiraAcao;
localStorage.ultimaAcao;
localStorage.acaoMaisUsada;
localStorage.acaoMenosUsada;
localStorage.sentimentoMaisUsado;
localStorage.sentimentoMenosUsado;
localStorage.alimentoMaisUsado;
localStorage.alimentoMenosUsado;

//

function atualizarPosicao(elemento, cidade)
{
    if (elemento)
    {
        switch (elemento)
        {
            case player1:

                elemento.posicaoXGlobal = cidade.imagem.posicaoX - cidade.imagem.posicaoXRecorte + elemento.posicaoX;
                elemento.posicaoYGlobal = cidade.imagem.posicaoY - cidade.imagem.posicaoYRecorte + elemento.posicaoY;
                break;

            case civil1:

                elemento.posicaoX = cidade.imagem.posicaoX - cidade.imagem.posicaoXRecorte + elemento.posicaoXAtual;
                elemento.posicaoY = cidade.imagem.posicaoY - cidade.imagem.posicaoYRecorte + elemento.posicaoYAtual;

                elemento.posicaoXFixo = cidade.imagem.posicaoX - cidade.imagem.posicaoXRecorte + elemento.posicaoXMorada;

                elemento.posicaoYFixo = cidade.imagem.posicaoY - cidade.imagem.posicaoYRecorte + elemento.posicaoYMorada;
                break;
            
                case civil2:

                    elemento.posicaoX = cidade.imagem.posicaoX - cidade.imagem.posicaoXRecorte + elemento.posicaoXAtual;
                    elemento.posicaoY = cidade.imagem.posicaoY - cidade.imagem.posicaoYRecorte + elemento.posicaoYAtual;
                
                    elemento.posicaoXFixo = cidade.imagem.posicaoX - cidade.imagem.posicaoXRecorte + elemento.posicaoXMorada;
    
                    elemento.posicaoYFixo = cidade.imagem.posicaoY - cidade.imagem.posicaoYRecorte + elemento.posicaoYMorada;
                    break;

            case cidade1:

                elemento.imagem.margemNorte = elemento.imagem.posicaoY - elemento.imagem.posicaoYRecorte;
                
                elemento.imagem.margemSul = elemento.imagem.posicaoY + elemento.imagem.height - elemento.imagem.posicaoYRecorte;
                
                elemento.imagem.margemLeste = elemento.imagem.posicaoX + elemento.imagem.width - elemento.imagem.posicaoXRecorte;
                
                elemento.imagem.margemOeste = elemento.imagem.posicaoX - elemento.imagem.posicaoXRecorte;

                break;

            default:

                break;
        }
    } else
    {
        //ATUALIZA POSIÇÕES PROIBIDAS:

        //QUARTEIRAO3:

        quarteirao3.posicaoX = cidade1.imagem.posicaoX - cidade1.imagem.posicaoXRecorte + quarteirao3.posicaoXAtual;
        quarteirao3.posicaoY = cidade1.imagem.posicaoY - cidade1.imagem.posicaoYRecorte + quarteirao3.posicaoYAtual;

        // PORTACASA1:

        portaCasa01.posicaoX = cidade1.imagem.posicaoX - cidade1.imagem.posicaoXRecorte + portaCasa01.posicaoXAtual;
        portaCasa01.posicaoY = cidade1.imagem.posicaoY - cidade1.imagem.posicaoYRecorte + portaCasa01.posicaoYAtual;
    }
}

function statusSistema()
{  
    status1.innerHTML = "player1.posicaoX: " + player1.posicaoX;
    status2.innerHTML = "player1.posicaoY: " + player1.posicaoY;
    status3.innerHTML = " civil2.posicaoXMorada: " + civil2.posicaoXMorada;
    status4.innerHTML = " civil2.posicaoYMorada: " + civil2.posicaoYMorada;
    status5.innerHTML = " controle1.teclaEPressionada: " + controle1.teclaEPressionada;
    status6.innerHTML = "  interacao(portaCasa01, player1): " +  interacao(portaCasa01, player1);
    status7.innerHTML = " civil2.posicaoX: " + civil2.posicaoX;
    status8.innerHTML = " civil2.posicaoY: " + civil2.posicaoY;
    status9.innerHTML = " civil2.posicaoXFixo: " + civil2.posicaoXFixo;
    status10.innerHTML = " civil2.posicaoYFixo: " + civil2.posicaoYFixo;
    status11.innerHTML = " civil2.posicaoXAtual: " + civil2.posicaoXAtual;
    status12.innerHTML = " civil2.posicaoYAtual: " + civil2.posicaoYAtual;
 
}

function alertaInimigo(player, civil)
{
    if ((player.posicaoX - civil.posicaoX) - (player.posicaoY - civil.posicaoY) >= -player.distanciaInimigo && (player.posicaoX - civil.posicaoX) - (player.posicaoY - civil.posicaoY) <= player.distanciaInimigo)
    {
        civil.emAlerta = true;

    } else
    {
        civil.emAlerta = false;
    }
}

//

function limparTela(canvas, contexto)
{
    // LIMPA A TELA
    // (POSICAO X, POSICAO Y, LARGURA, ALTURA)
    contexto.clearRect(0, 0, canvas.width, canvas.height);
}

//

function desenharCidade(contexto, cidade)
{
    // (URL IMAGEM, POSICAORECORTEINICIALX, POSICAORECORTEINICIALY, LARGURADORECORTE, ALTURADORECORTE, POSICAOIMAGEMX, POSICAOIMAGEMY, LARGURAIMAGEM, ALTURAIMAGEM))
    contexto.drawImage(cidade.imagem, cidade.imagem.posicaoXRecorte, cidade.imagem.posicaoYRecorte, cidade.imagem.larguraRecorte, cidade.imagem.alturaRecorte, cidade.imagem.posicaoX, cidade.imagem.posicaoY, cidade.imagem.largura, cidade.imagem.altura);
}

//

function atualizarSombras()
        {
            // SOMBRA HORINZONTAL:

            switch (incrementoSombra)
            {
                case 0.01:
                    sombraHorizontal += incrementoSombra;

                    if (sombraHorizontal >= 20)
                    {
                        incrementoSombra = -0.01;
                    }
                    break;
                case -0.01:
                    sombraHorizontal += incrementoSombra;

                    if (sombraHorizontal <= -20)
                    {
                        incrementoSombra = 0.01;
                    }
                    break;

                default:
                    incrementoSombra = 0.01;
                    break;
            }
    
        //DEIXA O FUNDO DOS DESENHOS TRANSPARENTE:
        contextoTelaCanvasPrincipal.fillStyle = "rgba(0,0,0,0.0)";

        // SOMBREAMENTO DE ELEMENTOS:
        // COR DA SOMBRA
        contextoTelaCanvasPrincipal.shadowColor = 'rgba(0, 0, 0, 0.5)';

        // BLUR
        contextoTelaCanvasPrincipal.shadowBlur = 10;

        // DESLOCAMENTO DA SOMBRA NA POSIÇÃOX
        contextoTelaCanvasPrincipal.shadowOffsetX = sombraHorizontal;

        // DESLOCAMENTO DA SOMBRA NA POSIÇÃOY
        contextoTelaCanvasPrincipal.shadowOffsetY = sombraVertical;
}
        
        //

function movimentosPlayer()
{
    //  MOVIMENTAR JOGADOR CIMA / BAIXO ********************************************************************
    // SE PRESSIONOU UMA TECLA
    if (controle1.teclaSetaParaCimaPressionada != controle1.teclaSetaParaBaixoPressionada)
    {
        // TECLA PARA CIMA
        if (controle1.teclaSetaParaCimaPressionada)
        {
            // SE A POSICAO Y É MAIOR QUE ZERO '0'
            if (player1.posicaoY >= 0)
            {
                // MOVE PARA CIMA
                //   player1.posicaoY -= player1.velocidade;             

                if (quarteiraoEmBaixo(quarteirao3, player1))
                {
                    // NÃO FAZ NADA
                } else
                {
                    player1.posicaoY -= player1.velocidade;
                }

                imagensCorrendoParaCima(player1);

            } else
            {
                //MOVE MAPA PARA CIMA SE POSICAO Y DA IMAGEM É MAIOR QUE ZERO '0':

                if (cidade1.imagem.posicaoYRecorte <= 0)
                {
                    cidade1.imagem.posicaoYRecorte = cidade1.imagem.posicaoYRecorte;
                } else
                {
                    cidade1.imagem.posicaoYRecorte -= player1.velocidade;

                    imagensCorrendoParaCima(player1);
                }
            }
        }
        else
        // SE TECLA PARA BAIXO PRESSIONADA:
        {
            // SE O PLAYER NAO ULTRAPASSA A TELA DO CANVAS:
            if (player1.posicaoY <= (telaCanvasPrincipal.height - player1.altura))
            {
                // MOVE PARA BAIXO

                if (quarteiraoEmCima(quarteirao3, player1))
                {
                    // NÃO FAZ NADA
                } else
                {
                    player1.posicaoY += player1.velocidade;
                }

                imagensCorrendoParaBaixo(player1);

            } else
            {
                //MOVENDO MAPA PARA BAIXAO - POSICAO Y:

                if (cidade1.imagem.posicaoYRecorte >= cidade1.imagem.height - telaCanvasPrincipal.height)
                {
                    cidade1.imagem.posicaoYRecorte = cidade1.imagem.posicaoYRecorte;
                } else
                {
                    cidade1.imagem.posicaoYRecorte += player1.velocidade;

                    imagensCorrendoParaBaixo(player1);
                }
            }
        }
    } else
    {
        if (controle1.teclaSetaParaDireitaPressionada == controle1.teclaSetaParaEsquerdaPressionada)
        {
         //   imagemParado(player1,imagensTempo);
        }
    }

    //  MOVIMENTAR JOGADOR ESQUERDA / DIREITA ********************************************************************

    if (controle1.teclaSetaParaDireitaPressionada != controle1.teclaSetaParaEsquerdaPressionada)
    {
        // TECLA PARA DIREITA PRESSIONADA
        if (controle1.teclaSetaParaDireitaPressionada)
        {
            // SE O PLAYER NAO SAIR DA TELA DO CANVAS

            if (player1.posicaoX <= telaCanvasPrincipal.width - player1.largura)
            {

                if (quarteiraoEsquerda(quarteirao3, player1))
                {
                    // NÃO FAZ NADA
                } else
                {
                    player1.posicaoX += player1.velocidade;
                }

                imagensCorrendoDireita(player1);

            } else
            {
                //ALTERANDO O MAPA POSICAO X:

                if (cidade1.imagem.posicaoXRecorte >= cidade1.imagem.width - telaCanvasPrincipal.width)
                {
                    cidade1.imagem.posicaoXRecorte = cidade1.imagem.posicaoXRecorte;
                } else
                {
                    cidade1.imagem.posicaoXRecorte += player1.velocidade;
                    
                    imagensCorrendoDireita(player1);
                }
            }

        } else
        // se for para esquerda
        {
            // se a bola não saiu da tela
            if (player1.posicaoX >= 0)
            {
                // muda posição

                if (quarteiraoDireita(quarteirao3, player1))
                {
                    // NÃO FAZ NADA
                } else
                {
                    player1.posicaoX -= player1.velocidade;
                }

                imagensCorrendoEsquerda(player1);

            } else
            {
                //MOVENDO MAPA POSICAO -X:

                if (cidade1.imagem.posicaoXRecorte <= 0)
                {
                    cidade1.imagem.posicaoXRecorte = cidade1.imagem.posicaoXRecorte;
                } else
                {
                    cidade1.imagem.posicaoXRecorte -= player1.velocidade;
                    
                    imagensCorrendoEsquerda(player1);
                }
            }
        }
    } else
    {
        if (controle1.teclaSetaParaCimaPressionada == controle1.teclaSetaParaBaixoPressionada)
        {
            imagemParado(player1,770);
        }
    }
}

//

function elementoEmAlerta(elemento,player)
{
     // SE loopAlerta TRUE:
     if (loopAlerta)
     {
         // INIMIGO EM ALERTA:
         
         if (elemento.emAlerta)
         {
             // SE ELEMENTO ESTIVER A DIREITA E ABAIXO DO ALVO:
             if (elemento.posicaoX > player.posicaoX && elemento.posicaoY > player.posicaoY)
             {
                 elemento.direcaoY = -1;
                 elemento.direcaoX = -1;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoEsquerda(elemento);
             }
             // SE ELEMENTO ESTIVER A DIREITA E ACIMA DO ALVO:
             else if (elemento.posicaoX > player.posicaoX && elemento.posicaoY < player.posicaoY)
             {
                 elemento.direcaoY = 1;
                 elemento.direcaoX = -1;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoParaBaixo(elemento);
             }
             // SE ELEMENTO ESTIVER A ESQUERDA E ACIMA DO ALVO:
             else if (elemento.posicaoX < player.posicaoX && elemento.posicaoY < player.posicaoY)
             {
                 elemento.direcaoY = 1;
                 elemento.direcaoX = 1;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoParaBaixo(elemento);
             }
             // SE ELEMENTO ESTIVER A ESQUERDA E ABAIXO DO ALVO:
             else if (elemento.posicaoX < player.posicaoX && elemento.posicaoY > player.posicaoY)
             {
                 elemento.direcaoY = -1;
                 elemento.direcaoX = 1;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoDireita(elemento);
             }
             // SE ELEMENTO ESTIVER A DIREITA E Y É IGUAL AO ALVO:
             else if (elemento.posicaoX > player.posicaoX && elemento.posicaoY == player.posicaoY)
             {
                 elemento.direcaoY = 0;
                 elemento.direcaoX = -1;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoEsquerda(elemento);

             }
             // SE ELEMENTO ESTIVER A ESQUERDA E Y É IGUAL AO ALVO:
             else if (elemento.posicaoX < player.posicaoX && elemento.posicaoY == player.posicaoY)
             {
                 elemento.direcaoY = 0;
                 elemento.direcaoX = 1;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoDireita(elemento);
             }
             // SE ELEMENTO ESTIVER ABAIXO E X É IGUAL AO ALVO:
             else if (elemento.posicaoX == player.posicaoX && elemento.posicaoY > player.posicaoY)
             {
                 elemento.direcaoY = -1;
                 elemento.direcaoX = 0;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoParaCima(elemento);
             }
             // SE ELEMENTO ESTIVER ACIMA E X É IGUAL AO ALVO:
             else if (elemento.posicaoX == player.posicaoX && elemento.posicaoY < player.posicaoY)
             {
                 elemento.direcaoY = 1;
                 elemento.direcaoX = 0;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoParaBaixo(elemento);

             } else if (elemento.posicaoX == player.posicaoX && elemento.posicaoY == player.posicaoY)
             {
                 elemento.direcaoY = 0;
                 elemento.direcaoX = 0;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 alert("Você Perdeu " + localStorage.nome + "!!! Tente Outra Vez!");
                 var confirma = confirm("Você aceita que perdeu pra mim? kkkkkkk")

                 if (confirma)
                 {
                     alert("Oxen... Cade " + localStorage.nome + " que nunca perde? kkk")
                 } else
                 {
                     alert(localStorage.nome + ", nunca aceita que perdeu!!! kkkkkkkk")
                 }
                 reiniciar();
             }
            // SE NÃO ESTIVER EM NENHUMA DAS CONDIÇÕES DE POSIÇÃO:
             else
             {
                 //NÃO FAZ NADA
             }

             ////SE NAO ESTIVER EM ALERTA:
         } else
         {
             // SE ELEMENTO ESTIVER A DIREITA E ABAIXO DO ALVO:
             if (elemento.posicaoX > elemento.posicaoXFixo && elemento.posicaoY > elemento.posicaoYFixo)
             {
                 elemento.direcaoY = -1;
                 elemento.direcaoX = -1;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoEsquerda(elemento);
             }
             // SE ELEMENTO ESTIVER A DIREITA E ACIMA DO ALVO:
             else if (elemento.posicaoX > elemento.posicaoXFixo && elemento.posicaoY < elemento.posicaoYFixo)
             {
                 elemento.direcaoY = 1;
                 elemento.direcaoX = -1;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoParaBaixo(elemento);
             }
             // SE ELEMENTO ESTIVER A ESQUERDA E ACIMA DO ALVO:
             else if (elemento.posicaoX < elemento.posicaoXFixo && elemento.posicaoY < elemento.posicaoYFixo)
             {
                 elemento.direcaoY = 1;
                 elemento.direcaoX = 1;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoParaBaixo(elemento);
             }
             // SE ELEMENTO ESTIVER A ESQUERDA E ABAIXO DO ALVO:
             else if (elemento.posicaoX < elemento.posicaoXFixo && elemento.posicaoY > elemento.posicaoYFixo)
             {
                 elemento.direcaoY = -1;
                 elemento.direcaoX = 1;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoDireita(elemento);
             }
             // SE ELEMENTO ESTIVER A DIREITA E Y É IGUAL AO ALVO:
             else if (elemento.posicaoX > elemento.posicaoXFixo && elemento.posicaoY == elemento.posicaoYFixo)
             {
                 elemento.direcaoY = 0;
                 elemento.direcaoX = -1;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoEsquerda(elemento);

             }
             // SE ELEMENTO ESTIVER A ESQUERDA E Y É IGUAL AO ALVO:
             else if (elemento.posicaoX < elemento.posicaoXFixo && elemento.posicaoY == elemento.posicaoYFixo)
             {
                 elemento.direcaoY = 0;
                 elemento.direcaoX = 1;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoDireita(elemento);
             }
             // SE ELEMENTO ESTIVER ABAIXO E X É IGUAL AO ALVO:
             else if (elemento.posicaoX == elemento.posicaoXFixo && elemento.posicaoY > elemento.posicaoYFixo)
             {
                 elemento.direcaoY = -1;
                 elemento.direcaoX = 0;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoParaCima(elemento);
             }
             // SE ELEMENTO ESTIVER ACIMA E X É IGUAL AO ALVO:
             else if (elemento.posicaoX == elemento.posicaoXFixo && elemento.posicaoY < elemento.posicaoYFixo)
             {
                 elemento.direcaoY = 1;
                 elemento.direcaoX = 0;
                 elemento.posicaoXAtual += elemento.direcaoX;
                 elemento.posicaoYAtual += elemento.direcaoY;

                 imagensCorrendoParaBaixo(elemento);

             } else if (elemento.posicaoX == elemento.posicaoXFixo && elemento.posicaoY == elemento.posicaoYFixo)
             {
                 imagemParado(elemento,imagensTempo);

                 patrulhar(elemento);

             }
             // SE NÃO ESTIVER EM NENHUMA DAS CONDIÇÕES DE POSIÇÃO:
             else
             {
                 //NÃO FAZ NADA
             }
         }

         //SE loopAlerta É FALSE:
     } else
     {
         status12.innerHTML = "loopAlerta Desligado!"
     }
}

//

function desenharImagensElemento(contexto, player)
{  
    contexto.drawImage(player.imagem, player.imagemPosInicialX, player.imagemPosInicialY, player.imagemCorteLargura, player.imagemCorteAltura, player.posicaoX, player.posicaoY, player.largura, player.altura);
}

//

function recarregarPagina()
{
    if (imagemCarregada)
    {
        if (paginaRecarregada >= 1)
        {

        } else
        {
            document.location.reload(false);
        }
    } else
    {
        // status12.innerHTML = "Aguarde... " + imagemCarregada + " - " + paginaRecarregada;
    }
}

//INSTANCIAS:

var controle1 = new Controle(87, 83, 68, 65, 69);

var player1 = new Player(cidade1);

var civil1 = new Civil(cidade1);

var civil2 = new Civil(cidade1);

//

/*
    function irParaCima()
    {
        if (player1.posicaoY > 0)
        { // se a bola nçao sair da tela
            player1.posicaoY -= player1.velocidade; // muda posição do jogador
        }
    }

    function irParaBaixo()
    {
        // se for para baixo
        if (player1.posicaoY < (canvas1.canvas.height - player1.altura))
        { // se a bola não saiu da tela
            player1.posicaoY += player1.velocidade; // muda posição
        }
    }

//////////////////// RASCUNHOS:

// Obtém a data/hora atual
var data = new Date();

// Guarda cada pedaço em uma variável
var dia     = data.getDate();           // 1-31
var dia_sem = data.getDay();            // 0-6 (zero=domingo)
var mes     = data.getMonth();          // 0-11 (zero=janeiro)
var ano2    = data.getYear();           // 2 dígitos
var ano4    = data.getFullYear();       // 4 dígitos
var hora    = data.getHours();          // 0-23
var min     = data.getMinutes();        // 0-59
var seg     = data.getSeconds();        // 0-59
var mseg    = data.getMilliseconds();   // 0-999
var tz      = data.getTimezoneOffset(); // em minutos

// Formata a data e a hora (note o mês + 1)
var str_data = dia + '/' + (mes+1) + '/' + ano4;
var str_hora = hora + ':' + min + ':' + seg;

// Mostra o resultado
alert('Hoje é ' + str_data + ' às ' + str_hora);

//////////////////////


var secaoPingPong = document.getElementById('secaoCanvas');

function abrirSecaoPingPong()
{
    var style = window.getComputedStyle(secaoPingPong);
    var top = style.getPropertyValue('display');

    if (top == "none")    
    {
        secaoPingPong.style.display = 'flex';
    } else
    {
        secaoPingPong.style.display = 'none';
    }
}
*/

/* CANVAS
 /*
 
    // LIMPA A AREA ESPECIFICADA DO DESENHO
    // (POSICAO X, POSICAO Y, LARGURA, ALTURA)
    contextoTelaCanvasPrincipal.clearRect(0, 0, telaCanvasPrincipal.width, telaCanvasPrincipal.height);

    // LIMPA A TELA OESTE
    // (POSICAO X, POSICAO Y, LARGURA, ALTURA)
    contextoTelaCanvasOeste.clearRect(0, 0, telaCanvasOeste.width, telaCanvasOeste.height);
    
        //CANVAS OESTE:
    
        contextoTelaCanvasOeste.beginPath();
    
        contextoTelaCanvasOeste.fillStyle = "rgba(0,0,0,1)";
        contextoTelaCanvasOeste.moveTo(10, 10);
    
        contextoTelaCanvasOeste.lineTo(10, telaCanvasOeste.height - 10)
    
        contextoTelaCanvasOeste.lineTo(telaCanvasOeste.width - 10, telaCanvasOeste.height - 10)
    
        contextoTelaCanvasOeste.lineTo(telaCanvasOeste.width - 10, 10)
    
        contextoTelaCanvasOeste.stroke();
        contextoTelaCanvasOeste.fill();
    
        contextoTelaCanvasOeste.closePath();
    
        contextoTelaCanvasOeste.fillStyle = "rgba(0,255,255,1";
    
        if (y1 >= telaCanvasOeste.height - 20)
        {
            direcaoX = -1;
    
        } else if (y1 <= 20)
        {
            direcaoX = 1;
    
        } else
        {
            direcaoX = direcaoX;
        }
    
        y1 += direcaoX;
    
        contextoTelaCanvasOeste.fillRect(x1, y1, telaCanvasOeste.width / 2, 50);
    
    
        //CANVAS LESTE:
    
        contextoTelaCanvasLeste.beginPath();
    
        contextoTelaCanvasLeste.fillStyle = "rgba(0,0,0,1)";
        contextoTelaCanvasLeste.moveTo(10, 10);
    
        contextoTelaCanvasLeste.lineTo(10, telaCanvasLeste.height - 10)
    
        contextoTelaCanvasLeste.lineTo(telaCanvasLeste.width - 10, telaCanvasLeste.height - 10)
    
        contextoTelaCanvasLeste.lineTo(telaCanvasLeste.width - 10, 10)
    
        contextoTelaCanvasLeste.stroke();
        contextoTelaCanvasLeste.fill();
    
        contextoTelaCanvasLeste.closePath();
    
        contextoTelaCanvasLeste.fillStyle = "rgba(0,255,255,1)";
    
        if (y1 >= telaCanvasLeste.height - 20)
        {
            direcaoX = -1;
    
        } else if (y1 <= 20)
        {
            direcaoX = 1;
    
        } else
        {
            direcaoX = direcaoX;
        }
    
        y1 += direcaoX;
    
        contextoTelaCanvasLeste.fillRect(x1, y1, telaCanvasLeste.width / 2, 50);
    */


        // FINALIZAR PREENCHENDO O DESENHO COM O ESTILO PASSADO ANTERIORMENTE DO RETANGULO 2: 
        //contextoTelaCanvasPrincipal.fill();


        
        //// DESENHANDO LINHAS:

        // DEFINE A LARGURA DE LINHA:
        //contextoTelaCanvasPrincipal.lineWidth = 3;

        
        // LINHAS EM CURVA:
        /*
            contextoTelaCanvasPrincipal.beginPath();
            contextoTelaCanvasPrincipal.moveTo(0, 0);
            contextoTelaCanvasPrincipal.quadraticCurveTo(250, 500, 500, 0);
            contextoTelaCanvasPrincipal.stroke();
            contextoTelaCanvasPrincipal.closePath();    
        */

        /*
        // USANDO UMA IMAGEM COMO PREENCHIMENTO DO DESENHO:
        // var estiloImagem = contextoTelaCanvasPrincipal.createPattern(imagem, "no-repeat");
        // "repeat" (ambas direcoes)
        // "repeat-x" (somente na horizontal)
        // "repeat-y" (somente verticais)
        // "no-repeat" (nenhuma direção)
     
        //USANDO A IMAGEM PARA PREENCHIMENTO DO DESENHO:
        // contextoTelaCanvasPrincipal.fillStyle = estiloImagem;
     
        // DESENHA A IMAGEM NA POSIÇÃO DESEJADA
        // (URL IMAGEM, POSICAO X, POSICAO Y, LARGURA, ALTURA))
        //contextoTelaCanvasPrincipal.drawImage(imagem, 0, 0, 500, 500);
     
        // SOBREPOSIÇÃO DO METODO:
        // PODE RECORTAR A IMAGEM 
        // (URL IMAGEM, POSICAORECORTEINICIALX, POSICAORECORTEINICIALY, LARGURADORECORTE, ALTURADORECORTE, POSICAOIMAGEMX, POSICAOIMAGEMY, LARGURAIMAGEM, ALTURAIMAGEM))
        contextoTelaCanvasPrincipal.drawImage(imagem, 50, 0, 50, 50, 150, 50, 50, 50);
     
        ////DESENHANDO RETANGULOS:
     
        ////DESENHANDO UM RETANGULO - RETANGULO 1
     
        // DEFINE A COR DO PREENCHIMENTO 
        contextoTelaCanvasPrincipal.fillStyle = "rgb(000,00,100)";
     
        // DESENHA RETANGULO - (POSICAO X, POSICAO Y, LARGURA, ALTURA)
        contextoTelaCanvasPrincipal.fillRect(0, 0, 100, 200);
     
        //FINALIZAR PREENCHENDO O DESENHO COM O ESTILO PASSADO ANTERIORMENTE DO RETANGULO 1: 
        //contextoTelaCanvasPrincipal.fill();
     
        // LIMPA A AREA DE DESENHO - (POSICAO X, POSICAO Y, LARGURA, ALTURA)
        contextoTelaCanvasPrincipal.clearRect(10, 10, 40, 40);
     
        //// RETANGULO 2 - PLAYER 1:
     
        // USANDO TRANSPARENCIA RGBA COMO PREENCHIMENTO
        contextoTelaCanvasPrincipal.fillStyle = "rgba(000,200,200,0.5)";
     
        */

        // INSERINDO TEXTOS:
        /*
     
        // TAMANHO E FONT
        contextoTelaCanvasPrincipal.font = "20px Comic Sans MS";
        
        // ALINHAMENTO
        contextoTelaCanvasPrincipal.textAlign = "center";
     
        // COR
        contextoTelaCanvasPrincipal.fillStyle = "blue";
     
        //BORDA
        // (TEXTO, POSIÇÃOX, POSIÇÃOY, TAMANHOMAXIMODOTEXTO*OPCIONAL)
        contextoTelaCanvasPrincipal.strokeText("Paulo de Tasso",10,100,100)
        contextoTelaCanvasPrincipal.strokeText("Paulo de Tasso",10,100)
     
        //PREENCHIMENTO DO TEXTO
        // (TEXTO, POSIÇÃOX, POSIÇÃOY, TAMANHOMAXIMODOTEXTO*OPCIONAL)
        contextoTelaCanvasPrincipal.fillText("Paulo de Tasso", 250, 20,100);  
        contextoTelaCanvasPrincipal.fillText("Paulo de Tasso", 250, 20);  
     
        */

        //IMAGENS: 

        //var estiloImagem = contextoTelaCanvasPrincipal.createPattern(imagem, "no-repeat")

        //contextoTelaCanvasPrincipal.fillStyle = estiloImagem;

        // (URL IMAGEM, POSICAORECORTEINICIALX, POSICAORECORTEINICIALY, LARGURADORECORTE, ALTURADORECORTE, POSICAOIMAGEMX, POSICAOIMAGEMY, LARGURAIMAGEM, ALTURAIMAGEM))
        //contextoTelaCanvasPrincipal.drawImage(imagem, 50, 0, 50, 50, 150, 50, 50, 50);

        //DEIXA O FUNDO DOS DESENHOS TRANSPARENTE:
        //var estiloImagem = contextoTelaCanvasPrincipal.createPattern(imagemEmBranco, "repeat")
        //contextoTelaCanvasPrincipal.fillStyle = estiloImagem;

        //

        /*
        // DEFINE O ESTILO/COR DA LINHA:
        contextoTelaCanvasPrincipal.strokeStyle = "rgb(200,200,0)";
        
        // COMEÇA MOVENDO O PONTO DE DESENHO DE LINHA NA POSSIÇÃO - (POSICAO X, POSICAO Y)
        contextoTelaCanvasPrincipal.moveTo(300, 300);
     
        // FINALIZAR O DESENHO DE LINHA NESSA POSIÇÃO - (POSICAO X, POSICAO Y)
        contextoTelaCanvasPrincipal.lineTo(400, 400);
     
        // DESENHA UMA NOVA LINHA A PARTIR DA ULTIMA POSIÇÃO DESENHADA E FINALIZA A LINHA NAS NOVAS POSIÇÕES PASSADAS 
        contextoTelaCanvasPrincipal.lineTo(400, 450);
     
        // DESENHA MAIS UMA NOVA LINHA A PARTIR DA ULTIMA POSIÇÃO
        contextoTelaCanvasPrincipal.lineTo(300, 450);
     
        // FECHA O DESENHO DE LINHA NA MESMA POSIÇÃO DE INICIO
        contextoTelaCanvasPrincipal.lineTo(300, 300);
     
        // AGORA MOVE O PONTO, A POSIÇÃO DE INICIO DE DESENHO DE LINHA PARA OUTRA POSIÇÃO, SEM SER A ULTIMA POSIÇÃO:
        contextoTelaCanvasPrincipal.moveTo(400, 470);
     
        // E AGORA FINALIZAR O DESENHO DE LINHA NESSA NOVA POSIÇÃO:
        contextoTelaCanvasPrincipal.lineTo(450, 470);
     
        // DESENHA UM RETANGULO DE LINHA
        // (USADO MAIS COMO CONTORNO DE PREENCHIMENTOS)
        // (POSICAO X, POSICAO Y, LARGURA, ALTURA)
        contextoTelaCanvasPrincipal.strokeRect(150, 150, 100, 100);
     
        //MOVE A POSIÇÃO DE INICIO DE DESENHO DE LINHA
        contextoTelaCanvasPrincipal.moveTo(350, 100);
     
        // DESENHA UM CIRCULO:
        // (POSICAO X, POSICAO Y, RAIO, ANGULO INICIAL, ANGULO FINAL, SENTIDO)
        // SENTIDO = TRUE (SENTIDO HORÁRIO / = FALSE (SENTIDO ANTI HORARIO)
        contextoTelaCanvasPrincipal.arc(circuloPosicaoX, circuloPosicaoY, circuloTamanho, anguloInicial, anguloFinal, sentidoCirculo);
     
        // FINALIZAR PREENCHENDO O DESENHO COM O ESTILO PASSADO ANTERIORMENTE
        contextoTelaCanvasPrincipal.fill();
     
        //beginPath - INICIA UM NOVO DESENHO
        //contextoTelaCanvasPrincipal.beginPath();
     
        //closePath - FINALIZA O DESENHO
        //contextoTelaCanvasPrincipal.closePath();
     
        //DESENHA CIRCULOS POR ANIMAÇÕES - COM POSIÇÕES, TAMANHOS, CORES VARIADAS
        function gerarCirculosAleatorios()
        {
            for (var i = 0; i < 10; i++)
            {
                contextoTelaCanvasPrincipal.beginPath();
                contextoTelaCanvasPrincipal.fillStyle = 'rgb(' + Math.random() * 255 + ',' + Math.random() * 255 + ',' + Math.random() * 255 + ")";
                contextoTelaCanvasPrincipal.arc(Math.random() * 500, Math.random() * 500, Math.random() * circuloTamanho, anguloInicial, anguloFinal, sentidoCirculo);
                contextoTelaCanvasPrincipal.fill();
            }
        }
     
        //MOVE O PONTO DE DESENHO PARA ESSA POSIÇÃO
        contextoTelaCanvasPrincipal.moveTo(10, 400);
     
        //CRIA UM ARCO ONDE (POSICÃOX-INICIAL, POSIÇÃOY-INICIAL, POSICÃOX-FINAL, POSIÇÃOY-FINAL, RAIO)
        contextoTelaCanvasPrincipal.arcTo(50, 400, 50, 0, 50);
     
     
        // REDENRIZA/ CONTORNA OS DESENHOS FEITOS DE LINHA:
        contextoTelaCanvasPrincipal.stroke();
     
        // DEFINE OUTRA FORMA DE PREENCHIMENTO, USANDO UMA IMAGEM
        var estiloImagem = contextoTelaCanvasPrincipal.createPattern(imagem, "repeat");
     
        contextoTelaCanvasPrincipal.fillStyle = estiloImagem;
     
        // PREENCHE OS DESENHOS FEITOS COM O ULTIMO ESTILO DE COR DEFINIDO
        contextoTelaCanvasPrincipal.fill();
        
        */