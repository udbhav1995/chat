import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { User } from "./user.d";
import { UserService } from "./services/user.service";
import { FireService } from "../services/fire.service";
import { Phonenumber } from "./phonenumber";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  @ViewChild('recaptcha') recaptcha: ElementRef;
  user: User;
  private loginForm:FormGroup;
  private recaptchaVerifier: any;
  private phonenumber= new Phonenumber();

  constructor(private us:UserService, private fs:FireService, private alertCtrl: AlertController) {
    this.createForm();
  }

  createForm(){
    this.loginForm=new FormGroup({
      name:new FormControl('',[Validators.required]),
      country:new FormControl('91',[Validators.required,Validators.minLength(2)]),
      phone:new FormControl('',[Validators.required,Validators.minLength(10)])
    });
  }

  login(){
    this.phonenumber.country=this.loginForm.value.country;
    this.phonenumber.number=this.loginForm.value.phone;
    this.user={
      name:this.loginForm.value.name,
      phone: this.phonenumber
    };
    let loginIt=this.us.login(this.user.phone.e164,this.recaptchaVerifier);
    (<Promise<any>>loginIt.next().value).then(()=>{
      this.presentAlert(loginIt);
    });
    // this.ns.addNote(this.type,{content:this.loginForm.value.note,id:1});
    // this.addNote=false;
    // this.getNotes();
  }

  initReCaptcha(){
    this.recaptchaVerifier=this.fs.getRecaptchaVerifier(this.recaptcha.nativeElement.attributes.id.nodeValue);
    this.recaptchaVerifier.render();
  }

  async presentAlert(loginIt) {
    const alert = await this.alertCtrl.create({
      header: 'OTP Verifier',
      inputs: [
        {
          name: 'otp',
          type: 'number',
          placeholder: 'Enter OTP'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel')
          }
        }, {
          text: 'Ok',
          handler: (data) => {
            this.verifyUser(loginIt,data);
          }
        }
      ]
    });

    await alert.present();
  }

  verifyUser(loginIt,data){
    let confirmation=loginIt.next(data.otp);
    confirmation.value
    .catch( error => console.log(error, "Incorrect code entered?"));;
  }

  ngOnInit() {
    this.initReCaptcha();
  }

}
