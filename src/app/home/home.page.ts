import { CreditosModalPage } from './../creditos-modal/creditos-modal.page';
import { ResultadoLocalService, ResultadoList } from './../services/resultadoLocal/resultado-local.service';
import { NivelLocalService } from './../services/nivelLocal/nivel-local.service';
import { NivelHttpService } from './../services/nivelHttp/nivel-http.service';
import { SobreModalPage } from './../sobre-modal/sobre-modal.page';
import { InstrucoesModalPage } from './../instrucoes-modal/instrucoes-modal.page';
import { ModalController, NavController } from '@ionic/angular';
import { Component, AfterViewInit } from '@angular/core';
import { AudioService } from '../services/audio/audio.service';
import { UsuarioLocalService } from '../services/usuarioLocal/usuario-local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {

  desempenho: ResultadoList[] = [];

  constructor(
    public modalController: ModalController,
    private audioService: AudioService,
    public usuarioLocalService: UsuarioLocalService,
    private navController: NavController,
    private nivelHttpService: NivelHttpService,
    private nivelLocalService: NivelLocalService,
    private resultadoLocalService: ResultadoLocalService) { }

  ngAfterViewInit(): void {
    this.carregarNiveis();
    this.carregarSons();
    this.inicializarResultados();
    this.generateDesempenho();
  }

  ngOnInit(): void {
    this.usuarioLocalService.get(this.usuarioLocalService.key).then((result) => {
      if (!result) {
        this.sair();
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  async doRefresh(event) {
    this.generateDesempenho().then(() => {
      event.target.complete();
    }).catch((error) => {
      console.error(error);
    });
  }

  async carregarSons() {
    this.audioService.preloadSounds().then(() => {
      console.log('Audio loaded');
    }).catch((error) => {
      console.error(error);
    });
  }

  async carregarNiveis() {
    this.nivelHttpService.listarNiveis().subscribe((response) => {
      this.salvarNiveis(response);
    }, (error) => {
      console.error(error)
    });
  }

  async inicializarResultados() {
    this.resultadoLocalService.get(1).then((result) => {
      if (!result) {
        this.resultadoLocalService.inicializarResultados();
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  async salvarNiveis(niveis) {
    niveis.forEach((nivel) => {
      this.nivelLocalService.inserir(nivel).catch((error) => {
        console.error(error);
      });
    });
  }

  async generateDesempenho() {
    this.desempenho = [];
    this.resultadoLocalService.getAll().then((result) => {
      if (result.length > 0) {
        result.forEach((item) => {
          if (item.key.includes(this.resultadoLocalService.key) && item.resultado.tempo != -1) {
            this.desempenho.push(item);
          }
        });
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  async instrucoes() {
    const modal = await this.modalController.create({
      component: InstrucoesModalPage,
    });
    return await modal.present();
  }

  async sobre() {
    const modal = await this.modalController.create({
      component: SobreModalPage
    });
    return await modal.present();
  }

  async creditos() {
    const modal = await this.modalController.create({
      component: CreditosModalPage
    });
    return await modal.present();
  }

  iniciarFase() {
    this.navController.navigateForward('/fase');
  }

  sair() {
    this.usuarioLocalService.remover(this.usuarioLocalService.key).then((result) => {
      this.navController.navigateRoot('/login');
    }).catch((error) => {
      console.error(error);
    });
  }
}
