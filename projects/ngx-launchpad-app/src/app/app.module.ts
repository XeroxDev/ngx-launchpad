import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {NgxLaunchpadModule} from '../../../ngx-launchpad/src/lib/ngx-launchpad.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxLaunchpadModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
