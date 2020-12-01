import { ErrorModalPage } from './../error-modal/error-modal.page';
import { ResultadoLocalService } from './../services/resultadoLocal/resultado-local.service';
import { IonSlides, NavController, Platform, ModalController } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdadeValidator } from '../validators/idade';
import { UsuarioHttpService } from '../services/usuarioHttp/usuario-http.service';
import { UsuarioLocalService } from '../services/usuarioLocal/usuario-local.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mySlider') slides: IonSlides;

  public loginForm: FormGroup;
  public singupForm: FormGroup;

  public tentativaDeCadastro: boolean = false;
  public tentativaDeLogin: boolean = false;

  public submissaoComSucesso: boolean = true;

  public ehMobile: boolean = false;

  public aceitouTermos: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private platform: Platform,
    public usuarioHttpService: UsuarioHttpService,
    public usuarioLocalService: UsuarioLocalService,
    public navCtrl: NavController,
    private resultadoLocalService: ResultadoLocalService,
    private modalController: ModalController) {
    this.ehMobile = this.platform.is("mobile");

    this.singupForm = formBuilder.group({
      nick: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]{5,10}$")]],
      idade: ['', IdadeValidator.ehValido],
      escolaridade: ['', Validators.required],
      tipoEscola: ['', Validators.required],
      genero: ['', Validators.required],
      transtorno: ['', Validators.required],
      senha: ['', [Validators.required, Validators.pattern(`^(?=.*?[a-z])(?=.*?[0-9]).{5,}$`)]]
    });

    this.loginForm = formBuilder.group({
      nick: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]{5,10}$")]],
      senha: ['', [Validators.required, Validators.pattern(`^(?=.*?[a-z])(?=.*?[0-9]).{5,}$`)]]
    });

  }

  ngOnInit(): void {
    this.usuarioLocalService.get(this.usuarioLocalService.key).then((result) => {
      if (result) {
        this.navCtrl.navigateRoot('/home');
      }
    }).catch((error) => {
      console.log(error);
    });
  }

  async efetuarCadastro() {
    this.tentativaDeCadastro = true;
    if (!this.singupForm.valid) {
      return;
    }

    this.usuarioHttpService.http.post(
      this.usuarioHttpService.basePath + '/cadastro',
      this.singupForm.value,
      this.usuarioHttpService.http.getHeaders('*'))
      .then((response) => {
        this.usuarioLocalService.inserir(response.data).then(() => {
          this.submissaoComSucesso = true;
          this.resultadoLocalService.setTesteFinalizado(false);
          this.navCtrl.navigateRoot('/home');
        }).catch((error) => {
          this.submissaoComSucesso = false;
          console.error(error);
        });
      }).catch((error) => {
        this.submissaoComSucesso = false;

        this.exibirErro(error);

        //alert("Já existe um usuário cadastrado com o nick fornecido");
      });

  }

  async efetuarLogin() {
    this.tentativaDeLogin = true;
    if (!this.loginForm.valid) {
      return;
    }

    if (this.platform.is('android')) {
      this.usuarioHttpService.http.post(
        this.usuarioHttpService.basePath + '/login',
        this.loginForm.value,
        this.usuarioHttpService.http.getHeaders('*'))
        .then((response) => {
          this.usuarioLocalService.inserir(response.data).then(() => {
            this.submissaoComSucesso = true;
            this.resultadoLocalService.setTesteFinalizado(false);
            this.navCtrl.navigateRoot('/home');
          }).catch((error) => {
            this.submissaoComSucesso = false;
            console.error(error);
          });
        }).catch((error) => {
          console.error(JSON.stringify(error));
          this.submissaoComSucesso = false;
          if (error.status == 404) {
            alert("Nick não encontrado!");
          }
        });
    } else {
      this.usuarioHttpService.efetuarLogin(JSON.stringify(this.loginForm.value))
        .subscribe((response) => {
          this.usuarioLocalService.inserir(response).then(() => {
            this.submissaoComSucesso = true;
            this.resultadoLocalService.setTesteFinalizado(false);
            this.navCtrl.navigateRoot('/home');
          }).catch((error) => {
            this.submissaoComSucesso = false;
            console.error(error);
          });
        }, (error) => {
          this.submissaoComSucesso = false;
          if (error.status == 404) {
            alert("Nick não encontrado!");
          }
        });
    }
  }

  habilitarTransicao() {
    this.slides.lockSwipeToNext(true);
  }

  ionSlideTransitionEnd() {
    if (!this.aceitouTermos) {
      this.slides.lockSwipeToNext(false);
      this.slides.slidePrev();
    }
  }

  async exibirErro(erro) {
    const modal = await this.modalController.create({
      component: ErrorModalPage,
      componentProps: {
        erro: erro
      }
    });
    return await modal.present();
  }
}
