import { Component, OnInit } from '@angular/core';
import { User } from '../_models/User';
import { Pagination, PaginationResults } from '../_models/pagination';
import { AuthService } from '../_services/auth.service';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  users: User[];
  pagination: Pagination;
  likesParam : string;

  constructor(private authService:AuthService,private userService:UserService
    ,private alertify:AlertifyService,private route:ActivatedRoute) { }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
        this.users = data['users'].result;
        this.pagination = data['users'].pagination;
    });

    this.likesParam = 'Likers';
  }

  loadUsers() {
    this.userService.getUsers(this.pagination.currentPage,this.pagination.itemsPerPage,null,this.likesParam)
    .subscribe((resp: PaginationResults<User[]>) => {
      this.users = resp.result;
      this.pagination = resp.pagination;
    },error => {
      this.alertify.error(error);
    })
  }

  pageChanged(event: any): void {
    this.pagination.currentPage = event.page;
    //console.log(this.pagination.currentPage);    
    this.loadUsers();
  }

}
