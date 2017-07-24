import { Injectable } from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';
import {Entry} from './model.interface';

import {RequestOptions, Request, RequestMethod} from '@angular/http';
@Injectable()
export class BackendService {
  public body;
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
package(val){
   let headers= new Headers();

    headers.append('Content-Type','application/json');
    return this.http.get('https://mirrors-dashboard.herokuapp.com/api/package/',{headers:headers})
          .map(res=>res.json());

}

fetchMerchant(value){
   const body= value;
      let headers= new Headers();
    return this.http.post('https://mirrors-dashboard.herokuapp.com/api/fetchMerchant/',body,{headers:headers})
          .map(res=>res.json());

}


addPackage(id,val){
        let headers= new Headers();

    headers.append('Content-Type','application/json');
    return this.http.post('https://mirrors-dashboard.herokuapp.com/api/addPackage/'+id,val,{headers:headers})
          .map(res=>res.json());

}

fetchPackages(id){
      let headers= new Headers();

    headers.append('Content-Type','application/json');
    return this.http.get('https://mirrors-dashboard.herokuapp.com/api/getPackage/'+id,{headers:headers})
          .map(res=>res.json());

}

deletePackage(id,id1){
      let headers= new Headers();

    headers.append('Content-Type','application/json');
    return this.http.get('https://mirrors-dashboard.herokuapp.com/api/deletePackage/'+id+'/'+id1,{headers:headers})
          .map(res=>res.json());

}

getMerchant(id){
           let headers= new Headers();

    headers.append('Content-Type','application/json');
    return this.http.get('https://mirrors-dashboard.herokuapp.com/api/getMerchant/'+id,{headers:headers})
          .map(res=>res.json());

}

getImages(id){
           let headers= new Headers();

    headers.append('Content-Type','application/json');
    return this.http.get('https://mirrors-dashboard.herokuapp.com/api/getMerchant/'+id,{headers:headers})
          .map(res=>res.json().images);

}

updateGst(id,name,gst){
      const body= JSON.stringify({"name": name,"gst": gst})
           let headers= new Headers();

    headers.append('Content-Type','application/json');
    return this.http.post('https://mirrors-dashboard.herokuapp.com/api/updateGst/'+id,body,{headers:headers})
          .map(res=>res.json());

}


updateExc(id,val){

           let headers= new Headers();
           console.log();
      if(val.discount.percentage&&val.discount.condition)
      {
            
             this.body=JSON.stringify(val);
      }
      else
      {
             
             this.body=JSON.stringify({"special_offers":val.special_offers});
      }
    headers.append('Content-Type','application/json');
    return this.http.post('https://mirrors-dashboard.herokuapp.com/api/updateExc/'+id,this.body,{headers:headers})
          .map(res=>res.json());

}


getGST(id)
{
           let headers= new Headers();
     
    headers.append('Content-Type','application/json');
    return this.http.get('https://mirrors-dashboard.herokuapp.com/api/getGST/'+id,{headers:headers})
          .map(res=>res.json()); 
}

fetchNoti()
{
           let headers= new Headers();
            headers.append('Content-Type','application/json');
    return this.http.get('https://mirrors-dashboard.herokuapp.com/api/fetchNoti',{headers:headers})
          .map(res=>res.json()); 
      
}

getUser(id,value)
{
      let headers= new Headers();
            headers.append('Content-Type','application/json');
    return this.http.post('https://mirrors-dashboard.herokuapp.com/api/getUser/'+id,value,{headers:headers})
          .map(res=>res.json()); 
}

pushNotif(data,key)
{
      const body=JSON.stringify({'key':key,'info':data}); 
      
      let headers= new Headers();
            headers.append('Content-Type','application/json');
    return this.http.post('https://mirrors-dashboard.herokuapp.com/api/pushNotif',body,{headers:headers})
          .map(res=>res.json()); 
}

addBanner(data)
{
      const body=JSON.stringify(data); 
     
      let headers= new Headers();
            headers.append('Content-Type','application/json');
    return this.http.post('https://mirrors-dashboard.herokuapp.com/api/addBanner',body,{headers:headers})
          .map(res=>res.json()); 
}


  uploadEditData(value,id){
  
     let headers= new Headers();

    headers.append('Content-Type','application/json');


    return this.http.post('https://mirrors-dashboard.herokuapp.com/api/uploadEditData/'+id,value,{headers:headers})

          .map(res=>res.json());

  }


multiple(id,value){
  
     let headers= new Headers();

    headers.append('Content-Type','application/json');


    return this.http.post('https://mirrors-dashboard.herokuapp.com/api/multiple/'+id,value,{headers:headers})

          .map(res=>res.json());

  }

  rate(id,value){
  
     let headers= new Headers();

    headers.append('Content-Type','application/json');


    return this.http.post('https://mirrors-dashboard.herokuapp.com/api/rateCard/'+id,value,{headers:headers})

          .map(res=>res.json());

  }

  logo(id,value){
        const body=JSON.stringify({'url':value});
  
     let headers= new Headers();

    headers.append('Content-Type','application/json');


    return this.http.post('https://mirrors-dashboard.herokuapp.com/api/logo/'+id,body,{headers:headers})

          .map(res=>res.json());

  }

 cover(id,value){
        const body=JSON.stringify({'url':value});
  
     let headers= new Headers();

    headers.append('Content-Type','application/json');


    return this.http.post('https://mirrors-dashboard.herokuapp.com/api/cover/'+id,body,{headers:headers})

          .map(res=>res.json());

  }


 deleteMerchant(id){
  
     let headers= new Headers();

    headers.append('Content-Type','application/json');


    return this.http.get('https://mirrors-dashboard.herokuapp.com/api/deleteMerchant/'+id,{headers:headers})

          .map(res=>res.json());

  }


 deleteImages(id,id1){
  
     let headers= new Headers();
    headers.append('Content-Type','application/json');
    return this.http.get('https://mirrors-dashboard.herokuapp.com/api/deleteImages/'+id+'/'+id1,{headers:headers})
          .map(res=>res.json());

  }


editPackage(pac_id,val){

      let headers= new Headers();

    headers.append('Content-Type','application/json');
    return this.http.put('https://mirrors-dashboard.herokuapp.com/api/editPackage/'+pac_id,val,{headers:headers})
          .map(res=>res.json());

}

}
