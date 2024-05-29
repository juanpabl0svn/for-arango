import { Component } from '@angular/core';
import { MenuComponent } from '../shared/menu/menu.component';
import { CommonModule } from '@angular/common';
import ContextService from '../services/context.service';
import { GET } from '../../constants';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, MenuComponent],
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css',
})
export class HomePageComponent {
  constructor(public context: ContextService) {}

  posts: any[] = [];

  async ngOnInit() {
    this.posts = await GET('/post');
    console.log(this.posts)
  }
}
