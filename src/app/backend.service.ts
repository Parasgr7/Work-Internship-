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
   
    return this.http.post('https://localhost:3000/api/createrole',body,{headers:headers})
          .map(res=>res.json());


  }
   fetchdata()
 {  
    let headers= new Headers();
    headers.append('Content-Type','application/json'); 
   
    return this.http.get('https://localhost:3000/api/fetchrole',{headers:headers})
          .map(res=>res.json());
             

  }
   submituser(value:Entry)
 {  
   const body= JSON.stringify(value);
    let headers= new Headers();
    headers.append('Content-Type','application/json'); 
   
    return this.http.post('https://localhost:3000/api/submituser',body,{headers:headers})
          .map(res=>res.json());


  }
   fetchuserdata()
 {  
    let headers= new Headers();
    headers.append('Content-Type','application/json'); 
   
    return this.http.get('https://localhost:3000/api/fetchuserdata',{headers:headers})
          .map(res=>res.json());
             

  }

 fetchbookings()
 {  

    let headers= new Headers();
    headers.append('Content-Type','application/json');
   return this.http.get('https://localhost:3000/api/fetchbooking',{headers:headers}).map(res=>res.json());

  }

  confirm(val){
  var id=val;
   let headers= new Headers();
    headers.append('Content-Type','application/json');
      return this.http.get('http://localhost:3000/api/confirmbookings/'+id,{headers:headers})
          .map(res=>res.json());

  }

  cancel(val){
    var id=val;
    
     let headers= new Headers();

    headers.append('Content-Type','application/json');

    return this.http.get('https://localhost:3000/api/cancelbookings/'+id,{headers:headers})
          .map(res=>res.json());

  }
  uploadData(value){
  
     let headers= new Headers();

    headers.append('Content-Type','application/json');

    return this.http.post('https://localhost:3000/api/uploadData/',value,{headers:headers})
          .map(res=>res.json());

  }

editUser(value)
{
    let headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.put('https://localhost:3000/api/editUser/'+value,{headers:headers})
          .map(res=>res.json());

}
 
SaveEditRole(id,value)
{
    let headers= new Headers();

    headers.append('Content-Type','application/json');
    return this.http.put('https://localhost:3000/api/editRole/'+id,value,{headers:headers})
          .map(res=>res.json());

}

}
