import { Component, OnInit, ViewChild } from '@angular/core';
import { NgReorderable, ReorderEvent } from 'ng-reorderable@dev';

@Component({
  selector: 'app-reorderable',
  templateUrl: './reorderable.page.html',
  styleUrls: ['./reorderable.page.scss'],
})
export class ReorderablePage implements OnInit {
  @ViewChild(NgReorderable) reorderable!: NgReorderable;

  data: {
    id: number;
    label: string;
  }[] = [
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

  constructor() {
    //
  }

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
    this.data.splice(e.newIndex, 0, this.data.splice(e.oldIndex, 1)[0]);
    this.reorderable.update();
  }
}
