import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  bsConfig:Partial<BsDatepickerConfig>;
  user: User;
  constructor(private authService:AuthService,private alertify:AlertifyService,
    private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
    // this.registerForm = new FormGroup({
    //   username : new FormControl('',Validators.required),
    //   password: new FormControl('',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]),
    //   confirmPassword: new FormControl('',Validators.required),
    // },this.passwordMatchValidators);
    
    if(this.authService.loggedin()){
      this.router.navigate(['/members']);
    }

    this.bsConfig = {
      containerClass : 'theme-red'
    }
    this.createRegisterForm();

  }

  passwordMatchValidators(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  createRegisterForm(){
    this.registerForm = this.fb.group({
      gender:['male',Validators.required],
      username:['',Validators.required],
      knownAs:['',Validators.required],
      dateofBirth:[null,Validators.required],
      city:['',Validators.required],
      country:['',Validators.required],
      password:['',[Validators.required,Validators.minLength(4),Validators.maxLength(8)]],
      confirmPassword:['',Validators.required]
    },{validators:this.passwordMatchValidators});
  }

  register(){
    //console.log(this.model);    
    // this.authService.register(this.model).subscribe(()=>{
    //   //console.log('Registration Successful');      
    //   this.alertify.success('Registration Successful');      
    // },error => {
    //   console.log(error);
    //   this.alertify.error(error);
    // });
    if(this.registerForm.valid){
      this.user = Object.assign({},this.registerForm.value);
      this.authService.register(this.user).subscribe(()=>{
        this.alertify.success('Registration successful');
      },error =>{
        this.alertify.error(error);
      },()=>{
        this.authService.login(this.user).subscribe(()=>{
          this.router.navigate(['/members']);
        });
      });
    }
    console.log(this.registerForm.value)

  }

  cancel(){
    this.cancelRegister.emit(false);
    //console.log('cancelled');    
  }

}
