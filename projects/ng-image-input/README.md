# NgImageInput

## Install

```bash
npm install ng-image-input
```

## Usage

### Step 1:

Import `NgImageInputModule`

```typescript
import { NgImageInputModule } from "ng-image-input";

@NgModule({
  imports: [
    //...
    NgImageInputModule,
  ],
})
export class AppModule {}
```

### Step 2:

Use ng-image-input in the same way as regular input element

```html
<!--app.component.html-->
<ng-image-input [(ngModel)]="image" (ngModelChange)="onChange($event)">
</ng-image-input>

<div>
  <img *ngIf="image" [src]="image.base64" />
</div>
```

```typescript
// app.component.ts
import { Component } from "@angular/core";
import { ImageInputValue } from "ng-image-input";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent {
  image: ImageInputValue;

  onChange(image: ImageInputValue) {
    console.log(image);
  }

  save() {
    console.log(this.image?.file);
  }
}
```
