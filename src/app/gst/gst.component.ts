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
value;
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

console.log(each);

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

this.value=data;
    $('#ta').val(data.gst_offers_list);

  });
}

saveEdit(){

                          if($('#ta').val())
                            {
                              var coor= new Array;
                               var obj=$('#ta').val().toString().split(',');          
                                this.value.gst_offers_list=obj;
                                this.value.gst= true
                            }
                            else {
                              var arr= new Array;
                              this.value.gst=false
                              this.value.gst_offers_list =arr; 
                          }

console.log(this.value);

this.service.uploadEditData(this.value,this.id).subscribe(data=>{

  if(data){
    alert('GST Offer have been succesfully Edited');
   location.reload();
  }
   });
  
 }

}
