import { Component, OnInit } from '@angular/core';
import {BackendService} from './../backend.service';
import {FormGroup, FormBuilder} from '@angular/forms';
import{Router} from '@angular/router';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';

@Component({
  selector: 'app-bannner',
  templateUrl: './bannner.component.html',
  styleUrls: ['./bannner.component.css']
})
export class BannnerComponent implements OnInit {

cloudinaryImage: any;

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'mirrors-app', uploadPreset: 'banner' })
  );
public merdata;
  constructor(private _formBuilder:FormBuilder,private service:BackendService,private router:Router) {}
dataForm: FormGroup;

  ngOnInit() {
     this.dataForm= this._formBuilder.group({
    name:[],
    banner:[],
    merchants:[],
  
     loc:this._formBuilder.group({
       type:"Point",
        coordinates:[]
      }),
    pos:[],
    days:[],
      type:this._formBuilder.group({
        name:[],
        subtype:[],
        action:[]   
      })
    });
    
  }

 fetch(value){
console.log(value);
    this.service.fetchMerchant(value).subscribe(data=>{
      this.merdata=data;
      console.log(this.merdata);
    });


}
upload(val) {
        
      this.uploader.uploadAll();
      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => 
      {
        this.cloudinaryImage = JSON.parse(response);
        console.log(this.cloudinaryImage);
        if(this.cloudinaryImage)
        {
                              var each=new Array();
                                     
                              $('input[name=days]:checked').each(function(id)
                                  { 
                                  each.push(Number($(this).val()));
                                  
                                });
                               this.dataForm.patchValue({days:each});
                              

                              if ($("#uid").prop("checked"))
                              {
                                var coor= new Array;
                               var obj=$('#uid').val().toString().split(',');
                               for(var i=0;i<2;i++)
                               {
                                coor.push(Number(obj[i]));
                               }

                                 this.dataForm.patchValue({loc:{coordinates:coor}});
                              }
                              
                              var arr= new Array();
                              $('input[name=event]:checked').each(function(id)
                                { 
                                  arr.push($(this).val());
                                  
                                });
                               this.dataForm.patchValue({merchants:arr});
                              

                                this.dataForm.patchValue({banner:this.cloudinaryImage.url});

                              

                                console.log(this.dataForm.value);

                        this.service.addBanner(this.dataForm.value).subscribe(data=>{
                        alert('Banner Uploaded Successfully');
                        location.reload();
                      })
                            
        }
        return {item, response, status, headers};
      };
                          
                  
  }
  



}
