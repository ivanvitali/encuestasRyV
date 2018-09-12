import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from "@angular/flex-layout";
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AmChartsModule } from "@amcharts/amcharts3-angular";

import { MAT_DATE_LOCALE } from '@angular/material/core';

// components
import { AppComponent } from './app.component';
import { SurveyComponent } from './survey/survey.component';
import { HivSurveyComponent } from './survey/hiv-survey/hiv-survey.component';
import { AddictionSurveyComponent } from './survey/addiction-survey/addiction-survey.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

// services
import { AuthService } from './auth/auth.service';
import { HivSurveyService } from './survey/hiv-survey/hiv-survey.service';
import { Answer1Service } from './statistics/answer1/shared/answer1.service';
import { Answer2Service } from './statistics/answer2/shared/answer2.service';
import { UIService } from './shared/ui.service';
import { UserService } from './shared/user.service';

// environment
import { environment } from '../environments/environment';
import { StatisticsComponent } from './statistics/statistics.component';
import { Answer1Component } from './statistics/answer1/answer1.component';
import { AmchartComponent } from './statistics/amchart/amchart.component';
import { Answer2Component } from './statistics/answer2/answer2.component';
import { AuthModule } from './auth/auth.module';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './admin/users/users.component';
import { UsersService } from './admin/users/users.service';



@NgModule({
  declarations: [
    AppComponent,
    SurveyComponent,
    HivSurveyComponent,
    AddictionSurveyComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
    StatisticsComponent,
    Answer1Component,
    AmchartComponent,
    Answer2Component,
    HomeComponent,
    UsersComponent
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
    AngularFirestoreModule,
    AmChartsModule,
    AuthModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-LA'},
    AuthService,
    HivSurveyService,
    Answer1Service,
    Answer2Service,
    UIService,
    UserService,
    UsersService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
