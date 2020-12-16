import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioHttpService } from './../services/usuarioHttp/usuario-http.service';
import { UsuarioLocalService } from './../services/usuarioLocal/usuario-local.service';
import { Component, OnInit } from '@angular/core';
import { Usuario } from '../models/usuario';
import { IdadeValidator } from '../validators/idade';
import { ToastController, ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-atualizar-dados-modal',
  templateUrl: './atualizar-dados-modal.page.html',
  styleUrls: ['./atualizar-dados-modal.page.scss'],
})
export class AtualizarDadosModalPage implements OnInit {
  public usuario: Usuario = new Usuario();
  public dadosForm: FormGroup;
  public ehMobile: boolean = false;
  private ehAndroid: boolean = false;

  public escolaridades: string[] = [
    "Fundamental - 1°",
    "Fundamental - 2°",
    "Fundamental - 3°",
    "Fundamental - 4°",
    "Fundamental - 5°",
    "Fundamental - 6°",
    "Fundamental - 7°",
    "Fundamental - 8°",
    "Fundamental - 9°",
    "Médio - 1°",
    "Médio - 2°",
    "Médio - 3°",
    "Superior"
  ];


  constructor(
    public formBuilder: FormBuilder,
    private usuarioLocalService: UsuarioLocalService,
    private usuarioHttpService: UsuarioHttpService,
    private toastController: ToastController,
    private modalController: ModalController,
    private platform: Platform) {
    this.dadosForm = formBuilder.group({
      idade: ['', IdadeValidator.ehValido],
      senha: ['', [Validators.pattern(`^(?=.*?[a-z])(?=.*?[0-9]).{5,}$`)]]
    });
  }

  ngOnInit() {
    this.ehMobile = this.platform.is("mobile");
    this.usuarioLocalService.get(this.usuarioLocalService.key).then((result) => {
      this.usuario = result;
    }).catch((error) => {
      console.error(error);
    })
  }


  async atualizarDadosUsuario() {
    let value: any = this.dadosForm.value;
    if (!this.dadosForm.valid) {
      if ((!value.idade) && (!value.senha)) {
        alert("Nenhum dado foi alterado ou há dados não preenchidos corretamente.");
        return;
      }
    }

    if (value.idade == this.usuario.idade) {
      if (!value.senha) {
        alert("Nenhum dado foi alterado ou há dados não preenchidos corretamente.");
        return;
      }
    }

    if (value.idade)
      this.usuario.idade = value.idade;

    if (value.senha)
      this.usuario.senha = value.senha;

    this.usuarioHttpService.atualizarDados(this.usuario).subscribe((response) => {
      this.usuarioLocalService.atualizar(response).then((result) => {
        this.showToast("Atualização feita com sucesso!");
        this.sair();
      }).catch((error) => {
        this.showToast("Ocorreu um erro, tente novamente");
        console.error(error);
      });
    }, (error) => {
      this.showToast("Ocorreu um erro, tente novamente");
      console.error(error);
    });

  }

  async showToast(message: string) {
    let toast = await this.toastController.create({
      message: message,
      duration: 1500
    });

    toast.present();
  }

  async sair() {
    this.modalController.dismiss();
  }
}

