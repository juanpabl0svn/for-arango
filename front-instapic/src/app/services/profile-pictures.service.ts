import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProfilePicturesService {
  constructor() {}
  pictures: String[] = [
    '/assets/images/imagen_1.jpg',
    '/assets/images/imagen_2.jpg',
    '/assets/images/imagen_3.jpg',
    '/assets/images/imagen_4.jpg',
  ];

  usersPictures = [
    {
      id: 1,
      img: '/assets/images/imagen_1.jpg',
      comments: [],
    },
    {
      id: 2,
      img: '/assets/images/imagen_2.jpg',
      comments: [],
    },
    {
      id: 3,
      img: '/assets/images/imagen_3.jpg',
      comments: [],
    },
    {
      id: 4,
      img: '/assets/images/imagen_4.jpg',
      comments: [],
    },
  ];

  loadPictures() {
    return this.pictures;
  }

  loadUsersPictures() {
    return this.usersPictures;
  }

  publicationsCount(): number {
    return this.pictures.length;
  }
}
