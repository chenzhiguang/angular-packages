import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reorderable',
  templateUrl: './reorderable.page.html',
  styleUrls: ['./reorderable.page.scss'],
})
export class ReorderablePage implements OnInit {
  data: {
    id: number;
    label: string;
  }[] = [
  ];

  constructor() {
    //
  }

  ngOnInit(): void {
    //
  }
}
