import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { APPConstants } from '../appCommon/APPConstants';
import { LoginService } from '../login/login.service';
import { CourseModel } from '../models/course.model';
import { UserModel } from '../models/user.model';
import { AddCourseService } from './add-course.service';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  public courseForm: FormGroup;
  public message: string = '';
  private user: UserModel;

  constructor(private datePipe: DatePipe, private loginService: LoginService, private courseService: AddCourseService) { }

  ngOnInit(): void {
    this.setAddCourseForm();
    
  }

  public setAddCourseForm(){
    this.courseForm = new FormGroup({
      courseName: new FormControl(null, [Validators.required]),
      courseDuration: new FormControl(null, Validators.required),
      courseDescription: new FormControl(null, Validators.required),
      technology: new FormControl(null, [Validators.required]),
      launchURL: new FormControl(null, Validators.required),
    });
  }

  onClaimsSubmit(){
    let courseDetails: CourseModel = new CourseModel();
    let email;

    this.loginService.user.subscribe(user => {
      email = user.email;
    });

    courseDetails.courseName = this.courseForm.get('courseName').value;
    courseDetails.courseDuration = this.courseForm.get('courseDuration').value;
    courseDetails.courseDescription = this.courseForm.get('courseDescription').value;
    courseDetails.technology = this.courseForm.get('technology').value;
    courseDetails.launchURL = this.courseForm.get('launchURL').value;

    this.courseService.postCourseDetails(courseDetails).subscribe(response => {
      if(response != null){
        if(typeof(response) != 'undefined' && response != null && response.statusCode === 0){
          this.message = "Course Added Successfully!"
          this.courseForm.reset();
        }else{
          this.message = "Exception occurred! Please try later!"
        }
      }
    });

  }

}
