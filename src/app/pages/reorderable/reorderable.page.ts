import { Component, OnInit, ViewChild } from '@angular/core';
import {
  NgReorderable,
  ReorderEvent,
  moveItemInArray,
} from 'ng-reorderable@dev';

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
    { id: 9, label: 'I' },
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
    moveItemInArray(this.data, e.oldIndex, e.newIndex);
    this.reorderable.update();
  }
}
