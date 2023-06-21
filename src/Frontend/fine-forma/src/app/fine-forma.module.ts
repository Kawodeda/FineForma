import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ApiClient, AuthenticationClient, IApiClient, UserClient } from 'fine-forma-api-clients';

import { FineFormaComponent } from './fine-forma.component';
import { EditorModule } from './editor/editor.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { IMAGE_BITMAP_PROVIDER } from './shared/i-image-bitmap-provider';
import { ImageBitmapProvider } from './shared/image-bitmap-provider';
import { AppRoutingModule } from './app-routing.module';
import { LogInModule } from './login/log-in.module';
import { VIEWER_PROVIDER } from './shared/i-viewer-provider';
import { ViewerProvider } from './shared/viewer-provider.service';
import { API_CLIENT } from './shared/api-client-token';
import { USER_CLIENT } from './shared/user-client-token';
import { USER_SERVICE } from './shared/i-user-service';
import { UserService } from './shared/user.service';
import { AUTHENTICATION_CLIENT } from './shared/authentication-client-token';
import { environment } from '../environments/environment';

@NgModule({
    declarations: [
        FineFormaComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        EditorModule,
        BrowserAnimationsModule,
        FontAwesomeModule,
        LogInModule
    ],
    providers: [
        { provide: IMAGE_BITMAP_PROVIDER, useClass: ImageBitmapProvider },
        { provide: VIEWER_PROVIDER, useClass: ViewerProvider },
        { provide: API_CLIENT, useFactory: () => new ApiClient(environment.backendUrl) },
        { provide: USER_CLIENT, useFactory: (apiClient: IApiClient) => new UserClient(apiClient), deps: [API_CLIENT] },
        { provide: USER_SERVICE, useClass: UserService },
        { provide: AUTHENTICATION_CLIENT, useFactory: (apiClient: IApiClient) => new AuthenticationClient(apiClient), deps: [API_CLIENT] }
    ],
    bootstrap: [FineFormaComponent]
})
export class FineFormaModule { }