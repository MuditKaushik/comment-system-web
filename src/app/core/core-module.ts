import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CommentHttp } from './http/comment-http';
import { CommentService } from './http-service/comment-http-service';
import { AppCommonService } from './services/common-service';
import { HttpInterceptorService } from './services/http-interceptor-service';
import { AppBannerMessageComponent, AppLoaderComponent, AppToastMessageComponent } from './common';
@NgModule({
    imports: [
        HttpClientModule,
        CommonModule
    ],
    declarations: [
        AppBannerMessageComponent,
        AppToastMessageComponent,
        AppLoaderComponent
    ],
    exports: [
        AppBannerMessageComponent,
        AppToastMessageComponent,
        AppLoaderComponent
    ],
    providers: [
        CommentHttp,
        CommentService,
        AppCommonService,
        { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true }
    ]
})
export class AppCoreModule { }
