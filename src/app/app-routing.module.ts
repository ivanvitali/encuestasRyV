import { NgModule } from "@angular/core";
import { Routes, RouterModule, Router } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { SignupComponent } from "./auth/signup/signup.component";
import { LoginComponent } from "./auth/login/login.component";
import { SurveyComponent } from "./survey/survey.component";
import { StatisticsComponent } from "./statistics/statistics.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
    { path: '', component: WelcomeComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'survey', component: SurveyComponent },
    { path: 'statistics', component: StatisticsComponent, canActivate: [AuthGuard] }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard]
})
export class AppRoutingModule {}