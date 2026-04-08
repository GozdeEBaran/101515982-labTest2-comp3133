import { Routes } from '@angular/router';
import { Characterlist } from './characterlist/characterlist';
import { Characterfilter } from './characterfilter/characterfilter';
import { Characterdetails } from './characterdetails/characterdetails';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'characters' },
  { path: 'characters', component: Characterlist },
  { path: 'by-house', component: Characterfilter },
  { path: 'character/:id', component: Characterdetails },
  { path: '**', redirectTo: 'characters' },
];
