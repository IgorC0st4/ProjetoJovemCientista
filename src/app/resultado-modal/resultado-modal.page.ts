import { Platform, ModalController } from '@ionic/angular';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-resultado-modal',
  templateUrl: './resultado-modal.page.html',
  styleUrls: ['./resultado-modal.page.scss'],
})
export class ResultadoModalPage {

  @Input() tempo:string;

  mobile = false;

  constructor(public platform: Platform, public modalController: ModalController) {
    this.mobile = platform.is('mobile');
  }

/*
* 
  ngOnInit(): void {
    var segundos: number = 0;
    var minutos: number = 0;
    for (var i = 0; i < this.tempos.length; i++) {
      let tempo = this.tempos[i].tempo.split(':');
      if (parseInt(tempo[0]) > 0) {
        minutos += parseInt(tempo[0]);
      }
      segundos += parseInt(tempo[1]);
    }
    if (segundos > 59) {
      minutos += (segundos - (segundos % 60)) / 60;
      segundos = segundos % 60;
    }
    if (minutos < 10) {
      this.tempo_total += '0';
    }
    this.tempo_total += minutos + ':';
    if (segundos < 10) {
      this.tempo_total += '0';
    }
    this.tempo_total += segundos;
  }
  */
 
  async voltar() {
    this.modalController.dismiss({
      'comando': 'voltar'
    });
  }
  
  async chamarProximaFase() {
    this.modalController.dismiss({
      'comando': 'continuar'
    });
  }
}
