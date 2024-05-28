import { Component } from '@angular/core';
import ContextService from '../../services/context.service';

@Component({
  selector: 'account-info',
  standalone: true,
  imports: [],
  templateUrl: './account-info.component.html',
  styleUrl: './account-info.component.css',
})
export class AccountInfoComponent {
  constructor(public context: ContextService) {}
}
