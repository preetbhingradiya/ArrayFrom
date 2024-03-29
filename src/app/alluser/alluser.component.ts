import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserserviceService } from '../services/userservice.service';

@Component({
  selector: 'app-alluser',
  standalone: true,
  imports: [CommonModule,HttpClientModule],
  templateUrl: './alluser.component.html',
  styleUrl: './alluser.component.scss',
})
export class AlluserComponent implements OnInit{

  users:any

  @Output() updateName=new EventEmitter<string>();
  @Output() updateEmail=new EventEmitter<string>();
  @Output() updateConfirmEmail=new EventEmitter<string>();
  @Output() updateSelect=new EventEmitter<string>();
  @Output() updatePhone=new EventEmitter<any>();
  @Output() updateSkill=new EventEmitter<string>();
  @Output() updateProficiency=new EventEmitter<string>();
  @Output() updateID=new EventEmitter<any>();

  @Output() editSubBtn=new EventEmitter<boolean>()


  @Input() selectUserOption:any;

  constructor(private userService:UserserviceService){}

  ngOnInit() {
    this.getUser()
  }

  getUser(){
    this.userService.getUser().subscribe((ele)=>{
      this.users=ele
    })
  }

  deleteUser(id:any){
    this.userService.deleteUser(id).subscribe((ele)=>{
      this.getUser()
    })
  }

  updateUser(data:any,id:any){
    this.updateName.emit(data.name);
    this.updateEmail.emit(data.email)
    this.updateConfirmEmail.emit(data.confrimEmail)
    this.updateSelect.emit(data.phoneNo?this.selectUserOption="phoneNo":this.selectUserOption="email")
    this.updatePhone.emit(data.phoneNo)
    this.updateSkill.emit(data.userData.map((ele)=>ele.skill))
    this.updateProficiency.emit(data.userData.map((ele)=>ele.proficiency))
    this.updateID.emit(id)
    this.editSubBtn.emit(false)

  }

}
