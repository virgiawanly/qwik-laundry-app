import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { NgIconsModule } from '@ng-icons/core';
import {
  hugeAddCircleHalfDot,
  hugeChartLineData02,
  hugeHome03,
  hugeNote05,
  hugeSettings03,
} from '@ng-icons/huge-icons';
import { TranslateModule } from '@ngx-translate/core';
import { ApplicationLayoutComponent } from './application-layout.component';

@NgModule({
  declarations: [ApplicationLayoutComponent],
  imports: [
    CommonModule,
    IonicModule,
    TranslateModule,
    NgIconsModule.withIcons({
      hugeHome03,
      hugeNote05,
      hugeChartLineData02,
      hugeSettings03,
      hugeAddCircleHalfDot,
    }),
  ],
  exports: [ApplicationLayoutComponent],
})
export class ApplicationLayoutModule {}
