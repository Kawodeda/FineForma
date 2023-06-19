import { Component } from '@angular/core';

@Component({
    selector: 'ff-save-design',
    templateUrl: 'save-design.component.html',
    styleUrls: ['save-design.component.scss']
})

export class SaveDesignComponent {
    
    designName = '';

    get saveEnabled(): boolean {
        return this.designName.length !== 0;
    }
}