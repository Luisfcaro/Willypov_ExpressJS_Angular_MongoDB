import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoAuthGuard } from '../core/guards/no-auth-guard.service';
import { AuthComponent } from './auth.component';

const routes: Routes = [
    { 
      path: 'login',
      component: AuthComponent ,
      canActivate: [NoAuthGuard]
    },
    { 
      path: 'register',
      component: AuthComponent,
      canActivate: [NoAuthGuard]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AuthRoutingModule{}