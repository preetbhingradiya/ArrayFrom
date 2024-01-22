import { Component, ElementRef, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormArray } from '@angular/forms';
import { customValidation } from './custom.validation';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'taskProject';

  fromData: FormGroup;
  confrimeamil: string = ''
  value:boolean=true

  contectEmail: boolean = false
  contectPhone: boolean = false

  @ViewChild('beginner') beginner: ElementRef
  @ViewChild('intermediate') intermediate: ElementRef
  @ViewChild('advanced') advanced: ElementRef

  constructor(private fromBuilder: FormBuilder) { }

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

    Swal.fire("User Can add Successfully")

    if (data.email == data.confrimEmail) {
      console.log(data)
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
  }

}
