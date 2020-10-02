import { StopwatchService } from './../services/stopwatch/stopwatch.service';
import { AudioService } from './../services/audio/audio.service';
import { TimerService } from './../services/timer/timer.service';
import { ResultadoModalPage } from './../resultado-modal/resultado-modal.page';
import { AfterViewInit, Component } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-fase',
  templateUrl: './fase.page.html',
  styleUrls: ['./fase.page.scss'],
})
export class FasePage implements AfterViewInit {

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
    '../../assets/imgs/desenhos/Imagem 1.PNG',
    '../../assets/imgs/desenhos/Imagem 2.PNG',
    '../../assets/imgs/desenhos/Imagem 3.PNG',
    '../../assets/imgs/desenhos/Imagem 4.PNG',
    '../../assets/imgs/desenhos/Imagem 5.PNG',
    '../../assets/imgs/desenhos/Imagem 6.PNG',
    '../../assets/imgs/desenhos/Imagem 7.PNG'
  ];
  // Imagens que o jogador deve buscar na fase
  imgs_fase: any[] = [];
  // Tempos das fases
  tempos: any[] = [];
  // Quantas imagens foram encontradas na fase
  imagens_encontradas: number = 0;

  game_over: boolean = false;

  ios: boolean = false;
  desktop: boolean = false;

  constructor(
    private alertController: AlertController,
    public modalController: ModalController,
    public timerService: TimerService,
    public stopwatchService: StopwatchService,
    public platform: Platform,
    private audioService: AudioService) {

    this.inicializarJogo();
  }

  ngAfterViewInit() {
    this.audioService.preload('fase', 'assets/audio/click.wav');

    this.ios = this.platform.is('ios');
    this.desktop = this.platform.is('desktop');
  }

  // Inicializa cada fase com as imagens e cores
  // de cada bloco
  async inicializarJogo() {
    this.game_over = false;
    this.imagens_encontradas = 0;

    this.inicializarTabuleiro();
    this.inicializarImagensFase();

    this.timerService = new TimerService();
    this.timerService.initTimer();
    this.timerService.startTimer();

    if (!this.stopwatchService.running) {
      this.stopwatchService.start();
    }

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
          'img': this.imgs[this.gerarNumeroAleatorio(this.imgs.length)]
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
    this.audioService.play('fase');
    for (var i = 0; i < this.imgs_fase.length; i++) {
      var item = this.imgs_fase[i];
      if (item.img === img.img && item.classe === img.classe) {
        this.imagens_encontradas++;
        const index = this.imgs_fase.indexOf(item);

        if (index > -1) {
          this.imgs_fase.splice(index, 1);
        }
        if (this.imagens_encontradas == this.contador_fase && !this.game_over) {
          this.proximaFase();
        }
        return;
      }
    }
  }

  // Chama a próxima fase
  async proximaFase() {
    // Para o tempo transcorrido na fase
    this.timerService.pauseTimer();
    var tempoFase = {
      'fase': this.contador_fase,
      'tempo': this.timerService.timer.displayTime
    }
    this.tempos.push(tempoFase);
    if (this.contador_fase == 7) {
      this.apresentarResultado();
    } else {
      // Aumenta o número da fase
      this.contador_fase++;
      // Inicializa a nova fase
      this.inicializarJogo();
    }
  }

  async apresentarResultado() {
    this.stopwatchService.stop();
    const modal = await this.modalController.create({
      component: ResultadoModalPage,
      componentProps: {
        'tempos': this.tempos,
        'total': this.stopwatchService.time
      }
    });
    return await modal.present();
  }

  async gameOver() {
    this.game_over = true;
    this.timerService.pauseTimer();
    const alert = await this.alertController.create({
      header: 'FIM DE JOGO',
      message: 'O seu tempo acabou',
      buttons: [{
        text: 'Recomeçar',
        handler: () => {
          this.reinicarJogo();
        }
      }
      ]
    });

    await alert.present();
  }

  reinicarJogo() {
    this.contador_fase = 1;
    this.inicializarJogo();
  }

}
