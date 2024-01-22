import { AbstractControl, EmailValidator } from "@angular/forms";

export class customValidation{
  static emailvalidation(control:AbstractControl){
    let email=control.value
    if(email && !email.endsWith("@gmail.com")){
      return {emailValid:true}
    }
    return null
  }
}
