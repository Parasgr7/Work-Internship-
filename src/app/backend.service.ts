import { Injectable } from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Entry} from './model.interface';

import {RequestOptions, Request, RequestMethod} from '@angular/http';
@Injectable()
export class BackendService {
  
 constructor(private http:Http) { }
  createrole(value:Entry)
 {  
   const body= JSON.stringify(value);
    let headers= new Headers();
    headers.append('Content-Type','application/json'); 
   
    return this.http.post('https://mirrors-dashboard.herokuapp.com/api/createrole',body,{headers:headers})
          .map(res=>res.json());


  }
   fetchdata()
 {  
    let headers= new Headers();
    headers.append('Content-Type','application/json'); 
   
    return this.http.get('https://mirrors-dashboard.herokuapp.com/api/fetchrole',{headers:headers})
          .map(res=>res.json());
             

  }
   submituser(value:Entry)
 {  
   const body= JSON.stringify(value);
    let headers= new Headers();
    headers.append('Content-Type','application/json'); 
   
    return this.http.post('https://mirrors-dashboard.herokuapp.com/api/submituser',body,{headers:headers})
          .map(res=>res.json());


  }
   fetchuserdata()
 {  
    let headers= new Headers();
    headers.append('Content-Type','application/json'); 
   
    return this.http.get('https://mirrors-dashboard.herokuapp.com/api/fetchuserdata',{headers:headers})
          .map(res=>res.json());
             

  }

 fetchbookings()
 {  

    let headers= new Headers();
    headers.append('Content-Type','application/json');
   return this.http.get('https://mirrors-dashboard.herokuapp.com/api/fetchbooking',{headers:headers}).map(res=>res.json());

  }

  confirm(val){
  var id=val;
   let headers= new Headers();
    headers.append('Content-Type','application/json');
      return this.http.get('https://mirrors-dashboard.herokuapp.com/api/confirmbookings/'+id,{headers:headers})
          .map(res=>res.json());

  }

  cancel(val){
    var id=val;
    
     let headers= new Headers();

    headers.append('Content-Type','application/json');

    return this.http.get('https://mirrors-dashboard.herokuapp.com/api/cancelbookings/'+id,{headers:headers})
          .map(res=>res.json());

  }
  uploadData(value){
  
     let headers= new Headers();

    headers.append('Content-Type','application/json');

    return this.http.post('https://mirrors-dashboard.herokuapp.com/api/uploadData/',value,{headers:headers})
          .map(res=>res.json());

  }

editUser(value)
{
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('https://mirrors-dashboard.herokuapp.com/api/editUser/'+value,{headers:headers})
          .map(res=>res.json());

}
 
SaveEditRole(id,value)
{
    let headers= new Headers();

    headers.append('Content-Type','application/json');
    return this.http.put('https://mirrors-dashboard.herokuapp.com/api/editRole/'+id,value,{headers:headers})
          .map(res=>res.json());

}

}
