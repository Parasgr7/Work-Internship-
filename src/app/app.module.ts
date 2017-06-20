import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule,Routes } from '@angular/router';

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
import { InMemoryWebApiModule } from 'angular2-in-memory-web-api';
import { DiscountComponent } from './discount/discount.component';

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
    DiscountComponent
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

      {path:'booking',component: BookingComponent}, 
       
                    {path:'pending',component:PendingComponent},
                    {path:'confirmed',component:ConfirmedComponent},
              
      
      {path:'imageupload',component: ImageuploadComponent},

      {path:'discount',component: DiscountComponent},

  ])
  ],
  providers: [BackendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
