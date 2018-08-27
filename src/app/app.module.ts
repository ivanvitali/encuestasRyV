import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { MAT_DATE_LOCALE } from '@angular/material/core';

// components
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { SurveyComponent } from './survey/survey.component';
import { HivSurveyComponent } from './survey/hiv-survey/hiv-survey.component';
import { AddictionSurveyComponent } from './survey/addiction-survey/addiction-survey.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

// services
import { AuthService } from './auth/auth.service';
import { HivSurveyService } from './survey/hiv-survey/hiv-survey.service';
import { VihStatisticsService } from './statistics/vih-statistics/vih-statistics.service';
import { Answer1PieService } from './chart/answer1-pie/answer1-pie.service';

// environment
import { environment } from '../environments/environment';
import { StatisticsComponent } from './statistics/statistics.component';
import { VihStatisticsComponent } from './statistics/vih-statistics/vih-statistics.component';
import { ChartComponent } from './chart/chart.component';
import { Answer1PieComponent } from './chart/answer1-pie/answer1-pie.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    LoginComponent,
    SurveyComponent,
    HivSurveyComponent,
    AddictionSurveyComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StatisticsComponent,
    VihStatisticsComponent,
    ChartComponent,
    Answer1PieComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-LA'},
    AuthService,
    HivSurveyService,
    VihStatisticsService,
    Answer1PieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
