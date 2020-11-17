import { ResultadoLocalService } from './../services/resultadoLocal/resultado-local.service';
import { ParabensModalPage } from './../parabens-modal/parabens-modal.page';
import { NivelLocalService } from './../services/nivelLocal/nivel-local.service';
import { UsuarioLocalService } from './../services/usuarioLocal/usuario-local.service';
import { Resultado } from './../models/resultado';
import { StopwatchService } from './../services/stopwatch/stopwatch.service';
import { AudioService } from './../services/audio/audio.service';
import { TimerService } from './../services/timer/timer.service';
import { ResultadoModalPage } from './../resultado-modal/resultado-modal.page';
import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, Platform, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-fase',
  templateUrl: './fase.page.html',
  styleUrls: ['./fase.page.scss'],
})
export class FasePage implements OnInit {

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
  contadorFase: number = 1;
  contadorErros: number = 0;
  desktop: boolean = false;
  fimDeJogo: boolean = false;
  imgs: string[] = [
    '../../assets/imgs/desenhos/Imagem 1.PNG',
    '../../assets/imgs/desenhos/Imagem 2.PNG',
    '../../assets/imgs/desenhos/Imagem 3.PNG',
    '../../assets/imgs/desenhos/Imagem 4.PNG',
    '../../assets/imgs/desenhos/Imagem 5.PNG',
    '../../assets/imgs/desenhos/Imagem 6.PNG',
    '../../assets/imgs/desenhos/Imagem 7.PNG'
  ];
  imagensEncontradas: number = 0;
  ios: boolean = false;
  imagensProcuradas: any[] = [];
  tabuleiro: any[] = [];
  tempos: any[] = [];
  testeFinalizadoAntes:boolean = false;

  constructor(
    private alertController: AlertController,
    public modalController: ModalController,
    public timerService: TimerService,
    public stopwatchService: StopwatchService,
    public platform: Platform,
    private audioService: AudioService,
    private route: ActivatedRoute,
    private navController: NavController,
    private usuarioLocalService: UsuarioLocalService,
    private nivelLocalService: NivelLocalService,
    private resultadoLocalService: ResultadoLocalService) {

  }

  ionViewWillLeave() {
    this.audioService.stop(this.contadorFase.toString());
    this.stopwatchService.reset();
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if (params && params.numero) {
        this.contadorFase = params.numero;
        this.inicializarJogo();
      }
    });
    this.ios = this.platform.is('ios');
    this.desktop = this.platform.is('desktop');
  }

  async inicializarJogo() {
    this.verificarSeJaFinalizouAntes();
    this.audioService.playMusic(this.contadorFase.toString());

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

  async verificarSeJaFinalizouAntes(){
    this.resultadoLocalService.getSeJaFinalizouAntes().then((result)=>{
      if(result){
        this.testeFinalizadoAntes = result;
      }else{
        this.resultadoLocalService.setTesteFinalizado(true);
      }
    }).catch((error)=>{
      console.error(error);
    });
  }

  inicializarImagensFase() {
    this.imagensProcuradas = [];
    for (var i = 0; i < this.contadorFase; i++) {
      var linha = this.tabuleiro[this.gerarNumeroAleatorio(5)];
      var bloco = linha[this.gerarNumeroAleatorio(5)];
      if (!this.ehImagemProcurada(bloco)) {
        this.imagensProcuradas.push(bloco);
      } else {
        i--;
      }
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

  ehImagemProcurada(img: any): boolean {
    return this.imagensProcuradas.find(e => e.classe === img.classe && e.img === img.img);
  }

  gerarNumeroAleatorio(limite: number) {
    return Math.floor((Math.random() * limite));
  }

  async testarBlocoSelecionado(img) {
    //this.audioService.playSound('click');
    if (this.ehImagemProcurada(img)) {
      const index = this.imagensProcuradas.findIndex((item) => {
        return (item.classe === img.classe && item.img === img.img);
      });
      this.imagensEncontradas++;
      if (index > -1) {
        this.imagensProcuradas.splice(index, 1);
      }
      if (this.imagensEncontradas == this.contadorFase && !this.fimDeJogo) {
        this.apresentarResultado();
      }
      return;
    } else {
      this.contadorErros++;
    }
  }

  async proximaFase() {
    // Para o tempo transcorrido na fase
    //this.timerService.pauseTimer();
    //this.stopwatchService.stop();
    /*var tempoFase = {
      'fase': this.contadorFase,
      'tempo': this.stopwatchService.time
    }
    */
    //this.tempos.push(tempoFase);
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

    let resultado = new Resultado();
    this.nivelLocalService.get(this.contadorFase).then((result) => {
      resultado.nivel = result;
    }).catch((error) => {
      console.error(error);
    });
    resultado.tempoFinal = this.stopwatchService.time;
    resultado.erros = this.contadorErros;
    await this.usuarioLocalService.get(this.usuarioLocalService.key).then((result) => {
      resultado.usuario = result;
    }).catch((error) => {
      console.error(error);
    });

    const modal = await this.modalController.create({
      component: ResultadoModalPage,
      componentProps: {
        'resultado': resultado
      }
    });
    modal.onDidDismiss().then((data) => {
      if(this.contadorFase==7){
        this.apresentarParabens();
        this.navController.back();
      }else{
        if (data['data'].comando === 'voltar') {
          this.navController.back();
        } else {
          this.proximaFase();
        }
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

  async apresentarParabens() {
    const modal = await this.modalController.create({
      component: ParabensModalPage
    });
    modal.onDidDismiss().then((data) => {
      this.navController.back();
    });
    return await modal.present();
  }
}
