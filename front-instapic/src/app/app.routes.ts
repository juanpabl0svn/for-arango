import { Routes } from '@angular/router';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { SignUpComponent } from './login/sign-up/sign-up.component';
import { HomePageComponent } from './home/home-page.component';
import { AccountPageComponent } from './account/account-page/account-page.component';
import { loggedInGuard } from './guards/logged-in.guard';
import { loggedOutGuard } from './guards/logged-out.guard';
import { NewPostComponent } from './new-post/new-post.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { SearchComponent } from './search/search.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { EditComponent } from './edit/edit.component';

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
  {
    path: 'new_post',
    component: NewPostComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'search',
    component: SearchComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'nickname/:nickname',
    component: UserInfoComponent,
    canActivate: [loggedInGuard],
  },
  {
    path: 'edit',
    component: EditComponent,
    canActivate: [loggedInGuard],
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];
