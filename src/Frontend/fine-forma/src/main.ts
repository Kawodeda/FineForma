import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { FineFormaModule } from './app/fine-forma.module';

platformBrowserDynamic().bootstrapModule(FineFormaModule)
    .catch(err => console.error(err));