import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { AppComponent } from './app.component';
import { RoleComponent } from './role/role.component';
import { UsersComponent } from './users/users.component';
import { UploadComponent } from './upload/upload.component';
import { EditComponent } from './edit/edit.component';
import { BookingComponent } from './booking/booking.component';
import { ImageuploadComponent } from './imageupload/imageupload.component';
import{BackendService} from './backend.service';
import { PendingComponent } from './pending/pending.component';
import { ConfirmedComponent } from './confirmed/confirmed.component';
import { DiscountComponent } from './discount/discount.component';
import { MultipleComponent } from './multiple/multiple.component';

import { Ng2CloudinaryModule } from './../../node_modules/ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { GstComponent } from './gst/gst.component';
import { NotificationComponent } from './notification/notification.component';
import { FilterPipe } from './filter.pipe';
import { BannnerComponent } from './bannner/bannner.component';
import { Filter1Pipe } from './filter1.pipe';


@NgModule({
  declarations: [
    AppComponent,
    RoleComponent,
    UsersComponent,
    UploadComponent,
    EditComponent,
    BookingComponent,
    ImageuploadComponent,
    PendingComponent,
    ConfirmedComponent,
    DiscountComponent,
    MultipleComponent,
    GstComponent,
    NotificationComponent,
    FilterPipe,
    BannnerComponent,
    Filter1Pipe
  ],
  imports: [
    BrowserModule,
      FormsModule, 
      ReactiveFormsModule,
     
    HttpModule,
    RouterModule.forRoot([
     {path:'role',component:RoleComponent},
     {path:'users',component: UsersComponent},
      {path:'upload',component: UploadComponent},

      {path:'edit',component: EditComponent},

      {path:'booking',component: BookingComponent,
      children:[ 
                    {path:'',component:BookingComponent},
                    {path:'pending',component:PendingComponent},
                    {path:'confirmed',component:ConfirmedComponent}
      ]
      },      
      {path:'imageupload',component: ImageuploadComponent},

      {path:'discount',component: DiscountComponent},
      
      {path:'multiple',component: MultipleComponent},
      
      {path:'gst',component: GstComponent},
      
      {path:'notification',component: NotificationComponent},
      
      {path:'banner',component: BannnerComponent}
  ]),
  
        Ng2CloudinaryModule,
        FileUploadModule
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
