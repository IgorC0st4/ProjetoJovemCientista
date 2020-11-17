import { ResultadoLocalService } from './../services/resultadoLocal/resultado-local.service';
import { Resultado } from './../models/resultado';
import { ResultadoHttpService } from './../services/resultadoHttp/resultado-http.service';
import { Platform, ModalController } from '@ionic/angular';
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-resultado-modal',
  templateUrl: './resultado-modal.page.html',
  styleUrls: ['./resultado-modal.page.scss'],
})
export class ResultadoModalPage implements AfterViewInit {

  @Input() resultado: Resultado;

  resultadoMaisRapido: string = "";

  mobile = false;

  constructor(
    public platform: Platform,
    public modalController: ModalController,
    private resultadoHttpService: ResultadoHttpService,
    private resultadoLocalService: ResultadoLocalService) {
    this.mobile = platform.is('mobile');
  }
  ngAfterViewInit(): void {
    this.resultadoLocalService.get(this.resultado.nivel.numero).then((result) => {
      if (result != '-1') {
        if (this.compararSeEhMenor(this.resultado.tempoFinal, result)) {
          this.resultadoMaisRapido = this.resultado.tempoFinal;
          this.resultadoLocalService.inserir(this.resultado.nivel.numero, this.resultado.tempoFinal, this.resultado.erros);
        }else{
          this.resultadoMaisRapido = result;
        }
      } else {
        this.resultadoMaisRapido = this.resultado.tempoFinal;
        this.resultadoLocalService.inserir(this.resultado.nivel.numero, this.resultado.tempoFinal, this.resultado.erros);
      }
    }).catch((error) => {
      console.error(error);
    });

    this.resultadoHttpService.enviarResultado(this.resultado).subscribe((response) => {
    }, (error) => {
      console.error(error);
    })
  }

  compararSeEhMenor(tempoFinal: string, tempoMaisRapido: string): boolean {
    let tempoFinalSplit = tempoFinal.split(':');
    let tempoMaisRapidoSplit = tempoMaisRapido.split(':');

    if (parseInt(tempoFinalSplit[0]) <= parseInt(tempoMaisRapidoSplit[0])) {
      return (parseInt(tempoFinalSplit[1]) < parseInt(tempoMaisRapidoSplit[1]));
    } else {
      return false;
    }

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
