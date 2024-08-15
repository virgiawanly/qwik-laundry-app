import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { NgIconsModule } from '@ng-icons/core';
import { lucideLock, lucideMail } from '@ng-icons/lucide';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LoginPageRoutingModule,
    NgIconsModule.withIcons({
      lucideMail,
      lucideLock,
    }),
  ],
  declarations: [LoginPage],
})
export class LoginPageModule {}
