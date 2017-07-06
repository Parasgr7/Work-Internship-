import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {BackendService} from './../backend.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { PipeTransform, Pipe } from '@angular/core';
import {FilterPipe} from './../filter.pipe';
 
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
cloudinaryImage: any;
dataForm: FormGroup;
public val;
public notif;
public user;
public data;

public value;
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'mirrors-app', uploadPreset: 'notification' })
  );
  constructor(private formBuilder:FormBuilder,private service:BackendService,private router:Router) {
    
   }

  ngOnInit() {
     this.dataForm= this.formBuilder.group({
      type:[],
      title:[],
      message:[],
     offer_title:[],
     offer_btn_title:[],
     offer_desc:[],
     event_id:[],
     event_name:[],
     redirect_screen:[],
     data:this.formBuilder.group({
        image_url:[],
        landing_type:[],
        notification_type:[]   
      })
      
    });

    this.fetch();

  }



fetch()

{
  this.service.fetchNoti().subscribe(data=>{
    this.value=data;  
  
  })
}


// upload image to cloudinary & fetch push notification data from template.
  upload(val) 
    {
    

        this.uploader.uploadAll();

        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      
        this.cloudinaryImage = JSON.parse(response);
      
                if(this.cloudinaryImage)
                {
                  val.data.image_url= this.cloudinaryImage.url;
                  val.data.notification_type='Big';
                  
                }
              
                
              
        return {item, response, status, headers};
    };

                if(!this.uploader.isUploading)
                {

                  val.data.image_url= null;
                  val.data.notification_type='Small';
                  
                }


                console.log(val);
      if(val.type=='General')
      {

                        val.title=val.offer_title;
                        
                        val.message=val.offer_desc;
                        console.log(val);
      }

  this.data=val;
}


pushAll()
{
  for(var item of this.value)
  {
    if(this.cloudinaryImage)
    {
  
   this.service.pushNotif(this.data,item.key).subscribe(data=>{
     alert('Notification Send to all Customers');
     location.reload();
   })

    }
  }
}

checked()
{
  console.log(!this.data);
  var each= new Array;
  var keys= new Array;
      $('input[name=check]:checked').each(function(id)
                    { 
                    each.push($(this).val());
                    
                  });

                  for(var iter of each )
                  {
                    for(var item of this.value)
                      {
                        if(iter===item.user_id)
                        {
                            keys.push(item.key);
                        }
                      }           
                  }
                  console.log(keys);
for(var key of keys)
  {
  if(this.cloudinaryImage)
  {
   this.service.pushNotif(this.data,key).subscribe(data=>{
    
     alert('Notification Send to Checkeed Customers');
     location.reload();
   })

  }
  }              
  
}


}
