import { Injectable } from '@angular/core';
import { FireService } from "../../services/fire.service";
import { AngularFirestoreCollection } from 'angularfire2/firestore';
import { Chat } from "../chat.d";


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private frs:FireService) { }

  chatsObj: AngularFirestoreCollection<Chat[]>

  getChats(){
    let dbObj=<AngularFirestoreCollection<Chat[]>> this.frs.getCollection('chats');
    this.chatsObj=dbObj;
    return dbObj;
  }

  addChat(chat){
    this.frs.pushData(this.chatsObj,chat);
  }

}
