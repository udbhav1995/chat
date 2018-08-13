import { Injectable } from '@angular/core';
// import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase  from "firebase";
// import { Chat } from "../chat/chat.d";

@Injectable({
  providedIn: 'root'
})
export class FireService {


  constructor(private afAuth: AngularFireAuth, private afFirestore: AngularFirestore) {
  }

  getCollection(path:string){
    // let dbObj = this.afDatabase.list(path).valueChanges();
    let dbObj: AngularFirestoreCollection<any[]> = this.afFirestore.collection<any>(path);
    return dbObj;
  }

  pushData(dbObj,data:any){
    let dbData=dbObj.add(data);
    return dbData;
  }

  getData(path:string){
    this.getCollection(path);
  }

  getRecaptchaVerifier(id:string){
    return new firebase.auth.RecaptchaVerifier(id,{'size': 'invisible'});
  }

  otp(phone,applicationVerifier){
    return new Promise((resolve,reject)=>{
      this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(()=>{
        this.afAuth.auth.signInWithPhoneNumber(phone, applicationVerifier).then(res=>resolve(res)).catch(e=>reject(e));
      }).catch(e=>reject(e));
    });
  }

  getAuthState(){
    return this.afAuth.authState;
  }

  getCurrentUser(){
    return this.afAuth.auth.currentUser;
  }

}
