import { ModalController } from '@ionic/angular';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-error-modal',
  templateUrl: './error-modal.page.html',
  styleUrls: ['./error-modal.page.scss'],
})
export class ErrorModalPage implements OnInit {

  @Input() erro:any;

  constructor(private modalController:ModalController) { }

  ngOnInit() {
  }

  sair(){
    this.modalController.dismiss();
  }
}
