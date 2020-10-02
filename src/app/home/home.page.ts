import { InstrucoesModalPage } from './../instrucoes-modal/instrucoes-modal.page';
import { ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(public modalController:ModalController) { }

  async instrucoes(){
    const modal = await this.modalController.create({
      component: InstrucoesModalPage,
    });
    return await modal.present();
  }
}
