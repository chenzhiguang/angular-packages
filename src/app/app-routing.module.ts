import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePage } from './pages/home/home.page';
import { AppCommonModule } from './app-common.module';
import { ImageInputPage } from './pages/image-input/image-input.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: 'ng-image-input',
    component: ImageInputPage,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' }),
    AppCommonModule,
  ],
  declarations: [HomePage, ImageInputPage],
  exports: [RouterModule],
})
export class AppRoutingModule {}
