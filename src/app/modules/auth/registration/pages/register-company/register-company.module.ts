import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgIconsModule } from '@ng-icons/core';
import { lucideChevronLeft } from '@ng-icons/lucide';
import { TranslateModule } from '@ngx-translate/core';
import { RegisterCompanyPageRoutingModule } from './register-company-routing.module';
import { RegisterCompanyPage } from './register-company.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegisterCompanyPageRoutingModule,
    TranslateModule.forChild({ extend: true }),
    NgIconsModule.withIcons({
      lucideChevronLeft,
    }),
  ],
  declarations: [RegisterCompanyPage],
})
export class RegisterCompanyPageModule {}
