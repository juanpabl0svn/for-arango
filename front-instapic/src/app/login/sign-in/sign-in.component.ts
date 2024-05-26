import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule} from '@angular/forms';

@Component({
  selector: 'sign-in',
  standalone: true,
  imports: [CommonModule,
    RouterLink, FormsModule
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  login={
    userName:"",
    paswsword:""
  };
  loginModel = "";

  signUppath = '';
//Crear una interfaz para loginData
  loginData = [
    {
      placeholder:'name@mail.com',
      title: 'Ingresa tu correo',
      svg:'/../../assets/login-images/email.svg',
      name: 'email',
      type:'email',
      class:'input-field',
      id:'email-field'
    },{
      placeholder:'******',
      title: 'Ingresa tu contraseña',
      svg:'/../../assets/login-images/password.svg',
      name: 'password',
      type: 'password',
      class:'input-field',
      id:'password-field'
    }
  ]


  onSignIn(){
    console.log('Login:', this.login);
  }
}
