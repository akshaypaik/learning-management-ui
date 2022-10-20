import { Component, Injectable, Input, OnChanges, OnDestroy, OnInit, SimpleChange } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
@Injectable({
  providedIn: 'root',
})
export class HeaderComponent implements OnInit, OnDestroy {

  @Input()
  public loggedIn: boolean = false;
  public message: string = '';
  public userSubs: Subscription;

  constructor(private loginService: LoginService, private router: Router) { }

  ngOnChanges(changes: SimpleChange){
    console.log(changes);
    this.loggedIn = this.loginService.getLoggedIn();
    this.userSubs = this.loginService.user.subscribe();
  }


  ngOnInit(): void {
    this.loggedIn = this.loginService.getLoggedIn();
    this.message = '';
    this.userSubs = this.loginService.user.subscribe(user=> {
      this.loggedIn = !!user;
    });
  }

  onLogin(){
    //this.loggedIn = this.loginService.getLoggedIn();
    this.message = '';
    this.router.navigate(['/claims']);
  }

  onTabSelect(element){
    //this.loggedIn = this.loginService.getLoggedIn();
    //if(this.loggedIn && element === 'submitClaims'){
    if(element === 'courses'){
      this.message = '';
      this.router.navigate(['/courses']);
    } else if(element === 'deleteCourse'){
      this.message = '';
      this.router.navigate(['/delete-course']);
    }else if(element === 'findCourse'){
      this.message = '';
      this.router.navigate(['/find-course']);
    }else if(element === 'add-course'){
      this.message = '';
      this.router.navigate(['/add-course']);
    }else{
      this.message = "Page not found!!"
    }
  }

  onLogOut(){
    this.loginService.onUserLogOut().subscribe(response => {
      this.loggedIn = false;
      this.loginService.setLoggedIn(false);
      this.loginService.user.next(null);
      this.message = '';
      this.router.navigate(['/login']);
    })
  }

  ngOnDestroy(){
    this.userSubs.unsubscribe();
  }
  
}
