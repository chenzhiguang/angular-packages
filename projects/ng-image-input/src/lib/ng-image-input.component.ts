import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  Renderer2,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

export interface ImageInputValue {
  file: File;
  base64: string;
}

type Callback = (value: ImageInputValue) => void;

@Component({
  selector: 'ng-image-input',
  templateUrl: './ng-image-input.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgImageInputComponent),
      multi: true,
    },
  ],
})
export class NgImageInputComponent implements ControlValueAccessor {
  @Input() accept: string = 'image/*';
  counter = [1];

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {}

  onChange: Callback;
  onTouched: Callback;

  writeValue(value: ImageInputValue): void {
    this.renderer.setProperty(this.elementRef.nativeElement, 'value', value);
  }

  registerOnChange(fn: Callback): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'disabled',
      isDisabled
    );
  }

  onImageChanged(evt: Event): void {
    const file = (<HTMLInputElement>evt.target)?.files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt: any) => {
      this.onChange({ file, base64: evt.target.result });
    };
    reader.readAsDataURL(file);
    this.counter.push(this.counter.length + 1);
  }
}
