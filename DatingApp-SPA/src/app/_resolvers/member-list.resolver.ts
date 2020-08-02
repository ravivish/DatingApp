import { Injectable } from "@angular/core";
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { User } from '../_models/user';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class MemberlistResolver implements Resolve<User[]>  {

    pageNumber = 1;
    pageSize = 6;

    constructor(private userService: UserService, private alertify: AlertifyService,
        private router: Router) { }

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber,this.pageSize).pipe(
            catchError(error => {
                this.alertify.error('Problem retriving user');
                this.router.navigate(['/home']);
                return of(null);
            })
        )
    }
}