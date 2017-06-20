import { Component, OnInit,ElementRef,AfterViewInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-discount',
  templateUrl: './discount.component.html',
  styleUrls: ['./discount.component.css']
})
export class DiscountComponent implements OnInit,AfterViewInit {
public sum;
public sum1;

public sum2;
public sum3;

  constructor(private _formBuilder:FormBuilder,private elementRef: ElementRef) { }

  ngOnInit() {
   
  }
  ngAfterViewInit() {
      $('input[name="radio"]').on('click', function () {
        
        if ($(this).val() === 'Yes') {
            $('#off').prop("disabled", false);
            $('#rate').prop("disabled", "disabled");
            
            
        } else {
            $('#rate').prop("disabled", false);
            $('#off').prop("disabled", "disabled");
        }
    });
      $('input[name="radio1"]').on('click', function () {
        if ($(this).val() === 'Ha') {
            $('#con').prop("disabled", false);
            $('#con1').prop("disabled", "disabled");
            
        } else {
            $('#con1').prop("disabled", false);
            $('#con').prop("disabled", "disabled");
        }
    });
    
  }
  onsave(val){
  var off=$('#off').val();
  var rate=$('#rate').val();
  var condition=$('#con').val();
  var condition1=$('#con1').val();
  if(off && !condition1)
  {
 this.sum= off+'% off on total bill amount';
console.log(this.sum);
  }
  else if(off && condition1){
    this.sum1=off+'% off on minimum amount '+condition1;
    console.log(this.sum1);

  }else if(rate &&!condition1){
    this.sum2=rate+'Rs off on total bill amount ';
    console.log(this.sum2);

  }else if(rate && condition1){
    this.sum3=rate+'Rs off on minimum amount '+condition1;
    console.log(this.sum3);

  }
 
val.discount=this.sum;
    console.log(val);
  }


}
