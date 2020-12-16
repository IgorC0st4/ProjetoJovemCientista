import { ResultadoLocalService } from './../services/resultadoLocal/resultado-local.service';
import { IonSlides, NavController, Platform, ModalController, IonContent } from '@ionic/angular';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdadeValidator } from '../validators/idade';
import { UsuarioHttpService } from '../services/usuarioHttp/usuario-http.service';
import { UsuarioLocalService } from '../services/usuarioLocal/usuario-local.service';
import { Usuario } from '../models/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('mySlider') slides: IonSlides;
  @ViewChild(IonContent, { static: false }) content: IonContent;

  public loginForm: FormGroup;
  public singupForm: FormGroup;
  public tentativaDeCadastro: boolean = false;
  public tentativaDeLogin: boolean = false;
  public submissaoComSucesso: boolean = true;
  public ehMobile: boolean = false;
  public aceitouTermos: boolean = false;
  public ultimoSlide: boolean = false;

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
      nick: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]{5,20}$")]],
      idade: ['', IdadeValidator.ehValido],
      escolaridade: ['', Validators.required],
      tipoEscola: ['', Validators.required],
      sexo: ['', Validators.required],
      transtorno: ['', Validators.required],
      senha: ['', [Validators.required, Validators.pattern(`^(?=.*?[a-z])(?=.*?[0-9]).{5,}$`)]]
    });

    this.loginForm = formBuilder.group({
      nick: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]{5,20}$")]],
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

    if (this.platform.is('android') &&
      this.platform.is('capacitor') &&
      this.platform.is('cordova')) {
      this.usuarioHttpService.http.post(
        this.usuarioHttpService.basePath + '/cadastro',
        this.singupForm.value,
        this.usuarioHttpService.http.getHeaders('*'))
        .then((response) => {
          this.salvarUsuarioLocalmente(JSON.parse(response.data));
        }).catch((error) => {
          this.submissaoComSucesso = false;
          alert("Já existe um usuário cadastrado com o nick fornecido");
        });
    } else {
      this.usuarioHttpService
        .efetuarCadastro(JSON.stringify(this.singupForm.value))
        .subscribe((response) => {
          this.salvarUsuarioLocalmente(response);
        }, (error) => {
          this.submissaoComSucesso = false;
          alert("Já existe um usuário cadastrado com o nick fornecido");
        });
    }
  }

  async efetuarLogin() {
    this.tentativaDeLogin = true;
    if (!this.loginForm.valid) {
      return;
    }

    if (this.platform.is('android') &&
      this.platform.is('capacitor') &&
      this.platform.is('cordova')) {
      this.usuarioHttpService.http.post(
        this.usuarioHttpService.basePath + '/login',
        this.loginForm.value,
        this.usuarioHttpService.http.getHeaders('*'))
        .then((response) => {
          this.salvarUsuarioLocalmente(JSON.parse(response.data));
        }).catch((error) => {
          this.submissaoComSucesso = false;
          if (error.status == 404) {
            alert("Nick não encontrado!");
          }
        });
    } else {
      this.usuarioHttpService.efetuarLogin(JSON.stringify(this.loginForm.value)).subscribe((response) => {
        this.salvarUsuarioLocalmente(response);
      }, (error) => {
        this.submissaoComSucesso = false;
        if (error.status == 404) {
          alert("Nick não encontrado!");
        }
      });
    }



  }

  async salvarUsuarioLocalmente(usuario: any) {
    this.usuarioLocalService.inserir(usuario).then(() => {
      this.submissaoComSucesso = true;
      this.resultadoLocalService.setTesteFinalizado(false);
      if (this.tentativaDeCadastro) {
        this.navCtrl.navigateRoot('/primeiros-passos');
      } else {
        this.navCtrl.navigateRoot('/home');
      }
    }).catch((error) => {
      this.submissaoComSucesso = false;
      console.error(error);
    });
  }

  habilitarTransicao() {
    this.slides.lockSwipeToNext(true);
  }

  ionSlideTransitionEnd() {
    if (!this.aceitouTermos) {
      this.slides.lockSwipeToNext(false);
      this.slides.slidePrev();
    }
    this.content.scrollToTop(1000);
    this.slides.isEnd().then((result) => {
      this.ultimoSlide = result;
    });
  }

  proximoSlide() {
    this.slides.slideNext();

  }

}
