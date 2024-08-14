import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicSlides } from '@ionic/angular';
import { register } from 'swiper/element/bundle';

register();

@Component({
  selector: 'app-transaction-index',
  templateUrl: './transaction-index.page.html',
  styleUrls: ['./transaction-index.page.scss'],
})
export class TransactionIndexPage implements OnInit {
  activeTabIndex: number = 0;
  swiperModules = [IonicSlides];

  @ViewChild('tabSwiper') tabSwiper?: ElementRef;

  constructor() {}

  ngOnInit() {}

  onSlideChange(event: any) {
    const activeIndex = event.detail?.[0]?.activeIndex ?? 0;
    this.activeTabIndex = activeIndex;
  }

  onSegmentTabChange(number: any) {
    this.activeTabIndex = number;
    console.log(this.activeTabIndex);
    this.tabSwiper?.nativeElement?.swiper.slideTo(number);
  }
}
