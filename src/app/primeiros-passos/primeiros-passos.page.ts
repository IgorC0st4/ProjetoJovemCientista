import { ResultadoLocalService } from './../services/resultadoLocal/resultado-local.service';
import { NivelLocalService } from './../services/nivelLocal/nivel-local.service';
import { NivelHttpService } from './../services/nivelHttp/nivel-http.service';
import { NavController } from '@ionic/angular';
import { AudioService } from './../services/audio/audio.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-primeiros-passos',
  templateUrl: './primeiros-passos.page.html',
  styleUrls: ['./primeiros-passos.page.scss'],
})
export class PrimeirosPassosPage implements AfterViewInit {

  constructor(
    private audioService: AudioService,
    private navController: NavController,
    private nivelHttpService: NivelHttpService,
    private nivelLocalService: NivelLocalService,
    private resultadoLocalService: ResultadoLocalService,
    private router: Router
  ) { }

  ngAfterViewInit() {
    this.carregarNiveis();
    this.carregarSons();
    this.inicializarResultados();
  }

  async carregarNiveis() {
    this.nivelHttpService.listarNiveis().subscribe((response) => {
      this.salvarNiveis(response);
    }, (error) => {
      console.error(error)
    });
  }

  async salvarNiveis(niveis) {
    niveis.forEach((nivel) => {
      this.nivelLocalService.inserir(nivel).catch((error) => {
        console.error(error);
      });
    });
  }

  async carregarSons() {
    this.audioService.preloadSounds().then(() => {
      console.log('Audio loaded');
    }).catch((error) => {
      console.error(error);
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

  async iniciarJogo() {
    let navigationExtras: NavigationExtras = { state: { novoUsuario: true } };
    this.router.navigate(['/fase'], navigationExtras);
  }
}
