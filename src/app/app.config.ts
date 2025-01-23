import {ApplicationConfig} from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {routes} from './app.routes';
import {provideClientHydration} from '@angular/platform-browser';
import {provideCharts, withDefaultRegisterables} from 'ng2-charts';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withComponentInputBinding()), provideClientHydration(), provideCharts(withDefaultRegisterables()), provideCharts(withDefaultRegisterables()), provideCharts(withDefaultRegisterables())]
};
