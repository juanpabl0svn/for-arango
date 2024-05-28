import { Component } from '@angular/core';
import { MenuComponent } from '../shared/menu/menu.component';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {}
