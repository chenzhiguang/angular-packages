import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
} from '@angular/core';
import { getPositions } from './helpers/get_positions';
import { createIndicator } from './helpers/create_indicator';
import { NgReorderableItemDirective } from './ng-reorderable-item.directive';
import { Position } from './types';
import { findIndex } from './helpers/find_index';

@Component({
  selector: 'ng-reorderable',
  templateUrl: './ng-reorderable.component.html',
  styleUrls: ['./ng-reorderable.component.scss'],
})
export class NgReorderableComponent {
  @Input() dataSource = [];

  active = false;
  ready = false;
  mousedown = false;
  startedAt = { left: 0, top: 0 };
  activeElement: HTMLDivElement | undefined;
  indicator: HTMLDivElement | undefined;
  positions: Position[] = [];

  @HostListener('window:mousemove', ['$event']) onMouseMove(
    e: MouseEvent
  ): void {
    if (!this.mousedown) {
      return;
    }

    if (!this.active) {
      if (
        Math.abs(e.clientY - this.startedAt.top) > 10 ||
        Math.abs(e.clientX - this.startedAt.left) > 10
      ) {
        this.active = true;
      }
      return;
    }

    if (!this.ready) {
      this.positions = getPositions(
        this.elementRef.nativeElement as HTMLElement
      );
      if (this.activeElement) {
        this.indicator = createIndicator(this.activeElement);
      }
      this.ready = true;
    }

    if (this.indicator) {
      this.indicator.style.left = e.clientX + 6 + 'px';
      this.indicator.style.top = e.clientY + 6 + 'px';
    }
  }

  @HostListener('window:mouseup', ['$event']) onMouseUp(): void {
    this.active = false;
    this.mousedown = false;
    this.ready = false;
    this.positions = [];
    if (this.activeElement) {
      this.activeElement.className = '';
      this.activeElement = void 0;
    }
    if (this.indicator) {
      this.indicator.parentNode?.removeChild(this.indicator);
    }
  }

  @ContentChild(NgReorderableItemDirective) child!: NgReorderableItemDirective;

  constructor(private elementRef: ElementRef) {}

  startDragging(e: MouseEvent): void {
    if (this.dataSource.length < 2) {
      return;
    }
    const element = e.currentTarget as HTMLDivElement;
    element.className = 'active';
    this.activeElement = element;
    this.startedAt = {
      left: e.clientX,
      top: e.clientY,
    };
    this.mousedown = true;
  }
}
