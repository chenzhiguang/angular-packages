# NgReorderable

This drag and drop reorder module supports both horizontal and vertical list,
including any kind of wrapped list.

_NOTICE:_

- Only tested in Chrome
- Check the example blow, there is a special rule for css

![ng-reorderable](https://github.com/chenzhiguang/angular-packages/blob/master/docs/assets/examples/ng-reorderable.gif?raw=true)

## Installation

```bash
npm install ng-reorderable
```

## Example

### Step 1:

Import `NgImageInputModule`

```typescript
import { NgReorderable } from 'ng-reorderable';

@NgModule({
  imports: [
    //...
    NgReorderable,
  ],
})
export class AppModule {}
```

### Step 2:

```typescript
//reorderable.page.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { NgReorderable, ReorderEvent, moveItemInArray } from 'ng-reorderable';

interface Data {
  id: number;
  label: string;
}

@Component({
  selector: 'app-reorderable',
  templateUrl: './reorderable.page.html',
  styleUrls: ['./reorderable.page.scss'],
})
export class ReorderablePage implements OnInit {
  @ViewChild(NgReorderable) reorderable!: NgReorderable;

  data: Data[] = [
    { id: 1, label: 'A' },
    { id: 2, label: 'B' },
    { id: 3, label: 'C' },
    { id: 4, label: 'D' },
    { id: 5, label: 'E' },
    { id: 6, label: 'F' },
    { id: 7, label: 'G' },
    { id: 8, label: 'H' },
    //{ id: 9, label: 'I' },
  ];

  ngOnInit(): void {
    /*
    setTimeout(() => {
      this.data.push({
        id: 10,
        label: 'J',
      });
      this.reorderable.update();
    }, 2000);
    */
  }

  reorder(e: ReorderEvent): void {
    moveItemInArray(this.data, e.fromIndex, e.toIndex);
    this.reorderable.update();
  }
}
```

```html
<!--reorderable.page.html-->
<ng-reorderable
  floatClassName="demo-float"
  class="demo"
  [dataSource]="data"
  (reorder)="reorder($event)"
>
  <ng-template ng-reorderable-item let-element>
    <div class="box flex-cc flex-column">
      <div class="flex-cc">
        <div>{{element.id}}:</div>
        <div>{{element.label}}</div>
      </div>
    </div>
  </ng-template>
</ng-reorderable>
```

```scss
// reorderable.page.scss

ng-reorderable {
  width: 300px;
}

// Do not nest item style in the other styles like this:
// .demo {
//   .box {...}
// }
// it does not work for the floating element clone

.box {
  flex-basis: 33.33%;
  height: 100px;
  background-color: #f8f8f8;
  border: 1px solid #999;
  font-size: 30px;
  cursor: move;
}
```
