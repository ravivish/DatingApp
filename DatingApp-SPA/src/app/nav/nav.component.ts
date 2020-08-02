import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  public model: any ={};
  photoUrl: string;

  constructor(public authService:AuthService, private alertify:AlertifyService,
    private router:Router) { }

  ngOnInit(): void {
      this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  login(){
    //console.log(this.model);
    this.authService.login(this.model).subscribe(next => {
      //console.log('Logged in Successfully')
      this.alertify.success('Logged in Successfully')
    },error => {
      //console.log(error);      
      this.alertify.error(error);      
    },()=>{
      this.router.navigate(['/members'])
    });
  }
  
  loggedin(){
    // const token = localStorage.getItem('token');
    // return !!token;
    return this.authService.loggedin();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedtoken = null;
    this.authService.currentUser = null;
    //console.log('Logged out');
    this.alertify.message('Logged out');
    this.router.navigate(['/home']);
  }
  

}
