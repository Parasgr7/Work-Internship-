import { Component, OnInit } from '@angular/core';

import {Router } from '@angular/router';
import {BackendService} from './../backend.service';
@Component({
  selector: 'app-confirmed',
  templateUrl: './confirmed.component.html',
  styleUrls: ['./confirmed.component.css']
})
export class ConfirmedComponent implements OnInit {
public arr:any;
  constructor(private service:BackendService, private router:Router) { }

  ngOnInit() {
     this.fetchbooking();
  }
 fetchbooking()
        {
        this.service.fetchbookings().subscribe(data=>{
          if(data.status)
          {
          this.arr=JSON.parse(data.bookings).reverse();
          console.log(this.arr);

        }
        else{
          return null;
        }
        })
   
      }
}
