import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import {User} from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../_services/auth.service';

@Injectable()
export class MemberEditResolver implements Resolve<User>  {
    constructor(private userService:UserService,private alertify:AlertifyService,
        private router:Router,private authService:AuthService){}

    resolve(route:ActivatedRouteSnapshot):Observable<User> {
        return this.userService.getUser(this.authService.decodedtoken.nameid).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving your data');
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}