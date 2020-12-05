import { Component } from '@angular/core';
import { ImageInputValue } from 'ng-image-input@dev';

@Component({
  selector: 'app-image-input',
  templateUrl: './image-input.page.html',
  styleUrls: ['./image-input.page.scss'],
})
export class ImageInputPage {
  constructor() {}

  image: ImageInputValue | undefined;

  onChange(image: ImageInputValue): void {
    console.log(image);
  }

  save(): void {
    console.log(this.image?.file);
  }
}
