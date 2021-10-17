import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { DashboardComponent } from './dashboard/dashboard.component'; 
import { RedirectPageComponent } from './redirect-page/redirect-page.component';
import { StatsComponent } from './stats/stats.component';
const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"URLShortener",
    component:DashboardComponent
  },
  {
    path:"p/:id",
    component:RedirectPageComponent
  },
  {
    path:"stats/:id",
    component:StatsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
