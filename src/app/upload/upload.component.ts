import { ViewChild,Component, OnInit,AfterViewInit,ElementRef } from '@angular/core';
import{Router} from '@angular/router';
import {FormGroup, FormBuilder} from '@angular/forms';
import{BackendService} from './../backend.service';
@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit,AfterViewInit {

  dataForm : FormGroup; 
public el;
public arr:any;
public data=[];
  constructor(private router:Router,private _formBuilder:FormBuilder,private elementRef: ElementRef,private service:BackendService) { 

      this.el=elementRef;
  }
 
  ngOnInit() {
    
    this.dataForm= this._formBuilder.group({
    name:[],
    type:[],
    ppl:this._formBuilder.group({
      price:[],
      date:[],
      categories:[]
    }),
    subscription:this._formBuilder.group({
      price:[],
      date:[],
      categories:[]
    }),
      address: this._formBuilder.group({
        shop_no:[],
        street:[],
        locality:[],
        city:[],
        state:[],
        pincode:[]
      }),
      information:this._formBuilder.group({
        
        services:[],
        facilities:[],
        cost_rating:[],
        gender:[],
        head:this._formBuilder.group({
                name:[],
                designation:[]
      })  
      }),
      contact:this._formBuilder.group({
        contact_no:[],
        phone_number:[],
        email:[],
        website:[]
      }),
      loc:this._formBuilder.group({
        coordinates:[]
      }),
      work_hours:this._formBuilder.group({
        opening_time:[],
        closing_time:[],
        holiday:[]
      }),
      discount:this._formBuilder.group({
        percentage:[],
        condition:[]   
      }),
      special_offers:[],
      exclusive:[]


    });

 
  
}
ngAfterViewInit() {
}
   
  


  uploadData(){
    var fac=new Array();
    var ser =new Array();
    var hol =new Array();
    $('input[name=fac]:checked').each(function(id)
      { 
      fac.push($(this).val());
  
      
    });
    $('input[name=ser]:checked').each(function(id)
      { 
      ser.push($(this).val());
  
      
    });

     var longitude=$('#longitude').val();
     var latitude=$('#latitude').val();
 var sum=new Array;
 sum.push(latitude);
 sum.push(longitude);

 if($('#offers').val())
 {
   this.dataForm.patchValue({exclusive: true});
 }
 else
  {
   this.dataForm.patchValue({exclusive: false});
 }

if($('#offers').val())
                            {
                              
 var arra= $('#offers').val().toString().split(',');
                            }
                            else { arra=[]}


    this.dataForm.patchValue({information:{facilities: fac }});

    this.dataForm.patchValue({information:{services: ser }});

    this.dataForm.patchValue({loc:{coordinates: sum}});
    this.dataForm.value.special_offers=arra;
    console.log(this.dataForm.value);
  
   this.service.uploadData(this.dataForm.value).subscribe(data=>{

  if(data){
    console.log(data);
    alert('Merchant Data have been succesfully updated');
   location.reload();
   
  }
   });


  }
}
