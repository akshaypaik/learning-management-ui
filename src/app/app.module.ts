import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {DatePipe} from '@angular/common';
import { LoginService } from './login/login.service';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './appCommon/auth-guard.service';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesComponent } from './courses/courses.component';
import {CardModule} from 'primeng/card';
import { SearchCoursePipe } from './appCommon/search-course.pipe';
import {InputTextModule} from 'primeng/inputtext';
import { DeleteCourseComponent } from './delete-course/delete-course.component';
import { FindCourseComponent } from './find-course/find-course.component';
import {DropdownModule} from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {TooltipModule} from 'primeng/tooltip';

const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'add-course' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuardService] },
  { path: 'header', component: HeaderComponent, canActivate: [AuthGuardService] },
  { path: 'courses', component: CoursesComponent, canActivate: [AuthGuardService] },
  { path: 'delete-course', component: DeleteCourseComponent, canActivate: [AuthGuardService] },
  { path: 'add-course', component: AddCourseComponent, canActivate: [AuthGuardService] },
  { path: 'find-course', component: FindCourseComponent, canActivate: [AuthGuardService] }
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    AddCourseComponent,
    CoursesComponent,
    SearchCoursePipe,
    DeleteCourseComponent,
    FindCourseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    CardModule,
    InputTextModule,
    DropdownModule,
    TooltipModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DatePipe, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
