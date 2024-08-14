import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { NgIconsModule } from '@ng-icons/core';
import { hugeStoreLocation02 } from '@ng-icons/huge-icons';
import { TranslateModule } from '@ngx-translate/core';
import { SwiperDirective } from 'src/app/shared/directives/swiper.directive';
import { TransactionIndexPageRoutingModule } from './transaction-index-routing.module';
import { TransactionIndexPage } from './transaction-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionIndexPageRoutingModule,
    SwiperDirective,
    TranslateModule.forChild(),
    NgIconsModule.withIcons({
      hugeStoreLocation02,
    }),
  ],
  declarations: [TransactionIndexPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TransactionIndexPageModule {}
