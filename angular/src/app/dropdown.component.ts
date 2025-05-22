import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import {
  AbstractControl,
  ControlValueAccessor,
  FormsModule,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ValidationErrors,
  Validator,
} from '@angular/forms';

@Component({
  selector: 'dropdown',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,

  imports: [FormsModule],
  providers: [
    { provide: NG_VALIDATORS, useExisting: DropdownComponent, multi: true },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: DropdownComponent,
      multi: true,
    },
  ],
  template: `
    <label>Select Category:</label>
    <select name="category">
      <option [ngValue]="null">-- Choose --</option>
      @for (option of categories; track option) {
      <option [ngValue]="option">{{ option }}</option>
      }
    </select>

  `,
})
export class DropdownComponent implements Validator, ControlValueAccessor {
  writeValue(obj: any): void {
    console.log("writevalue",obj);
  }
  registerOnChange(fn: any): void {
    console.log("registerOnChange",fn());
  }
  registerOnTouched(fn: any): void {
    console.log("registerOnTouched",fn());
  }
  setDisabledState?(isDisabled: boolean): void {
    console.log("setDisabledState",isDisabled);
  }
  categories = ['News', 'Sports', 'Technology', 'Finance'];


  validate(control: AbstractControl): ValidationErrors | null {
    console.log("control",control);
    return null;
  }

  registerOnValidatorChange(fn: () => void): void {
    console.log('registerOnValidatorChange', fn);
  }
}
