import { Component, OnInit, Input } from '@angular/core';
import { Message } from 'src/app/_models/message';
import { UserService } from 'src/app/_services/user.service';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { error } from 'protractor';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-message',
  templateUrl: './member-message.component.html',
  styleUrls: ['./member-message.component.css']
})
export class MemberMessageComponent implements OnInit {

  @Input() recipientId : number;
  messages : Message[];
  newMessage : any = {};

  constructor(private userService:UserService,private authService:AuthService,
      private alertify:AlertifyService) { }

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(){
    const currentUserId = +this.authService.decodedtoken.nameid;
    this.userService.getMessageThread(this.authService.decodedtoken.nameid,this.recipientId)
    .pipe(
      tap(messages => {
        for(let i=0;i<messages.length;i++){
          if(messages[i].isRead === false && messages[i].recipientId === currentUserId){
            this.userService.markAsRead(currentUserId,messages[i].id);
          }
        }
      })
    )
    .subscribe(message => {
      this.messages = message;
    },error => {
      this.alertify.error(error);
    });
  }

  sendMessage(){
    this.newMessage.recipientId = this.recipientId;
    this.userService.sendMessage(this.authService.decodedtoken.nameid,this.newMessage)
    .subscribe((message: Message) => {      
      this.messages.unshift(message);
      this.newMessage.content = '';
    },error => {
      this.alertify.error(error);
    }); 
  }

}
