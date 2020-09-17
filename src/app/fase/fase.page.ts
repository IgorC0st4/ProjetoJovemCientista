import { ResultadoModalPage } from './../resultado-modal/resultado-modal.page';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

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
    'fundo-branco',
    'fundo-rosa',
    'fundo-marrom',
    'fundo-cinza',
    'fundo-laranja'
  ]
  // Url das imagens que vão ser utilizadas no jogo
  imgs: string[] = [
    '../../assets/imgs/desenhos/andando-direita.png',
    '../../assets/imgs/desenhos/andando-esquerda.png',
    '../../assets/imgs/desenhos/bracos-lado-cima-direita.png',
    '../../assets/imgs/desenhos/bracos-lado-cima-esquerda.png',
    '../../assets/imgs/desenhos/bracos-levantados.png',
    '../../assets/imgs/desenhos/pulando-bracos-baixos.png',
    '../../assets/imgs/desenhos/pulando-bracos-cima.png'
  ];
  // Imagens que o jogador deve buscar na fase
  imgs_fase: any[] = [];
  // Quando o contador de tempo foi iniciado
  public tempo_inicial = null
  // Quando o contador de tempo foi parado
  public tempo_parado: any = null
  // O tempo que o contador ficou parado
  public duracao_parada: any = 0
  // Se o contador de tempo foi iniciado
  public iniciado = null
  // Se o tempo está passando (jogo ativo)
  public contando = false
  // Modelo de tempo inicial
  public modelo_tempo = "00:00"
  // Tempo transcorrido na fase
  public tempo = "00:00"
  // Tempos das fases
  tempos: any[] = [];
  // Quantas imagens foram encontradas na fase
  imagens_encontradas: number = 0;
  // Se o jogador encontrou todas as imagens 
  // para ir para a próxima fase
  pode_continuar = false;

  constructor(public modalController: ModalController) {
  }

  ngOnInit() {
    // Inicializa o jogo pela primeira vez
    this.inicializarJogo();
  }

  // Inicializa cada fase com as imagens e cores
  // de cada bloco
  inicializarJogo() {
    this.pode_continuar = false;
    this.imagens_encontradas = 0;
    this.inicializarTabuleiro();
    this.inicializarImagensFase();
    this.start()
  }

  inicializarImagensFase() {
    this.imgs_fase = [];
    for (var i = 0; i < this.contador_fase; i++) {
      var linha = this.dados_linhas[this.gerarNumeroAleatorio(5)];
      this.imgs_fase.push(linha[this.gerarNumeroAleatorio(5)]);
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
          'img': this.imgs[this.gerarNumeroAleatorio(7)]
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

  // Verifica se o bloco que foi clicado é uma das imagens
  // a ser procurada
  async testarBlocoSelecionado(img) {
    if (this.imgs_fase.find(item => (item.img === img.img && item.classe === img.classe))) {
      this.imagens_encontradas++;
      const index = this.imgs_fase.indexOf(img);
      if (index > -1) {
        this.imgs_fase.splice(index, 1);
      }
      if (this.imagens_encontradas == this.contador_fase) {
        this.pode_continuar = true;
      }
    } else {

    }
  }

  // Chama a próxima fase
  proximaFase() {
    // Para o tempo transcorrido na fase
    this.stop();
    var tempoFase = {
      'fase': this.contador_fase,
      'tempo': this.tempo
    }
    this.tempos.push(tempoFase);
    if (this.contador_fase == 7) {
      this.apresentarResultado();
    } else {
      // Reinicia o contador para 0
      this.reset();
      // Aumenta o número da fase
      this.contador_fase++;
      // Inicializa a nova fase
      this.inicializarJogo();
    }
  }

  async apresentarResultado() {
    const modal = await this.modalController.create({
      component: ResultadoModalPage,
      componentProps: {
        'tempos': this.tempos
      }
    });
    return await modal.present();
  }

  // Métodos de controle do tempo
  // Inicializa a contagem do tempo
  start() {
    if (this.contando) return;
    if (this.tempo_inicial === null) {
      this.reset();
      this.tempo_inicial = new Date();
    }
    if (this.tempo_parado !== null) {
      let newStoppedDuration: any = (+new Date() - this.tempo_parado)
      this.duracao_parada = this.duracao_parada + newStoppedDuration;
    }
    this.iniciado = setInterval(this.clockRunning.bind(this), 10);
    this.contando = true;
  }

  // Para a contagem do tempo
  stop() {
    this.contando = false;
    this.tempo_parado = new Date();
    clearInterval(this.iniciado);
  }

  // Reinicia o contador e limpa o tempo transcorrido
  reset() {
    this.contando = false;
    clearInterval(this.iniciado);
    this.duracao_parada = 0;
    this.tempo_inicial = null;
    this.tempo_parado = null;
    this.tempo = this.modelo_tempo;
  }

  // Adiciona o prefixo 0
  zeroPrefix(num, digit) {
    let zero = '';
    for (let i = 0; i < digit; i++) {
      zero += '0';
    }
    return (zero + num).slice(-digit);
  }

  // Efetua a computação da passagem do tempo
  clockRunning() {
    let currentTime: any = new Date()
    let timeElapsed: any = new Date(currentTime - this.tempo_inicial - this.duracao_parada)
    let min = timeElapsed.getUTCMinutes()
    let sec = timeElapsed.getUTCSeconds()
    this.tempo =
      this.zeroPrefix(min, 2) + ":" +
      this.zeroPrefix(sec, 2);
  };
}
