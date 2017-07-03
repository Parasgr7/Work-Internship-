import { Component, OnInit } from '@angular/core';

import {FormGroup, FormBuilder} from '@angular/forms';
import {BackendService} from './../backend.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  dataForm : FormGroup;
public merdata:any;
public id;
public packages:any;
public len;
public del_id;
public edit_id;
public data1;
  constructor(private _formBuilder:FormBuilder,private service:BackendService,private router:Router) { }

  ngOnInit() {
     this.dataForm= this._formBuilder.group({
    name:[],
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
  fetch(value){
    console.log(value);
    this.service.fetchMerchant(value).subscribe(data=>{
      this.merdata=data;
      console.log(this.merdata);
    });


  }
  getId(val){
    this.id=val;  
    console.log(this.id);
  }

onsave(val){
    console.log(val);
    this.service.addPackage(this.id,val).subscribe(data=>{
    if(data._id){
      alert('Package have been succesfully added');
      location.reload();
    }
    });
      
  }
  getPackages(id){

this.service.fetchPackages(id).subscribe(data=>{
   this.del_id=id;
      this.packages=data;
      this.len=data.length;
      console.log(data);
    })
  }

  delete(id){
    console.log(id);
    this.service.deletePackage(id,this.del_id).subscribe(data=>{
      if(data)
      {alert('Package have been succesfully deleted');
      location.reload();}
    })

  }

  getEditId(id){
    this.edit_id=id;
    console.log(this.edit_id);
    this.service.getMerchant(id).subscribe(data=>{
      
      console.log(data);
    $('#mer').val(data.name);
    $('#latitude').val(data.loc.coordinates[0]);
    $('#longitude').val(data.loc.coordinates[1]);
    $('input[name="shop_no"]').val(data.address.shop_no);
    $('input[name="street"]').val(data.address.street);
    $('input[name="locality"]').val(data.address.locality);
    $('input[name="city"]').val(data.address.city);
    $('input[name="state"]').val(data.address.state);
    $('input[name="pincode"]').val(data.address.pincode);
    $('input[name="email"]').val(data.contact.email);
    $('input[name="website"]').val(data.contact.website);
    $('input[name="contact_no"]').val(data.contact.contact_no[0]);
    $('input[name="phone_number"]').val(data.contact.phone_number);
    $('#offers').val(data.special_offers[0]);
    $('input[name="off"]').val(data.discount.percentage);
    $('input[name="condition"]').val(data.discount.condition);
    $('input[name="opening_time"]').val(data.work_hours.opening_time);
    $('input[name="closing_time"]').val(data.work_hours.closing_time);
    $('input[name="name"]').val(data.information.head.name);
    $('input[name="designation"]').val(data.information.head.designation);
     data.information.facilities.forEach(function(item){
if(item=="Card")
{
$('#r1').prop('checked',true);
}
if(item=="AC")
{
$('#r2').prop('checked',true);
}
if(item=="Wi-Fi")
{
$('#r3').prop('checked',true);
}
if(item=="Parking")
{
$('#r4').prop('checked',true);
}
if(item=="TV")
{
$('#r5').prop('checked',true);
}
});

  data.information.services.forEach(function(item){
if(item=="Salon")
{
$('#s1').prop('checked',true);
}
if(item=="Spa")
{
$('#s2').prop('checked',true);
}
if(item=="Nails")
{
$('#s3').prop('checked',true);
}
if(item=="Make-Up")
{
$('#s4').prop('checked',true);
}
if(item=="Tattoo")
{
$('#s5').prop('checked',true);
}
if(item=="Pets")
{
$('#s6').prop('checked',true);
}
if(item=="Bridal")
{
$('#s7').prop('checked',true);
}
});
 
  if(data.information.cost_rating==1){
$("#q1").prop('checked', true);
  }
  if(data.information.cost_rating==2){
$("#q2").prop('checked', true);
  }
  if(data.information.cost_rating==3){
$("#q3").prop('checked', true);
  }
  if(data.information.cost_rating==4){
$("#q3").prop('checked', true);
  }

if(data.information.gender=="Male"){
$("#w1").prop('checked', true);
  }
  if(data.information.gender=="Women"){
$("#w2").prop('checked', true);
  }
  if(data.information.gender=="Unisex"){
$("#w3").prop('checked', true);
  }

  if(data.work_hours.holiday=="Monday"){
$("#h1").prop('checked', true);
  }
  if(data.work_hours.holiday=="Tuesday"){
$("#h2").prop('checked', true);
  }
  if(data.work_hours.holiday=="Wednesday"){
$("#h3").prop('checked', true);
  }if(data.work_hours.holiday=="Thursday"){
$("#h4").prop('checked', true);
  }
  if(data.work_hours.holiday=="Friday"){
$("#h5").prop('checked', true);
  }
  if(data.work_hours.holiday=="Saturday"){
$("#h6").prop('checked', true);
  }if(data.work_hours.holiday=="Sunday"){
  $("#h7").prop('checked', true);

}


  });


}


uploadData(val){

 var longitude=$('#longitude').val();
 var latitude=$('#latitude').val();
 var sum=new Array;
 sum.push(latitude);
 sum.push(longitude);



 val.name= $('#mer').val();
 
 val.loc.coordinates=sum;
 val.address.shop_no=$('input[name="shop_no"]').val();
val.address.street=$('input[name="street"]').val();
val.address.locality=$('input[name="locality"]').val();
val.address.city=$('input[name="city"]').val();
val.address.state=$('input[name="state"]').val();
val.address.pincode=$('input[name="pincode"]').val();
val.contact.email=$('input[name="email"]').val();
val.contact.website=$('input[name="website"]').val();;
val.contact.contact_no=$('input[name="contact_no"]').val();;
val.contact.phone_number=$('input[name="phone_number"]').val();
val.discount.percentage=$('input[name="off"]').val();
val.special_offers=$('#offers').val();
val.discount.condition=$('input[name="condition"]').val();
val.work_hours.opening_time=$('input[name="opening_time"]').val();
val.work_hours.closing_time=$('input[name="closing_time"]').val();
val.information.head.name=$('input[name="name"]').val();
val.information.head.designation=$('input[name="designation"]').val();

 var faci=new Array; 
if($('#r1').prop('checked'))
{
  faci.push("Card");
}
if($('#r2').prop('checked'))
{
faci.push("AC");
}
if($('#r3').prop('checked'))
{
faci.push("Wi-Fi");
}
if($('#r4').prop('checked'))
{
faci.push("Parking");
}
if($('#r5').prop('checked'))
{
  faci.push("TV");
}
val.information.facilities=faci;


 var ser=new Array; 
if($('#s1').prop('checked'))
{
  ser.push("Salon");
}
if($('#s2').prop('checked'))
{
ser.push("Spa");
}
if($('#s3').prop('checked'))
{
ser.push("Nails");
}
if($('#s4').prop('checked'))
{
ser.push("Make-Up");
}
if($('#s5').prop('checked'))
{
  ser.push("Tattoo");
}
if($('#s6').prop('checked'))
{
  ser.push("Pets");
}
if($('#s7').prop('checked'))
{
  ser.push("Bridal");
}
val.information.services=ser;


 if($("#q1").is(':checked')){
val.information.cost_rating==1;
  }
  if($("#q2").is(':checked')){
val.information.cost_rating==2;
  }
  if($("#q3").is(':checked')){
val.information.cost_rating==3;
  }
  if($("#q4").is(':checked')){
val.information.cost_rating==4;
  }

   if($("#h1").is(':checked')){
val.work_hours.holiday=="Monday";
  }
  if($("#h2").is(':checked')){
val.work_hours.holiday=="Tuesday";
  }
  if($("#h3").is(':checked')){
val.work_hours.holiday=="Wednesday";
  }
  if($("#h4").is(':checked')){
val.work_hours.holiday=="Thursday";
  } if($("#h5").is(':checked')){
val.work_hours.holiday=="Friday";
  }
  if($("#h7").is(':checked')){
val.work_hours.holiday=="Saturday";
  }
  if($("#h6").is(':checked')){
val.work_hours.holiday=="Sunday";
  }


if($("#w1").is(':checked')){
val.information.geder="Men"
}
if($("#w1").is(':checked')){
val.information.geder="Women"
}
if($("#w1").is(':checked')){
val.information.geder="Unisex"
}

 console.log(val);
 //location.reload();
}



 


}