import { Component, OnInit } from '@angular/core';
import {Entry} from './../model.interface';
import {Router } from '@angular/router';
import {BackendService} from './../backend.service';
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
public entry: Entry;
public arr: any;

public _id: any;

public res: any;
  constructor(private service:BackendService,private router:Router) { }

  ngOnInit() {
    this.entry = {    
                       role:'',
                       authority:'',
                       username:'',
                       password:''
                    }

       this.fetchdata();
  }



   fetchdata()
  
  {
    this.service.fetchdata().subscribe(data=>{  
    this.arr=data;

    console.log(this.arr);
    });
  }
  
  onsave(value:Entry)
  {
console.log(value);

this.service.createrole(value).subscribe(bro=>{
  if(bro)
  {
    alert('Role is succesfully added');
    location.reload();
  }
   
})
  }

editRole(val,res){
  console.log(val);
  console.log(res);
  this._id=val;
  this.res=res;
  $('#role').val(res.role);
  if(res.booking)
  {
    $('#r4').prop('checked',true);
  }
 
  if(res.createrole)
  {
    $('#r1').prop('checked',true);
  }
   if(res.createuser)
  {
    $('#r2').prop('checked',true);
  }
  if(res.imageupload)
  {
    $('#r5').prop('checked',true);
  }
  if(res.uploaddata)
  {
    $('#r3').prop('checked',true);
  }

  


}
SaveEditRole(value){

  if($('#role').val())
{
  value.role=$('#role').val();
}

  if(this.res.booking||$('#r4').prop("checked"))
  {
    value.role4=true;
  }
 
  if(this.res.createrole||$('#r1').prop("checked"))
  {
    value.role1=true;
  }
   if(this.res.createuser||$('#r2').prop("checked"))
  {
    value.role2=true;
  }
  if(this.res.imageupload||$('#r5').prop("checked"))
  {
    value.role5=true;
  }
  if(this.res.uploaddata||$('#r3').prop("checked"))
  {
    value.role3=true;
  }



  // this.service.SaveEditRole(this._id,value).subscribe(data=>{

  // });

}
  

  
 
}


