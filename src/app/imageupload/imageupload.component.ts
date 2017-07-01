import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css']
})
export class ImageuploadComponent implements OnInit {

cloudinaryImage: any;

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'mirrors-app', uploadPreset: 'gallery' })
  );
  constructor() { 
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
      
      this.cloudinaryImage = JSON.parse(response);
console.log(this.cloudinaryImage);
      return {item, response, status, headers};
    };
    
  }

 
  ngOnInit() {
    

  }
  upload() {
        this.uploader.uploadAll();
        console.log(this.uploader.onSuccessItem);
    }

}
