import { Component, OnInit } from '@angular/core';
import { CourseModel } from '../models/course.model';
import { CoursesService } from './courses.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  public coursesDetails: Array<CourseModel>;
  public searchText: string;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesDetails = [];
    this.getCourseDetails();
  }

  getCourseDetails(){
    this.coursesService.getCourseDetails().subscribe(response => {
      console.log("getCourseDetails: ", response);
      if(typeof(response) != 'undefined' && response != null){
        response.forEach(element => {
          this.coursesDetails.push(element);
        });
      }
    });
  }

}
