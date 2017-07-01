import { Component, OnInit } from '@angular/core';

import {FormGroup, FormBuilder} from '@angular/forms';
import {BackendService} from './../backend.service';
import{Router} from '@angular/router';

@Component({
  selector: 'app-multiple',
  templateUrl: './multiple.component.html',
  styleUrls: ['./multiple.component.css']
})
export class MultipleComponent implements OnInit {
public merdata
  constructor(private _formBuilder:FormBuilder,private service:BackendService,private router:Router) { }
dataForm: FormGroup;
  ngOnInit() {
     this.dataForm= this._formBuilder.group({
    
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

submit(value){
  console.log(value);

}
}