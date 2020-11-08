import { SobreModalPage } from './../sobre-modal/sobre-modal.page';
import { InstrucoesModalPage } from './../instrucoes-modal/instrucoes-modal.page';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  fases = new Array(45);

  constructor(public modalController: ModalController, private router: Router) { }

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
