import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorComponent } from './editor/editor.component';
import { PageNotFoundComponent } from './page-not-found.component';

const ROUTES: Routes = [
    { path: 'editor', component: EditorComponent },
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
