import { HttpClient, HttpHeaders} from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IdadeValidator } from  '../validators/idade';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public myForm: FormGroup;
  public tentativaDeSubmissao: boolean = false;

  constructor(public formBuilder: FormBuilder, public http: HttpClient) {
    this.myForm = formBuilder.group({
      nick: ['', [Validators.required, Validators.pattern("^[a-zA-Z0-9_-]{5,10}$")]],
      idade: ['', IdadeValidator.ehValido],
      escolaridade: [''],
      genero: [''],
      senha: ['', [Validators.required, Validators.pattern(`^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$`)]]
    });
  }

  ngOnInit() {
  }

  salvar() {
    this.tentativaDeSubmissao = true;

    if(!this.myForm.valid){
      return;
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };

    let postData = JSON.stringify(this.myForm.value);
    console.log(postData);
    this.http.post('http://localhost:8080/usuario/', postData, httpOptions).subscribe(data=>{
      console.log(data);
     },error =>{
      console.log(error);
    });
    /**
     * 

    this.http.get('http://localhost:8080/usuario/1').subscribe((response)=>{
      console.log(response);
    })
     */
    
    
  }
}
