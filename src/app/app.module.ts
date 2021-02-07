import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { HomeComponent } from './home/home.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DetailsComponent } from './details/details.component';
import { NzRateModule } from 'ng-zorro-antd/rate';
import { DocsComponent } from './documentation/documentation.component';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent, HomeComponent, DetailsComponent, DocsComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NzIconModule,
    NzButtonModule,
    NzToolTipModule,
    NzTableModule,
    NzInputModule,
    NzRateModule,
    NzLayoutModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
