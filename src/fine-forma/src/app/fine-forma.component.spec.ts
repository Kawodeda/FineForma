import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FineFormaComponent } from './fine-forma.component';

describe('AppComponent', () => {
    beforeEach(() => TestBed.configureTestingModule({
        imports: [RouterTestingModule],
        declarations: [FineFormaComponent]
    }));

    it('should create the app', () => {
        const fixture = TestBed.createComponent(FineFormaComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});