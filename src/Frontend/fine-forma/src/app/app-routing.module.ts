import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorComponent } from './editor/editor.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { LogInComponent } from './login/log-in.component';
import { SignUpComponent } from './login/sign-up.component';

const ROUTES: Routes = [
    { path: 'editor', component: EditorComponent },
    { path: 'login', component: LogInComponent },
    { path: 'signup', component: SignUpComponent },
    { path: '', redirectTo: '/editor', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule],
    declarations: [],
    providers: []
})
export class AppRoutingModule {

}
