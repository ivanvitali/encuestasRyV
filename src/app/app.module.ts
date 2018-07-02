import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { FlexLayoutModule } from "@angular/flex-layout";

import { MAT_DATE_LOCALE } from '@angular/material/core';

import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { SurveyComponent } from './survey/survey.component';
import { HivSurveyComponent } from './survey/hiv-survey/hiv-survey.component';
import { AddictionSurveyComponent } from './survey/addiction-survey/addiction-survey.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { HeaderComponent } from './navigation/header/header.component';
import { SidenavListComponent } from './navigation/sidenav-list/sidenav-list.component';

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
    SidenavListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-LA'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
