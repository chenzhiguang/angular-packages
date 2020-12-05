import { Component } from "@angular/core";
import { ImageInputValue } from "ng-image-input@dev";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  image: ImageInputValue | undefined;

  onChange(image: ImageInputValue): void {
    console.log(image);
  }

  save(): void {
    console.log(this.image?.file);
  }
}
