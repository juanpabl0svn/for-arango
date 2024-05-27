import { Routes } from '@angular/router';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { AccountPageComponent } from './account/account-page/account-page.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { loggedOutGuard } from './guards/logged-out.guard';

export const routes: Routes = [
  { path: '', component: SignInComponent, canActivate: [loggedOutGuard] },
  {
    path: 'sign-up',
    component: SignUpComponent,
    canActivate: [loggedOutGuard],
  },
  { path: 'home', component: HomePageComponent, canActivate: [loggedInGuard] },
  {
    path: 'account',
    component: AccountPageComponent,
    canActivate: [loggedInGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
