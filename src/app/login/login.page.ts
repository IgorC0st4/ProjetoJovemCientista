import { IonSlides, NavController, Platform, ToastController } from '@ionic/angular';
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

  public submissaoComSucesso: boolean = false;

  public ehMobile: boolean = false;

  public aceitouTermos: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private platform: Platform,
    public usuarioHttpService: UsuarioHttpService,
    public usuarioLocalService: UsuarioLocalService,
    public navCtrl: NavController,
    private toastController: ToastController) {
    this.ehMobile = this.platform.is("mobile");

    this.singupForm = formBuilder.group({
      nick: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]{5,10}$")]],
      idade: ['', IdadeValidator.ehValido],
      escolaridade: [''],
      tipoEscola: [''],
      genero: [''],
      senha: ['', [Validators.required, Validators.pattern(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$`)]]
    });

    this.loginForm = formBuilder.group({
      nick: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]{5,10}$")]],
      senha: ['', [Validators.required, Validators.pattern(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`)]]
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

    this.usuarioHttpService.efetuarCadastro(JSON.stringify(this.singupForm.value)).subscribe((response) => {
      this.usuarioLocalService.inserir(response).then(() => {
        this.submissaoComSucesso = true;
        this.navCtrl.navigateRoot('/home');
      }).catch((error) => {
        alert(error);
      });
    }, (error) => {
      console.error('ERRO CADASTRO');
      console.error(error);
    });

  }

  async efetuarLogin() {
    this.tentativaDeLogin = true;
    if (!this.loginForm.valid) {
      return;
    }

    this.usuarioHttpService.efetuarLogin(JSON.stringify(this.loginForm.value)).subscribe((response) => {
      this.usuarioLocalService.inserir(response).then(() => {
        this.submissaoComSucesso = true;
        this.navCtrl.navigateRoot('/home');
      }).catch((error) => {
        alert(error);
      });
    }, (error) => {
      console.error('ERRO LOGIN');
      console.error(error);
    });

  }

  habilitarTransicao(){
    this.slides.lockSwipeToNext(true);
  }

  ionSlideTransitionEnd() {
    if (!this.aceitouTermos) {
      this.slides.lockSwipeToNext(false);
      this.slides.slidePrev();
      this.showToast('Aceite os termos de uso para continuar.');
    }
  }

  async showToast(msg:string){
    const toast = await this.toastController.create({
      message: msg,
      duration: 1500
    });
    toast.present();
  }
}
