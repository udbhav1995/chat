import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { UserService } from "./user.service";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private user:UserService, private router :Router) { }

  canActivate(){
    return this.user.authenticated().pipe(map(auth=>{
      if(auth){
        return true;
      }
      else{  
        this.router.navigate(['/login']);
        return false;
      }
    }));

  }
}
