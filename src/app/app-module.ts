import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppComponent } from './app-component';
import { AppPipeModule } from './pipes/pipes-module';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppCoreModule } from './core/core-module';
import { AppRouteModule } from './app-routes';

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        AppCoreModule,
        AppRouteModule,
        AppPipeModule
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    declarations: [AppComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
