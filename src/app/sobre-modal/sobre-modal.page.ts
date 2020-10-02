import { Platform, ModalController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sobre-modal',
  templateUrl: './sobre-modal.page.html',
  styleUrls: ['./sobre-modal.page.scss'],
})
export class SobreModalPage implements OnInit {

  mobile=false;

  constructor(public platform:Platform, public modalController:ModalController) { }

  ngOnInit() {
    if(this.platform.is("mobile")){
      this.mobile=true;
    }
  }
  async voltar() {
    this.modalController.dismiss({
      'dismissed': true
    });
  }
}
