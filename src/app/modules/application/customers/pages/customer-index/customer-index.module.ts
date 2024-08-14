import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgIconsModule } from '@ng-icons/core';
import {
  hugeFilterHorizontal,
  hugeMoreHorizontal,
  hugeSearch01,
  hugeStoreLocation02,
  hugeUser,
  hugeWhatsapp,
} from '@ng-icons/huge-icons';
import { lucideChevronLeft } from '@ng-icons/lucide';
import { TranslateModule } from '@ngx-translate/core';
import { CustomerIndexPageRoutingModule } from './customer-index-routing.module';
import { CustomerIndexPage } from './customer-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CustomerIndexPageRoutingModule,
    TranslateModule.forChild({ extend: true }),
    NgIconsModule.withIcons({
      lucideChevronLeft,
      hugeStoreLocation02,
      hugeFilterHorizontal,
      hugeSearch01,
      hugeMoreHorizontal,
      hugeWhatsapp,
      hugeUser,
    }),
  ],
  declarations: [CustomerIndexPage],
})
export class CustomerIndexPageModule {}
