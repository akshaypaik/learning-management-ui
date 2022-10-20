import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseModel } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {

  ROOT_URL: string = "http://localhost:300";

  constructor(private httpClient: HttpClient) { }

  public getCourseDetails(): Observable<any>{
    let url = this.ROOT_URL+"/api/v1.0/lms/courses/getall";
    return this.httpClient.get<CourseModel>(url);
  }

  public deleteCourse(course): Observable<any>{
    let url = this.ROOT_URL+"/api/v1.0/lms/courses/delete";
    return this.httpClient.post<CourseModel>(url, course);
  }

}
