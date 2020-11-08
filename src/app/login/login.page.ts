import { NavController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
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

  public loginForm: FormGroup;
  public singupForm: FormGroup;

  public tentativaDeCadastro: boolean = false;
  public tentativaDeLogin: boolean = false;

  public ehMobile: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private platform: Platform,
    public usuarioHttpService: UsuarioHttpService,
    public usuarioLocalService: UsuarioLocalService,
    public navCtrl: NavController) {
    
    this.ehMobile = this.platform.is("mobile");

    this.singupForm = formBuilder.group({
      nick: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]{5,10}$")]],
      idade: ['', IdadeValidator.ehValido],
      escolaridade: [''],
      genero: [''],
      senha: ['', [Validators.required, Validators.pattern(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`)]]
    });

    this.loginForm = formBuilder.group({
      nick: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]{5,10}$")]],
      senha: ['', [Validators.required, Validators.pattern(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`)]]
    });
  
  }

  ngOnInit(): void {
    this.usuarioLocalService.getAll().then((data)=>{
      if(data.length>0){
        this.navCtrl.navigateRoot('/home');
      }
    })
  }

  async efetuarCadastro() {
    this.tentativaDeCadastro = true;
    if (!this.singupForm.valid) {
      return;
    }

    this.usuarioHttpService.efetuarCadastro(JSON.stringify(this.singupForm.value)).subscribe((response) => {
      this.usuarioLocalService.inserir(response).then(() => {
        console.log('Cadastrado com sucesso!');
        this.navCtrl.navigateRoot('/home');
      }).catch((error) => {
        alert(error);
      });
    }, (error) => {
      this.usuarioHttpService.handleError(error).subscribe((response) => {
        alert(response);
      });
    });

  }

  async efetuarLogin() {
    this.tentativaDeLogin = true;
    if (!this.loginForm.valid) {
      return;
    }

    this.usuarioHttpService.efetuarLogin(JSON.stringify(this.loginForm.value)).subscribe((response) => {
      this.usuarioLocalService.inserir(response).then(() => {
        console.log('Login efetuado sucesso!');
        this.navCtrl.navigateRoot('/home');
      }).catch((error) => {
        alert(error);
      });
    }, (error) => {
      this.usuarioHttpService.handleError(error).subscribe((response) => {
        alert(response);
      });
    });

  }
}
