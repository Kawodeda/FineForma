import { Component, Inject, OnInit } from '@angular/core';

import { IUserService, USER_SERVICE } from './shared/i-user-service';

@Component({
    // eslint-disable-next-line @angular-eslint/component-selector
    selector: 'fine-forma',
    templateUrl: './fine-forma.component.html',
    styleUrls: ['./fine-forma.component.scss']
})
export class FineFormaComponent implements OnInit {

    private readonly _userService: IUserService;

    constructor(@Inject(USER_SERVICE) userService: IUserService) {
        this._userService = userService;
    }

    ngOnInit(): void {
        this._userService.updateState();
    }
}