import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  FormBuilder,
  Validators,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
} from '@angular/forms';
import { POST } from '../../../constants';

import ContextService from '../../context/context.service';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  form = new FormGroup({
    nickname: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    birth_date: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required),
  });

  constructor(private context: ContextService) {}

  passwordMatchValidator(password: string, confirmPassword: string) {
    const passwordControl = password;
    const confirmPasswordControl = confirmPassword;

    return (
      passwordControl &&
      confirmPasswordControl &&
      passwordControl === confirmPasswordControl
    );
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
      form: 'nickname',
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
      form: 'name',
    },
    {
      message: 'Apellido',
      placeholder: 'Ej:Arango',
      title: 'Ingresa tu apellido',
      svg: '/assets/login-images/user.svg',
      name: 'lastname',
      type: 'text',
      pattern: '^[A-Za-z]+',
      form: 'last_name',
    },
    {
      message: 'Fecha de nacimiento',
      placeholder: '00/00/00',
      title: 'Ingresa tu fecha de nacimiento',
      svg: '/assets/login-images/cake.svg',
      name: 'birthday',
      type: 'date',
      pattern: '',
      form: 'birth_date',
    },
    {
      message: 'Email',
      placeholder: 'Ej:name@mail.com',
      title: 'Ingresa tu correo',
      svg: '/assets/login-images/email.svg',
      name: 'email',
      type: 'email',
      pattern: '',
      form: 'email',
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
      form: 'password',
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
      form: 'confirmPassword',
    },
  ];
  onRegister() {
    const {
      nickname,
      name,
      last_name,
      email,
      birth_date,
      password,
      confirmPassword,
    } = this.form.value;

    if (!this.form.valid) {
      console.error('Form is invalid');
      return;
    }

    if (!this.passwordMatchValidator(password!, confirmPassword!)) {
      console.error('Passwords do not match');
      return;
    }

    // const ala = fetch('http://localhost:3000/user', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     nickname,
    //     name,
    //     last_name,
    //     email,
    //     birth_date,
    //     password,
    //   }),
    // }).then((res) => res.json());

    // console.log(ala)

    const user = POST('/user/create', {
      nickname,
      name,
      last_name,
      email,
      birth_date,
      password,
    });

    console.log(user);
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
