import { ApplicationConfig, isDevMode } from '@angular/core';

import { provideStore } from '@ngrx/store';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { reducers } from './state';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [
    provideStore(reducers),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }), provideAnimationsAsync(),
  ],
};
