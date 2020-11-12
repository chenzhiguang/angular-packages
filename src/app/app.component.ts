import { Component } from '@angular/core';
import { ImageInputValue } from 'ng-image-input@dev';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  image: ImageInputValue;

  onChange(e: ImageInputValue) {
    console.log(e);
  }

  save() {
    console.log(this.image);
  }
}
