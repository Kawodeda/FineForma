import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'ff-design-card',
    templateUrl: 'design-card.component.html'
})

export class DesignCardComponent {
    
    @Input() name = '';
    @Input() lastModified = new Date();

    @Output() openDesign = new EventEmitter<string>();
    @Output() deleteDesign = new EventEmitter<string>();

    open(): void {
        this.openDesign.emit(this.name);
    }

    delete(): void {
        this.deleteDesign.emit(this.name);
    }
}