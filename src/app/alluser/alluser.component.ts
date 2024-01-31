import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
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

}
