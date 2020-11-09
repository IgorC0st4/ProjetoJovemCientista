import { SobreModalPage } from './../sobre-modal/sobre-modal.page';
import { InstrucoesModalPage } from './../instrucoes-modal/instrucoes-modal.page';
import { ModalController } from '@ionic/angular';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AudioService } from '../services/audio/audio.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements AfterViewInit {

  constructor(public modalController: ModalController, private router: Router, private audioService: AudioService) { }

  ngAfterViewInit(): void {
    this.audioService.preloadSounds().then(()=>{
      console.log('Audio loaded');
    }).catch((error)=>{
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

  iniciarFase(numeroFase) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        numero: numeroFase
      }
    };
    this.router.navigate(['fase'], navigationExtras);
  }
}
