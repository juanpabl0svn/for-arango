import { Routes } from '@angular/router';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { MenuComponent } from './shared/menu/menu.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home/pages/home-page/home-page.component';
import { AccountPageComponent } from './account/account-page/account-page.component';

export const routes: Routes = [
  { path: '', component: SignInComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'home', component: HomePageComponent },
  { path: 'account', component: AccountPageComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
