import { Injectable } from '@angular/core';
// import { User } from "../user.d";
import * as firebase from "firebase";
import { isEmpty } from "lodash";
import { FireService } from "../../services/fire.service";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _user: firebase.User;

  subscriptions:any={};

  get user(){
    return this._user;
  }

  set user(user){
    this._user=user;
  }

  constructor(private fs:FireService) { }

  authenticated(){
    return Observable.create(observer=>{
      if(isEmpty(this.user)){
        this.subscriptions.subs=this.fs.getAuthState().subscribe(user=>{
          if(!isEmpty(user)){
            this.user=user;
            observer.next(true);
            this.subscriptions.ubs.unsubscribe();
            observer.complete();
          }
          else{
            observer.next(false);
            this.subscriptions.ubs.unsubscribe();
          }
        },()=>{
          observer.next(false)
          this.subscriptions.ubs.unsubscribe();
          observer.complete();
        });
      }
      else{
        observer.next(true);
        this.subscriptions.ubs.unsubscribe();
        observer.complete();
      }
    });
  }

  logout(){
    // wdm
  }

  *login(phone,appVerify){
    let confirmationResult=null;
    let otpResult= this.fs.otp(phone,appVerify).then(result => {
      confirmationResult =  result
    });
    // .catch( error => console.log(error) );
    let verificationCode = (yield otpResult);
    let confResult= null;

    if(!isEmpty(confirmationResult)){
      let conf=confirmationResult.confirm(verificationCode);
      confResult=conf.then( result => {
        this._saveUser(result.user);
        // this.user = result.user;
      });
    }

    return confResult;
  }

  private _saveUser(user){
    this.user=user;
    this.fs.getAuthState().subscribe(authState=>{
      console.log(authState);
    });
  }

}
