import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/courses.service';
import { CourseModel } from '../models/course.model';

@Component({
  selector: 'app-delete-course',
  templateUrl: './delete-course.component.html',
  styleUrls: ['./delete-course.component.css']
})
export class DeleteCourseComponent implements OnInit {

  public coursesDetails: Array<CourseModel>;
  public searchText: string;

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesDetails = [];
    this.getCourseDetails();
  }

  getCourseDetails(){
    this.coursesDetails = [];
    this.coursesService.getCourseDetails().subscribe(response => {
      console.log("getCourseDetails: ", response);
      if(typeof(response) != 'undefined' && response != null){
        response.forEach(element => {
          this.coursesDetails.push(element);
        });
      }
    });
  }

  onDeleteCourse(courseDetails){
    this.coursesService.deleteCourse(courseDetails).subscribe(response => {
      if(typeof(response) != 'undefined' && response != null){
        if(response.statusCode == 0){
          this.getCourseDetails();
        }
      }
    });
  }

}
