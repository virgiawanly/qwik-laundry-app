import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingIndexPageRoutingModule } from './setting-index-routing.module';

import { NgIconsModule } from '@ng-icons/core';
import {
  hugeAccountSetting02,
  hugeArrowLeft01,
  hugeDashboardSquareAdd,
  hugeInformationCircle,
  hugeLanguageSquare,
  hugeLogout03,
  hugeLongSleeveShirt,
  hugeMail01,
  hugeSettings01,
  hugeStore02,
  hugeStoreLocation02,
  hugeSun02,
  hugeTimer02,
  hugeUserMultiple02
} from '@ng-icons/huge-icons';
import { lucideChevronRight } from '@ng-icons/lucide';
import { TranslateModule } from '@ngx-translate/core';
import { SettingIndexPage } from './setting-index.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SettingIndexPageRoutingModule,
    TranslateModule.forChild({
      extend: true,
    }),
    NgIconsModule.withIcons({
      hugeArrowLeft01,
      hugeStoreLocation02,
      hugeStore02,
      hugeAccountSetting02,
      hugeTimer02,
      hugeLongSleeveShirt,
      hugeUserMultiple02,
      hugeDashboardSquareAdd,
      hugeLanguageSquare,
      hugeSun02,
      hugeInformationCircle,
      hugeLogout03,
      lucideChevronRight,
      hugeMail01,
      hugeSettings01,
    }),
  ],
  declarations: [SettingIndexPage],
})
export class SettingIndexPageModule {}
