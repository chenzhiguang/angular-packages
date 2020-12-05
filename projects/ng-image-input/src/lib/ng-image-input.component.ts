import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  Renderer2,
} from "@angular/core";
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from "@angular/forms";

export interface ImageInputValue {
  file: File;
  base64: string;
}

type Callback = (value: ImageInputValue) => void;

@Component({
  selector: "ng-image-input",
  templateUrl: "./ng-image-input.component.html",
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NgImageInputComponent),
      multi: true,
    },
  ],
})
export class NgImageInputComponent implements ControlValueAccessor {
  @Input() accept = "image/*";
  counter = [1];

  constructor(public elementRef: ElementRef, private renderer: Renderer2) {}

  onChange!: Callback;
  onTouched!: Callback;

  writeValue(value: ImageInputValue): void {
    this.renderer.setProperty(this.elementRef.nativeElement, "value", value);
  }

  registerOnChange(fn: Callback): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: Callback): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      "disabled",
      isDisabled
    );
  }

  onImageChanged(evt: Event): void {
    const files = (<HTMLInputElement>evt.target)?.files;
    const file = files && files[0];
    if (!file) {
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt: ProgressEvent<FileReader>) => {
      this.onChange({ file, base64: evt.target?.result as string });
    };
    reader.readAsDataURL(file);
    this.counter.push(this.counter.length + 1);
  }
}
