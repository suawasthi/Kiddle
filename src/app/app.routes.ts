import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/hero-section/hero-section.component').then(m => m.HeroSectionComponent)
  },
  {
    path: 'stories',
    loadComponent: () => import('./components/story-list/story-list.component').then(m => m.StoryListComponent)
  },
  {
    path: 'story/:id',
    loadComponent: () => import('./components/story-detail/story-detail.component').then(m => m.StoryDetailComponent)
  },
  {
    path: 'activities',
    loadComponent: () => import('./components/activities/activities.component').then(m => m.ActivitiesComponent)
  },
  {
    path: '**',
    redirectTo: ''
  }
];
