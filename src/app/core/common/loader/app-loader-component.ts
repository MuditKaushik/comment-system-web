import { Component, OnInit } from '@angular/core';
import { AppCommonService } from '../../services/common-service';
@Component({
    selector: 'app-loader',
    templateUrl: 'app/core/common/loader/app-loader-template.html'
})
export class AppLoaderComponent implements OnInit {
    enableLoader: boolean = false;
    constructor(private commonService: AppCommonService) { }
    ngOnInit(): void {
        this.commonService.showLoaderObservable.subscribe((isEnable) => {
            this.enableLoader = isEnable;
        }, (err) => {
            this.enableLoader = false;
        });
    }
}
