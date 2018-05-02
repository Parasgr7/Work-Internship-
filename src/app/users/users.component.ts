import { Component, OnInit } from '@angular/core';

import {Entry} from './../model.interface';
import {Router } from '@angular/router';
import {BackendService} from './../backend.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  public entry: Entry;
public arr:any;
public arr1:any;
  constructor(private service: BackendService, private router: Router) { }

  ngOnInit() {
     this.entry = {    
                       role:'',
                       authority:'',
                       username:'',
                       password:''
                    };
    this.fetchrole();
    this.fetchuserdata();
  }
   fetchrole()
  
  {
    this.service.fetchdata().subscribe(data=>{
    this.arr=data;
    console.log(this.arr);

    });
  }
   
  save(value:Entry)
  {
    console.log(value);
    this.service.submituser(value).subscribe(data=>{
      if(data)
      {
alert('User have been succesfully added');
    location.reload();

      }

    });

  }

   fetchuserdata()
  
  {
    this.service.fetchuserdata().subscribe(data=>{
      this.arr1=data;
      console.log(this.arr1);
    });

   
  }


edit(val){
  console.log(val);
  this.service.editUser(val).subscribe(data=>{

  })
}
}
