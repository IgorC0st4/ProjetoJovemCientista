import { FormControl } from '@angular/forms';

export class IdadeValidator {

    static ehValido(control: FormControl): any {

        if(isNaN(control.value)){
            return {
                "Não é um número": true
            };
        }

        if(control.value % 1 !== 0){
            return {
                "Não é um número inteiro": true
            };
        }

        if(control.value < 0){
            return {
                "Idade inválida": true
            };
        }

        if (control.value > 120){
            return {
                "Não é realista": true
            };
        }

        return null;
    }

}