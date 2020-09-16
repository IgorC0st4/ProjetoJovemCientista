import { Component, OnInit } from '@angular/core';
import { MbscTimerOptions } from '@mobiscroll/angular';

@Component({
  selector: 'app-fase',
  templateUrl: './fase.page.html',
  styleUrls: ['./fase.page.scss'],
})
export class FasePage implements OnInit {

  // Contador da fase atual
  contador_fase: number = 1;

  // Array em que os dados da fase ficam armazenados
  // (Cor e imagem de cada bloco)
  dados_linhas: any[] = [];

  // Classes css com os diferentes fundos que pode ser
  // utilizados
  classes_css: string[] = [
    'fundo-azul',
    'fundo-verde',
    'fundo-amarelo',
    'fundo-vermelho',
    'fundo-braco',
    'fundo-rosa',
    'fundo-preto',
    'fundo-cinza',
    'fundo-laranja'
  ]

  // Url das imagens que vão ser utilizadas no jogo
  imgs: string[] = [
    '../../assets/imgs/desenhos/bracos-levantados.png',
    '../../assets/imgs/desenhos/pulando-bracos-baixos.png'
  ];

  // Imagens que o jogador deve buscar na fase
  imgs_fase: any[] = [];

  constructor() {
  }

  ngOnInit() {
    // Inicializa o jogo pela primeira vez
    this.inicializarJogo();
  }

  // Inicializa cada fase com as imagens e cores
  // de cada bloco
  inicializarJogo() {
    this.inicializarImagensFase();

    this.inicializarTabuleiro();
  }

  inicializarImagensFase() {
    this.imgs_fase = [];
    for (var i = 0; i < this.contador_fase; i++) {
      this.imgs_fase.push(this.imgs[this.gerarNumeroAleatorio(2)]);
    }
  }

  inicializarTabuleiro() {
    // Limpa o array de dados
    this.dados_linhas = [];
    // Array com os dados de uma linha de blocos
    var dados_linha: any[] = [];
    for (var i = 0; i < 5; i++) {
      // Limpa o array de linhas
      dados_linha = [];
      for (var j = 0; j < 5; j++) {
        // Variável de cada bloco
        // Possui a imagem e a classe css
        var col = {
          'classe': this.classes_css[this.gerarNumeroAleatorio(9)],
          'img': this.imgs[this.gerarNumeroAleatorio(2)]
        }
        //Adiciona a coluna para a linha
        dados_linha.push(col);
      }
      // Adiciona a linha para o array de dados
      // da tabela
      this.dados_linhas.push(dados_linha);
    }
  }

  // Gera uma número aleatório que será utilizado
  // para determinar a imagem e a cor de cada bloco
  gerarNumeroAleatorio(limite: number) {
    return Math.floor((Math.random() * limite));
  }

  // Chama a próxima fase
  proximaFase() {
    if (this.contador_fase == 7) {
      alert('Fim do jogo');
    } else {
      // Aumenta o número da fase
      this.contador_fase++;
      // Inicializa a nova fase
      this.inicializarJogo();
    }
  }

}
