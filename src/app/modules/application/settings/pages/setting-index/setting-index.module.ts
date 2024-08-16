import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SettingIndexPageRoutingModule } from './setting-index-routing.module';

import { NgIconsModule } from '@ng-icons/core';
import {
  lucideBoxes,
  lucideChevronRight,
  lucideInfo,
  lucideLanguages,
  lucideLogOut,
  lucideMail,
  lucideSettings,
  lucideShirt,
  lucideStore,
  lucideSunMoon,
  lucideUserCog,
  lucideUsers,
  lucideWashingMachine,
} from '@ng-icons/lucide';
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
      lucideChevronRight,
      lucideMail,
      lucideSettings,
      lucideStore,
      lucideUserCog,
      lucideWashingMachine,
      lucideShirt,
      lucideUsers,
      lucideBoxes,
      lucideLanguages,
      lucideSunMoon,
      lucideInfo,
      lucideLogOut,
    }),
  ],
  declarations: [SettingIndexPage],
})
export class SettingIndexPageModule {}
