import { StopwatchService } from './../services/stopwatch/stopwatch.service';
import { AudioService } from './../services/audio/audio.service';
import { TimerService } from './../services/timer/timer.service';
import { ResultadoModalPage } from './../resultado-modal/resultado-modal.page';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fase',
  templateUrl: './fase.page.html',
  styleUrls: ['./fase.page.scss'],
})
export class FasePage implements OnInit {

  contadorFase: number = 1;
  tabuleiro: any[] = [];
  classesCss: string[] = [
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
  imgs: string[] = [
    '../../assets/imgs/desenhos/Imagem 1.PNG',
    '../../assets/imgs/desenhos/Imagem 2.PNG',
    '../../assets/imgs/desenhos/Imagem 3.PNG',
    '../../assets/imgs/desenhos/Imagem 4.PNG',
    '../../assets/imgs/desenhos/Imagem 5.PNG',
    '../../assets/imgs/desenhos/Imagem 6.PNG',
    '../../assets/imgs/desenhos/Imagem 7.PNG'
  ];
  imagensProcuradas: any[] = [];
  tempos: any[] = [];
  imagensEncontradas: number = 0;
  fimDeJogo: boolean = false;
  ios: boolean = false;
  desktop: boolean = false;

  constructor(
    private alertController: AlertController,
    public modalController: ModalController,
    public timerService: TimerService,
    public stopwatchService: StopwatchService,
    public platform: Platform,
    private audioService: AudioService,
    private route: ActivatedRoute, private router:Router) {
    
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      if(params && params.numero){
        this.contadorFase = params.numero
        this.inicializarJogo();
      }
    })
    this.audioService.preload('fase', 'assets/audio/click.wav');
    this.ios = this.platform.is('ios');
    this.desktop = this.platform.is('desktop');
  }

  async inicializarJogo() {
    this.fimDeJogo = false;
    this.imagensEncontradas = 0;

    this.inicializarTabuleiro();
    this.inicializarImagensFase();

    //this.timerService = new TimerService();
    //this.timerService.initTimer();
    //this.timerService.startTimer();

    if (!this.stopwatchService.running) {
      this.stopwatchService.start();
    }

  }

  inicializarImagensFase() {
    this.imagensProcuradas = [];
    for (var i = 0; i < this.contadorFase; i++) {
      var linha = this.tabuleiro[this.gerarNumeroAleatorio(5)];
      this.imagensProcuradas.push(linha[this.gerarNumeroAleatorio(5)]);
    }
  }

  inicializarTabuleiro() {
    // Limpa o array de dados
    this.tabuleiro = [];
    // Array com os dados de uma linha de blocos
    var dados_linha: any[] = [];
    for (var i = 0; i < 5; i++) {
      // Limpa o array de linhas
      dados_linha = [];
      for (var j = 0; j < 5; j++) {
        // Variável de cada bloco
        // Possui a imagem e a classe css
        var col = {
          'classe': this.classesCss[this.gerarNumeroAleatorio(9)],
          'img': this.imgs[this.gerarNumeroAleatorio(this.imgs.length)]
        }
        //Adiciona a coluna para a linha
        dados_linha.push(col);
      }
      // Adiciona a linha para o array de dados
      // da tabela
      this.tabuleiro.push(dados_linha);
    }
  }

  gerarNumeroAleatorio(limite: number) {
    return Math.floor((Math.random() * limite));
  }

  async testarBlocoSelecionado(img) {
    this.audioService.play('fase');
    for (var i = 0; i < this.imagensProcuradas.length; i++) {
      var item = this.imagensProcuradas[i];
      if (item.img === img.img && item.classe === img.classe) {
        this.imagensEncontradas++;
        const index = this.imagensProcuradas.indexOf(item);

        if (index > -1) {
          this.imagensProcuradas.splice(index, 1);
        }
        if (this.imagensEncontradas == this.contadorFase && !this.fimDeJogo) {
          this.proximaFase();
        }
        return;
      }
    }
  }

  async proximaFase() {
    // Para o tempo transcorrido na fase
    //this.timerService.pauseTimer();
    this.stopwatchService.stop();
    var tempoFase = {
      'fase': this.contadorFase,
      'tempo': this.stopwatchService.time
    }
    this.tempos.push(tempoFase);
    if (this.contadorFase == 7) {
      this.apresentarResultado();
    } else {
      this.stopwatchService.reset();
      // Aumenta o número da fase
      this.contadorFase++;
      // Inicializa a nova fase
      this.inicializarJogo();
    }
  }

  async apresentarResultado() {
    this.fimDeJogo = true;
    this.stopwatchService.stop();
    const modal = await this.modalController.create({
      component: ResultadoModalPage,
      componentProps: {
        'tempos': this.tempos
      }
    });
    return await modal.present();
  }

  async gameOver() {
    this.fimDeJogo = true;
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
    this.contadorFase = 1;
    this.stopwatchService = new StopwatchService();
    this.tempos = [];
    this.inicializarJogo();
  }

}
