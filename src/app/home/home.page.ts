import { NivelLocalService } from './../services/nivelLocal/nivel-local.service';
import { NivelHttpService } from './../services/nivelHttp/nivel-http.service';
import { SobreModalPage } from './../sobre-modal/sobre-modal.page';
import { InstrucoesModalPage } from './../instrucoes-modal/instrucoes-modal.page';
import { ModalController, NavController } from '@ionic/angular';
import { Component, AfterViewInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AudioService } from '../services/audio/audio.service';
import { UsuarioLocalService } from '../services/usuarioLocal/usuario-local.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {

  constructor(
    public modalController: ModalController,
    private router: Router,
    private audioService: AudioService,
    public usuarioLocalService: UsuarioLocalService,
    private navController: NavController,
    private nivelHttpService: NivelHttpService,
    private nivelLocalService: NivelLocalService) { }

  ngAfterViewInit(): void {
    this.carregarNiveis();
    this.carregarSons();
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
      this.salvarNiveis(response['_embedded']['nivelList']);
    }, (error) => {
      console.error(error)
    });
  }

  async salvarNiveis(niveis) {
    niveis.forEach((nivel) => {
      this.nivelLocalService.inserir(nivel).then((result) => {
      }).catch((error) => {
        console.error(error);
      });
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

  iniciarFase(numeroFase) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        numero: numeroFase
      }
    };
    this.router.navigate(['fase'], navigationExtras);
  }

  sair() {
    this.usuarioLocalService.remover(this.usuarioLocalService.key).then((result) => {
      this.navController.navigateRoot('/login');
    }).catch((error) => {
      console.error(error);
    });
  }
}
