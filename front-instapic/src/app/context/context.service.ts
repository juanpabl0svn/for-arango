import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export default class ContextService {
  user: any | null;

  constructor() {}
}
