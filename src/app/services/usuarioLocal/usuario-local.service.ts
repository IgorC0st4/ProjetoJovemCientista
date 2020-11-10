import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuarioLocalService {
  key = 'usuario_local'
  constructor(private storage: Storage) { }

  public async inserir(usuario: Usuario) {
    return this.storage.set(this.key, usuario);
  }

  public async atualizar(usuario: Usuario) {
    return this.storage.set(this.key, usuario);
  }

  public async remover(key: string) {
    return this.storage.remove(key);
  }

  public async get(key:string){
    return this.storage.get(key);
  }

  public async getAll() {
    let usuarios: UsuarioList[] = [];
    return this.storage.forEach((value: Usuario, key: string, iterationNumber: Number) => {
      let usuario = new UsuarioList();
      usuario.key = key;
      usuario.usuario = value;
      usuarios.push(usuario);
    }).then(() => {
      return Promise.resolve(usuarios);
    }).catch((error) => {
      return Promise.reject(error);
    });
  }
}

export class UsuarioList {
  key: string;
  usuario: Usuario;
}