import { Routes } from '@angular/router';

export const routes: Routes = [

  { path: '', loadComponent:() => import('./components/home/home').then(m => m.Home) },
  //pruebas
  { path: 'prueba', loadComponent:() => import('./components/prueba/prueba').then(m => m.Prueba) },


];
