import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

import {FormGroup, FormBuilder} from '@angular/forms';
import {BackendService} from './../backend.service';
@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {

cloudinaryImage: any;

  uploaderMultiple: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'mirrors-app', uploadPreset: 'gallery' })
  );
  uploaderRate: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'mirrors-app', uploadPreset: 'ratecard' })
  );
  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'mirrors-app', uploadPreset: 'mprofile' })
  );
  constructor(private _formBuilder:FormBuilder,private service:BackendService,private router:Router ) { 
      
  }
mdata;
len;
public merdata;
public id;
public arr: Array<object>=[];
 count;
  ngOnInit() {
  }
fetch(value){
    console.log(value);
    this.service.fetchMerchant(value).subscribe(data=>{
      this.merdata=data;
      console.log(this.merdata);
    });
}

   
  

  upload() {
   
        this.uploaderMultiple.uploadAll();
        this.uploaderMultiple.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      
      this.cloudinaryImage = JSON.parse(response);
console.log(this.cloudinaryImage);
var obj={};
obj["link"]=this.cloudinaryImage.url;
      this.arr.push(obj);

if(this.arr.length==this.uploaderMultiple.queue.length)
{
  this.service.multiple(this.id,this.arr).subscribe(data=>{
    if(data)
    {    alert('Gallery Images has been Uploaded');
        location.reload();
    }
  })

}

      return {item, response, status, headers};
    };

  }

   uploadRate() {
   
        this.uploaderRate.uploadAll();
        this.uploaderRate.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      
      this.cloudinaryImage = JSON.parse(response);
console.log(this.cloudinaryImage);

      this.arr.push(this.cloudinaryImage.url);

if(this.arr.length==this.uploaderRate.queue.length)
{
  console.log('Yeaf');
  this.service.rate(this.id,this.arr).subscribe(data=>{
    if(data)
    {   alert('Rate Card has been Uploaded');
        location.reload();
    }
   })

}

      return {item, response, status, headers};
    };

  }
  

   uploadLogo() {
   
        this.uploader.uploadAll();
        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      
      this.cloudinaryImage = JSON.parse(response);
console.log(this.cloudinaryImage);
  if(this.cloudinaryImage)
  {
  this.service.logo(this.id,this.cloudinaryImage.url).subscribe(data=>{
    if(data)
    {   alert('Logo Image has been Uploaded');
        location.reload();
    }
   })

}

      return {item, response, status, headers};
    };

  }
  

   uploadCover() {
   
        this.uploader.uploadAll();
        this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      
      this.cloudinaryImage = JSON.parse(response);
console.log(this.cloudinaryImage);
  if(this.cloudinaryImage)
  {
  this.service.cover(this.id,this.cloudinaryImage.url).subscribe(data=>{
    if(data)
    {   alert('Cover Image has been Uploaded');
        location.reload();
    }
   })

}

      return {item, response, status, headers};
    };

  }


    getId(val)
    {
      this.id=val;
    }

getImage(val)
{
  this.id=val;
  this.service.getImages(val).subscribe(data=>{
 
 this.mdata=data;
 this.len=data.length;
  });
}


delete(id)
{  console.log(this.id);
  console.log(id);
this.service.deleteImages(this.id,id).subscribe(data=>{
      if(data)
      {
        alert('Images Deleted Successfully');
        location.reload();
      }
})

}


}


