import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  signUpObj: SignUpModel = {
    nickname: '',
    name: '',
    lastname: '',
    email: '',
    birthday: '',
    password: '',
    confirmPassword: '',
  };
  constructor(private formBuilder: FormBuilder) {
    /*this.signUpForm= this.formBuilder.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required]
  },{validator:this.passwordMatchValidator});*/
  }

  passwordMatchValidator(formGroup: FormGroup) {
    const passwordControl = formGroup.get('password');
    const confirmPasswordControl = formGroup.get('confirmPassword');

    if (
      passwordControl &&
      confirmPasswordControl &&
      passwordControl.value !== confirmPasswordControl.value
    ) {
      confirmPasswordControl.setErrors({ passwordMismatch: true });
    } else {
      //confirmPasswordControl.setErrors(null);
    }
  }
  registerData = [
    {
      message: 'Nombre de usuario',
      placeholder: 'Ej: Multihexagon',
      title: 'Ingresa tu nombre de usuario',
      svg: '/assets/login-images/user.svg',
      name: 'nickname',
      type: 'text',
      id: 'nickname-field',
      pattern: '',
      form: this.signUpObj.nickname,
    },
    {
      message: 'Nombre',
      placeholder: 'Ej: Santiago',
      title: 'Ingresa tu nombre',
      svg: '/assets/login-images/user.svg',
      name: 'name',
      type: 'text',
      id: 'name-field',
      pattern: '^[A-Za-z]+',
      form: this.signUpObj.name,
    },
    {
      message: 'Apellido',
      placeholder: 'Ej:Arango',
      title: 'Ingresa tu apellido',
      svg: '/assets/login-images/user.svg',
      name: 'lastname',
      type: 'text',
      pattern: '^[A-Za-z]+',
      form: this.signUpObj.lastname,
    },
    {
      message: 'Fecha de nacimiento',
      placeholder: '00/00/00',
      title: 'Ingresa tu fecha de nacimiento',
      svg: '/assets/login-images/cake.svg',
      name: 'birthday',
      type: 'date',
      pattern: '',
      form: this.signUpObj.birthday,
    },
    {
      message: 'Email',
      placeholder: 'Ej:name@mail.com',
      title: 'Ingresa tu correo',
      svg: '/assets/login-images/email.svg',
      name: 'email',
      type: 'email',
      pattern: '',
      form: this.signUpObj.email,
    },
    {
      message: 'Contraseña',
      placeholder: '******',
      title: 'Ingresa tu contraseña',
      svg: '/assets/login-images/password.svg',
      name: 'password',
      type: 'password',
      id: 'password-field',
      pattern: '',
      form: this.signUpObj.password,
    },
    {
      message: 'Confirmar contraseña',
      placeholder: '******',
      title: 'Confirma tu contraseña',
      svg: '/assets/login-images/password.svg',
      name: 'confirmPassword',
      type: 'password',
      id: 'confirm-password-field',
      pattern: '',
      form: this.signUpObj.confirmPassword,
    },
  ];
  onRegister() {
    const localUser = localStorage.getItem('angularUsers');
    if (localUser !== null) {
      const users = JSON.parse(localUser);
      users.push(this.signUpObj);
      localStorage.setItem('angularUsers', JSON.stringify(users));
    } else {
      const users = [];
      users.push(this.signUpObj);
      localStorage.setItem('angularUsers', JSON.stringify(users));
    }
  }
}

export interface SignUpModel {
  nickname: string;
  name: string;
  lastname: string;
  email: string;
  birthday: string;
  password: string;
  confirmPassword: string;
}
