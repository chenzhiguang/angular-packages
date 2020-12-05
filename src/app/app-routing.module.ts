import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { AppCommonModule } from './app-common.module';
import { ImageInputPage } from './pages/image-input/image-input.page';
import { ReorderablePage } from './pages/reorderable/reorderable.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'ng-image-input',
    component: ImageInputPage,
  },
  {
    path: 'ng-reorderable',
    component: ReorderablePage,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    AppCommonModule,
  ],
  declarations: [HomePage, ImageInputPage, ReorderablePage],
  exports: [RouterModule],
})
export class AppRoutingModule {}
