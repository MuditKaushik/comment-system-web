import { NgModule } from '@angular/core';
import { DateTimePipe } from './datetime-pipe';
import { NamePipe } from './name-pipe';

@NgModule({
    declarations: [DateTimePipe, NamePipe],
    exports: [DateTimePipe, NamePipe]
})
export class AppPipeModule { }