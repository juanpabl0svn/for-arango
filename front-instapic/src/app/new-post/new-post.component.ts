import { Component } from '@angular/core';
import { MenuComponent } from '../shared/menu/menu.component';
import { POST, POST_STORAGE } from '../../constants';
import ContextService from '../services/context.service';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [MenuComponent],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css',
})
export class NewPostComponent {
  constructor(public context: ContextService) {}

  image: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  onImagePicked(event: Event): void {
    const file = (event.target as HTMLInputElement).files![0];
    this.image = file;

    const reader = new FileReader();
    reader.onload = async () => {
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  async onPost(e: Event) {
    e.preventDefault();

    const form = new FormData();

    form.append('img', this.image as File);

    const { ruta } = await POST_STORAGE(form);

    if (!ruta) return alert('Algo salio mal');

    const { description } = e.target as HTMLFormElement;

    const post = {
      description: description.value,
      image: ruta,
      id_user: this.context.user.id_user,
    };

    const newPost = await POST('/post', post);

    if (newPost) {
      (e.target as HTMLFormElement)['description'].value = '';
      this.image = null;
      this.imagePreview = null;
      alert('Se subio correctamente');
      return;
    }

    alert('Algo salio mal');
  }
}
