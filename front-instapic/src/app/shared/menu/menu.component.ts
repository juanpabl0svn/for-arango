import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Menu } from '../../interfaces/menu.interface';

@Component({
  selector: 'menu',
  standalone: true,
  templateUrl: './menu.component.html',
  imports: [CommonModule, RouterLink],
  styleUrl: './menu.component.css',
})
export class MenuComponent {
  menuData: Menu[] = [
    {
      title: 'Inicio',
      svg: '/assets/home.svg',
      link: '/home',
    },
    {
      title: 'Búsqueda',
      svg: '/assets/search.svg',
      link: '/search',
    },
    {
      title: 'Explorar',
      svg: '/assets/explore.svg',
      link: '/home',
    },
    {
      title: 'Reels',
      svg: '/assets/reel.svg',
      link: '/home',
    },
    {
      title: 'Mensajes',
      svg: '/assets/mail.svg',
      link: '/home',
    },
    {
      title: 'Notificaciones',
      svg: '/assets/notification.svg',
      link: '/notifications',
    },
    {
      title: 'Crear',
      svg: '/assets/create.svg',
      link: '/new_post',
    },
    {
      title: 'Cuenta',
      svg: '/assets/account.svg',
      link: '/account',
    },
  ];

  logOut() {
    localStorage.removeItem('user');
    window.location.reload();
  }
}
