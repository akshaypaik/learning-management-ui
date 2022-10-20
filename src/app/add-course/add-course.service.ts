import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CourseModel } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class AddCourseService {

  ROOT_URL: string = "http://localhost:300";

  constructor(private httpClient: HttpClient) { }

  public postCourseDetails(courseDetails: CourseModel): Observable<any>{
    let url = this.ROOT_URL+"/api/v1.0/lms/courses/add";
    return this.httpClient.post<CourseModel>(url, courseDetails);
  }

}
