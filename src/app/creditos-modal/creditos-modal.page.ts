import { Platform, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-creditos-modal',
  templateUrl: './creditos-modal.page.html',
  styleUrls: ['./creditos-modal.page.scss'],
})
export class CreditosModalPage implements OnInit {

  mobile = false;

  constructor(
    public platform: Platform,
    public modalController: ModalController
  ) { }

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
