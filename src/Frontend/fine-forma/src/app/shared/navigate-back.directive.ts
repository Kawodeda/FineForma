import { Location } from '@angular/common';
import { Directive, HostListener } from '@angular/core';

@Directive({ selector: '[ffNavigateBack]' })
export class NavigateBackDirective {
    
    private readonly _location: Location;
    
    constructor(location: Location) {
        this._location = location;
    }

    @HostListener('click') onClick(): void {
        this._navigateBack();
    }

    private _navigateBack(): void {
        this._location.back();
    }
}