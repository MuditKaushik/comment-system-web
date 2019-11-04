import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse, HttpRequest, HttpEvent, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { AppCommonService } from './common-service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
    private readonly commonHeaders: HttpHeaders = new HttpHeaders();
    constructor(private commonService: AppCommonService) {
        this.commonHeaders.set('accept', 'appilcation/json');
        this.commonHeaders.set('content-type', 'multipart/form-data;appilcation/json');
        this.commonHeaders.set('response-type', 'multipart/form-data;application/json');
    }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let copyRequest: HttpRequest<any> = req.clone({
            headers: this.commonHeaders,
            responseType: 'json'
        });
        return next.handle(copyRequest).pipe(tap(() => {
            this.commonService.showLoaderObservable.next(true);
        }), map((httpEvent: HttpEvent<any>) => {
            if (httpEvent instanceof HttpResponse) {
                this.commonService.showLoaderObservable.next(false);
            }
            return httpEvent;
        }), catchError((err) => {
            this.commonService.showLoaderObservable.next(false);
            return throwError(err);
        }));
    }
}
