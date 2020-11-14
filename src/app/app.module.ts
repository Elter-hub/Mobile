import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {IonicStorageModule} from '@ionic/storage';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SignUpComponent} from './modules/auth/components/signup/sign-up.component';
import {ChangeImageComponent} from './modules/auth/components/change-image/change-image.component';
import {AuthInterceptorService} from './auth-interceptor.service';

@NgModule({
    declarations: [AppComponent, SignUpComponent, ChangeImageComponent],
    entryComponents: [],
    imports: [BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        IonicModule.forRoot(),
        IonicStorageModule.forRoot(),
        AppRoutingModule],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
        StatusBar,
        SplashScreen,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
