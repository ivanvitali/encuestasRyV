import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { SurveyComponent } from "./survey/survey.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { AuthGuard } from "./auth/auth.guard";
import { HomeComponent } from "./home/home.component";
import { UserGuard } from "./auth/user.guard";
import { UsersComponent } from "./admin/users/users.component";

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'survey', component: SurveyComponent, canActivate: [AuthGuard, UserGuard] },
    { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] },
    { path: 'admin/users', component: UsersComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard, UserGuard]
})
export class AppRoutingModule {}