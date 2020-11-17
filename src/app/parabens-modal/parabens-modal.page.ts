import { Component, OnInit } from '@angular/core';
import { Platform, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-parabens-modal',
  templateUrl: './parabens-modal.page.html',
  styleUrls: ['./parabens-modal.page.scss'],
})
export class ParabensModalPage implements OnInit {

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
