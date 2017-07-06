import { Component, OnInit } from '@angular/core';

import {BackendService} from './../backend.service';
import{Router} from '@angular/router';
@Component({
  selector: 'app-gst',
  templateUrl: './gst.component.html',
  styleUrls: ['./gst.component.css']
})
export class GstComponent implements OnInit {
public merdata;
public gst;
  constructor(private service:BackendService,private router:Router) { }

  ngOnInit() {
  }


  fetch(value){

    this.service.fetchMerchant(value).subscribe(data=>{
      this.merdata=data;
      console.log(this.merdata);

  

  });

}

submitGst(value)
{
      
    var each=new Array();
   
  
  $('input[name=fac]:checked').each(function(id)
      { 
      each.push($(this).val());
      
    });


for (var item of each) {
console.log(value.name);
if(value.name)
{
  this.gst = true;
}
this.service.updateGst(item,value.name,this.gst).subscribe(data=>{
      
      if(data)
      {
        location.reload();
      }

  

  });

}
    



}

public id;public da;
public gst_offer;
public st;
getEditId(val)
{
  console.log(val); 
  this.id=val;
  this.service.getGST(val).subscribe(data=>{

    $('#ta').val(data.gst_offer);

  });
}

saveEdit(){
   this.gst_offer = $('#ta').val();
  if(!$('#ta').val())
  {
    this.st= false;
  }
  else if($('#ta').val()){
    this.st=true;
  }
 
this.service.updateGst(this.id,this.gst_offer,this.st).subscribe(data=>{
  console.log(data);
  alert('Successfully Edited GST offer');
  location.reload();
})
}

}
