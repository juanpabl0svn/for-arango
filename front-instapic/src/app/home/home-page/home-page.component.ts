import { Component } from '@angular/core';
import { MenuComponent } from '../../shared/menu/menu.component';
import { CommonModule } from '@angular/common';
import { AccountInfoComponent } from '../account-info/account-info.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule,MenuComponent,AccountInfoComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

}
