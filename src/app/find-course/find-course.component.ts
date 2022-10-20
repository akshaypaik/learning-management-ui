import { Component, OnInit } from '@angular/core';
import { CoursesService } from '../courses/courses.service';
import { CourseModel } from '../models/course.model';

@Component({
  selector: 'app-find-course',
  templateUrl: './find-course.component.html',
  styleUrls: ['./find-course.component.css']
})
export class FindCourseComponent implements OnInit {

  public coursesDetails: Array<CourseModel>;
  public coursesDetailsOnTechnology: Array<CourseModel>;
  public searchText: string;
  public selectedTechnology: any;
  public selectedFromCourseDuration: any;
  public selectedToCourseDuration: any;
  public technologies: any[];
  public fromCourseDuration: any[];
  public toCourseDuration: any[];

  constructor(private coursesService: CoursesService) { }

  ngOnInit(): void {
    this.coursesDetails = [];
    this.coursesDetailsOnTechnology = [];
    this.technologies = [];
    this.fromCourseDuration = [];
    this.toCourseDuration = [];
    this.getCourseDetails();
  }

  getCourseDetails(){
    this.coursesService.getCourseDetails().subscribe(response => {
      console.log("getCourseDetails: ", response);
      if(typeof(response) != 'undefined' && response != null){
        response.forEach(element => {
          this.coursesDetails.push(element);
          this.coursesDetailsOnTechnology.push(element);
          let index = this.technologies.findIndex(elementOne => elementOne.name === element.technology);
          if(index == -1){
            this.technologies.push({
              name: element.technology,
              value: element.technology
            });
          }
          this.fromCourseDuration.push({
            name: element.courseDuration,
            value: element.courseDuration
          });
          this.toCourseDuration.push({
            name: element.courseDuration,
            value: element.courseDuration
          });
        });
        this.fromCourseDuration = this.fromCourseDuration.sort(function(a, b){return a - b});
      }
    });
  }

  onSelectTechnology(){
    if(typeof(this.selectedTechnology) != 'undefined' && this.selectedTechnology != null && this.selectedTechnology != ""){
      this.coursesDetailsOnTechnology = this.coursesDetails.filter(element=> element.technology === this.selectedTechnology.name);
    }
  }

  onSelectCouresDuration(selectedTerm){
    if(typeof(this.selectedFromCourseDuration) != 'undefined' && this.selectedFromCourseDuration != null && this.selectedFromCourseDuration != ""){
      if(selectedTerm === 'from' && (typeof(this.selectedToCourseDuration) === 'undefined' || this.selectedToCourseDuration === "")){
        this.coursesDetailsOnTechnology = this.coursesDetails.filter(element=> element.courseDuration >= this.selectedFromCourseDuration.name);
      }
      if(selectedTerm === 'to' && this.selectedFromCourseDuration != "" && this.selectedToCourseDuration != ""){
        this.coursesDetailsOnTechnology = this.coursesDetails.filter(element=> element.courseDuration >= this.selectedFromCourseDuration.name && element.courseDuration <= this.selectedToCourseDuration.name);
      }
      if(selectedTerm === 'from' && this.selectedFromCourseDuration != "" && this.selectedToCourseDuration != ""){
        this.coursesDetailsOnTechnology = this.coursesDetails.filter(element=> element.courseDuration >= this.selectedFromCourseDuration.name && element.courseDuration <= this.selectedToCourseDuration.name);
      }
    }
  }

  onClearFilter(){
    this.coursesDetailsOnTechnology = this.coursesDetails;
    this.selectedTechnology = "";
    this.selectedFromCourseDuration = "";
    this.selectedToCourseDuration = "";
  }

}
