import { Component, OnInit } from '@angular/core';


import {Router } from '@angular/router';
import {BackendService} from './../backend.service';
@Component({
  selector: 'app-pending',
  templateUrl: './pending.component.html',
  styleUrls: ['./pending.component.css']
})
export class PendingComponent implements OnInit {

  constructor(private service:BackendService,router:Router) { }
public arr:any;
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
      
      confirm(val)
      {
        if(confirm("Do you want to Confirm this Booking")==true)
        {
          this.service.confirm(val).subscribe(data=>{
            if(data)
            {alert('Booking Confirmed');window.location.reload();}
          });
        }
          
      }
        cancel(val)
      {   if(confirm("Do you want to Cancel this Booking")==true)
        {
          this.service.cancel(val).subscribe(data=>{
            if(data)
            {alert('Booking Cancelled');window.location.reload();}
          })
        }
          
          
      }

}
