import { Component, OnInit } from '@angular/core';
import { ChatService } from "./services/chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  chats:any;

  constructor(private cs:ChatService) { }

  ngOnInit() {
    this.chats=this.cs.getChats().valueChanges();
  }

  addChat(){
    this.cs.addChat({content:"haha"});
  }

}
