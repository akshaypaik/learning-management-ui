import { HttpClient, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public loggedIn: boolean = false;
  public username: string = '';
  public password: string = '';
  public user = new BehaviorSubject<UserModel>(null);

  ROOT_URL: string = "http://localhost:300";

  constructor(private httpClient: HttpClient) { }

  public postUserDetailsOnRegister(user: UserModel): Observable<UserModel>{
    let url = this.ROOT_URL+"/registerUser";
    return this.httpClient.post<UserModel>(url, user);
  }

  public getLoginDetails(email, password): Observable<UserModel>{

    const url = this.ROOT_URL+"/loginUser";
    //const url ="../../assets/user.json";
    let httpParams: HttpParams = new HttpParams();
    httpParams = httpParams.append('email', email);
    httpParams = httpParams.append('password', password);
    return this.httpClient.get<UserModel>(url, { params: httpParams, withCredentials: true }).pipe(
      catchError(this.handleError),
      tap(resData=> {
        if(resData.messageModel != null && resData.messageModel.statusCode === 0){
          this.handleAuthentication(resData);
        }
    }));
  }

  public handleError(errorMessage: HttpErrorResponse){
    let errorMsg = 'An unknown error occured !!';
    if(!errorMessage.error || !errorMessage.error.error){
      return throwError(errorMsg);
    }
    return throwError(errorMessage);
  }

  public handleAuthentication(resData: UserModel){
    const user = new UserModel();
      user.email = resData.email;
      //user._token = resData.token;
      user.messageModel = resData.messageModel;
      user.password = resData.password;
      user.firstName = resData.firstName;
      user.lastName = resData.lastName;
      user.email = resData.email;
      this.user.next(user);
  }

  public isUserLoggedIn(){
    let url = this.ROOT_URL+"/isUserLoggedIn";
    return this.httpClient.post<any>(url, null, { withCredentials: true });
  }

  public onUserLogOut(){
    let url = this.ROOT_URL+"/logout";
    return this.httpClient.post<any>(url, null, { withCredentials: true });
  }

  public getUsername(){
    return this.username;
  }

  public setUsername(username){
    this.username = username;
  }

  public getPassword(){
    return this.password;
  }

  public setPassword(password){
    this.password = password;
  }

  public getLoggedIn(){
    return this.loggedIn;
  }

  public setLoggedIn(loggedIn){
   this.loggedIn = loggedIn;
  }

}
