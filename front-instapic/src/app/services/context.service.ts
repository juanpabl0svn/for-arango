import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export default class ContextService {
  user!: User | null;

  constructor() {}
}
