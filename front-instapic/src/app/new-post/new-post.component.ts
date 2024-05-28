import { Component } from '@angular/core';
import { MenuComponent } from '../shared/menu/menu.component';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {

  caption: string = '';
  image: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onPost() {
    // Implementar la lógica para enviar el post
    console.log('Texto:', this.caption);
    console.log('Imagen:', this.image);
  }
}




