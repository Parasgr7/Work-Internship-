import { Component, OnInit,ElementRef,AfterViewInit } from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';

import{BackendService} from './../backend.service';
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

  constructor(private _formBuilder:FormBuilder,private elementRef: ElementRef,private service:BackendService) { }

  ngOnInit() {
   
  }
  ngAfterViewInit() {
    
  }
 onsave(val)
 {
    this.service.package(val).subscribe(data=>{
      console.log(data);
    })
  }


}
