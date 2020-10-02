import { Platform, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-instrucoes-modal',
  templateUrl: './instrucoes-modal.page.html',
  styleUrls: ['./instrucoes-modal.page.scss'],
})
export class InstrucoesModalPage implements OnInit {

  mobile = false;

  constructor(public platform: Platform, public modalController: ModalController) { }

  ngOnInit() {
    if (this.platform.is("mobile")) {
      this.mobile = true;
    }
  }

  async voltar() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
