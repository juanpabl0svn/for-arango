import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { POST } from '../../../constants';
import ContextService from '../../services/context.service';

@Component({
  selector: 'sign-in',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css',
})
export class SignInComponent {
  constructor(public context: ContextService, private route: Router) {}

  userData: any = {
    email: '',
    password: '',
  };

  loginData = [
    {
      placeholder: 'name@mail.com',
      title: 'Ingresa tu correo',
      svg: '/../../assets/login-images/email.svg',
      name: 'email',
      type: 'email',
      class: 'input-field',
      id: 'email-field',
    },
    {
      placeholder: '******',
      title: 'Ingresa tu contraseña',
      svg: '/../../assets/login-images/password.svg',
      name: 'password',
      type: 'password',
      class: 'input-field',
      id: 'password-field',
    },
  ];

  async onSignIn() {
    if (!this.userData.email || !this.userData.password) return;

    const user = await POST('/user/auth', {
      email: this.userData.email,
      password: this.userData.password,
    });

    console.log(user)

    this.context.user = user;
    
    localStorage.setItem('user', user.token);

    this.route.navigate(['/home']);
  }
}
