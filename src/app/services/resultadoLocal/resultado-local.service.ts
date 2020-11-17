import { Resultado } from './../../models/resultado';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ResultadoLocalService {
  key = 'resultado_local'

  resultados:any[]= [
    {'fase': 1, 'tempo':'-1', 'erros': 0},
    {'fase': 2, 'tempo':'-1', 'erros': 0},
    {'fase': 3, 'tempo':'-1', 'erros': 0},
    {'fase': 4, 'tempo':'-1', 'erros': 0},
    {'fase': 5, 'tempo':'-1', 'erros': 0},
    {'fase': 6, 'tempo':'-1', 'erros': 0},
    {'fase': 7, 'tempo':'-1', 'erros': 0},
  ];


  constructor(private storage: Storage) { }

  public async inserir(numeroNivel:number, tempo:string, erros:number) {
    let value = {
      'tempo':tempo,
      'erros':erros
    }
    return this.storage.set(this.key + '-' + numeroNivel, value);
  }

  public async get(numeroNivel:number){
    return this.storage.get(this.key + '-' + numeroNivel);
  }

  public async inicializarResultados(){
    this.resultados.forEach((resultado)=>{
      this.inserir(resultado.fase, resultado.tempo, resultado.erros);
    });
  }

  public async setTesteFinalizado(value:boolean){
    return this.storage.set('finalizou-teste', value);
  }

  public async getSeJaFinalizouAntes(){
    return this.storage.get('finalizou-teste');
  }

  public async getAll() {
    let resultados: ResultadoList[] = [];

    return this.storage.forEach((value: any, key: string, iterationNumber: Number) => {
      let resultado = new ResultadoList();
      resultado.key = key;
      resultado.resultado = value;
      resultados.push(resultado);
    }).then(() => {
      return Promise.resolve(resultados);
    }).catch((error) => {
      return Promise.reject(error);
    });
  }

}

export class ResultadoList {
  key: string;
  resultado: {
    'tempo':string,
    'erros':number};
}