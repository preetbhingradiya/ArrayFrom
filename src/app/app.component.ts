import { Component, DoCheck, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { customValidation } from './custom.validation';
import { HttpClientModule } from '@angular/common/http';
import { UserserviceService } from './services/userservice.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FormsModule,HttpClientModule,RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers:[UserserviceService]
})
export class AppComponent implements OnInit, DoCheck {
  title = 'taskProject';

  fromData: FormGroup;
  confrimeamil: string = ''

  show: boolean = true;
  value:boolean=true

  contectEmail: boolean = false
  contectPhone: boolean = false

  @ViewChild('beginner') beginner: ElementRef
  @ViewChild('intermediate') intermediate: ElementRef
  @ViewChild('advanced') advanced: ElementRef

  selectEmail: string = ''
  selectPhone: string = ''


  constructor(private fromBuilder: FormBuilder,private userService:UserserviceService) { }


  ngOnInit(): void {
    this.fromData = this.fromBuilder.group({
      name: [null, [Validators.required, Validators.pattern(/^[a-zA-Z]+$/)]],
      email: [null, [Validators.required, customValidation.emailvalidation]],
      confrimEmail: [null, [Validators.required, customValidation.emailvalidation]],
      phoneNo: [null, [Validators.required, Validators.pattern(/^\d{10}$/)]],

      userData: this.fromBuilder.array([])
    })
  }

  get userFromData() {
    return (this.fromData.get("userData") as FormArray).controls
  }

  addSkill() {
    this.value=false
    let control = this.fromBuilder.group({
      skill: ['', [Validators.required]],
      proficiency: ['', [Validators.required]],
    })
    return (this.fromData.get("userData") as FormArray).push(control)
  }

  submitData() {
    let data = this.fromData.value

    if (data.email == data.confrimEmail) {
      this.userService.postUser(data).subscribe((ele)=>{
        console.log(ele)
      })
    }
    else {
      this.confrimeamil = "Please Enter Same Email And ConfrimEmail"
    }

    this.fromData.reset()
  }

  removeField(index: any) {
    (this.fromData.get("userData") as FormArray).removeAt(index)
  }

  onItemChange(value: any) {
    let data = this.fromData.value

    if (value.srcElement.defaultValue == "Beginner") {
      data.proficiency = this.beginner.nativeElement.value
    }
    else if (value.srcElement.defaultValue == "Intermediate") {
      data.proficiency = this.intermediate.nativeElement.value
    }
    else {
      data.proficiency = this.advanced.nativeElement.value
    }
  }

  changeContect(value: any) {
    if (value.srcElement.defaultValue == "email") {
      this.contectEmail = true
      this.contectPhone = false
    }

    if (value.srcElement.defaultValue == "phoneNo") {
      this.contectPhone = true
      this.contectEmail = false
    }
    this.selectEmail = value.srcElement.defaultValue
  }
  
  ngDoCheck() {
    let data = this.fromData.value

    let skills = data.userData.map((ele) => ele.skill)
    let proficiency = data.userData.map((ele) => ele.proficiency)

    switch (this.selectEmail) {
      case 'email':
        if (data.name == null || data.email == null || data.confrimEmail == null || skills == '' || proficiency == '') {
          this.show = true
        }
        else {
          this.show = false
        }
        break;

      case 'phoneNo':
        if (data.name == null || data.phoneNo == null || skills == '' || proficiency == '') {
          this.show = true
        }
        else {
          this.show = false
        }
        break;

      default:"add valid"
        break;
    }
  }
}
