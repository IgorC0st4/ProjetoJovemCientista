import { Injectable } from '@angular/core';
import { Nivel } from 'src/app/models/nivel';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class NivelLocalService {
  key = 'nivel'

  constructor(private storage: Storage) { }

  public async inserir(nivel: Nivel) {
    return this.storage.set(this.key + '-' + nivel.numero, nivel);
  }

  public async atualizar(nivel: Nivel) {
    return this.storage.set(this.key + '-' + nivel.numero, nivel);
  }

  public async remover(numero: number) {
    return this.storage.remove(this.key + '-' + numero);
  }

  public async get(numero: number) {
    return this.storage.get(this.key + '-' + numero);
  }

  public async getAll() {
    let niveis: NivelList[] = [];
    return this.storage.forEach((value: Nivel, key: string, iterationNumber: Number) => {
      let nivel = new NivelList();
      nivel.key = key;
      nivel.nivel = value;
      niveis.push(nivel);
    }).then(() => {
      return Promise.resolve(niveis);
    }).catch((error) => {
      return Promise.reject(error);
    });
  }
}
export class NivelList {
  key: string;
  nivel: Nivel;
}