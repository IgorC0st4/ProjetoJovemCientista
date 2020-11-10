import { Resultado } from './../../models/resultado';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class ResultadoLocalService {
  key = 'resultado_local'
  constructor(private storage: Storage) { }

  public async inserir(resultado:Resultado) {
    return this.storage.set(this.key + '-' + resultado.nivel.numero, resultado.tempoFinal);
  }

  public async atualizar(resultado:Resultado) {
    return this.storage.set(this.key + '-' + resultado.nivel.numero, resultado.tempoFinal);
  }

  public async remover(numeroNivel:number) {
    return this.storage.remove(this.key + '-' + numeroNivel);
  }

  public async get(numeroNivel:number){
    return this.storage.get(this.key + '-' + numeroNivel);
  }

  public async getAll() {
    let resultados: ResultadoList[] = [];
    return this.storage.forEach((value: Resultado, key: string, iterationNumber: Number) => {
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
  resultado: Resultado;
}