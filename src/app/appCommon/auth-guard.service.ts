import { Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { LoginService } from '../login/login.service';
import { UserModel } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private loginService: LoginService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return new Promise((resolve, reject) =>{
      this.loginService.isUserLoggedIn().subscribe(response=> {
        if(response.messageModel.statusCode === 0){
          this.loginService.loggedIn = true;
          //this.router.navigate(['add-course']);
          let user: UserModel = new UserModel();
          user.email = response.email;
          this.loginService.user.next(user);
          resolve(true);
        }else{
          this.loginService.loggedIn = false;
          this.router.navigate(['login']);
          reject(false);
        }
      });
    });  
  }

}
