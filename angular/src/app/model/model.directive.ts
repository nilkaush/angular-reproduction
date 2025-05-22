
import {
  ControlContainer,
  Validator,
  ValidatorFn,
  AsyncValidator,
  AsyncValidatorFn,
  NG_VALIDATORS,
  NG_ASYNC_VALIDATORS,
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  Form,
  AbstractControl,
  UntypedFormControl,
  NgControl,
} from '@angular/forms';
import {
  forwardRef,
  Directive,
  OnChanges,
  OnInit,
  Input,
  Optional,
  Host,
  Self,
  Inject,
  SimpleChanges,
} from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Directive({
  selector: '[my-model]',
  providers: [
    {
      provide: NgControl,
      useExisting: forwardRef(() => MyModelDirective),
    },
  ],
  exportAs: 'my-model',
  standalone: true,
})
export class MyModelDirective
  extends NgControl
  implements OnChanges, OnInit
{
  @Input('my-model') expression: string;

  control: AbstractControl;
  viewModel: any;

  private parent: ControlContainer = null;
  _rawValidators: Array<Validator | ValidatorFn>;
  _rawAsyncValidators: Array<AsyncValidator | AsyncValidatorFn>;

  protected controlChanged = new Subject<void>();
  private proxy: NgControlProxy;

  get valueChanges(): Observable<any> {
    return this._valueChanges.asObservable();
  }
  private _valueChanges = new Subject<any>();
  constructor(
    @Optional() @Host() parent: ControlContainer,
    @Optional()
    @Self()
    @Inject(NG_VALIDATORS)
    validators: Array<Validator | ValidatorFn>,
    @Optional()
    @Self()
    @Inject(NG_ASYNC_VALIDATORS)
    asyncValidators: Array<AsyncValidator | AsyncValidatorFn>,
    @Optional()
    @Self()
    @Inject(NG_VALUE_ACCESSOR)
    valueAccessors: ControlValueAccessor[]  ) {
    super();
    this.parent = parent 
    this._rawValidators = validators || [];
    this._rawAsyncValidators = asyncValidators || [];
    this.valueAccessor = valueAccessors ? valueAccessors[0] : null;
    
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("changes",changes)
      this.setUpControl();
    
  }

  ngOnInit(): void {

  }


  get path(): string[] {
    return ["somepath"]
  }


  get hostPath(): string {
    return "somepath"

  }


  get formDirective(): Form {
    return this.parent ? this.parent.formDirective : null;
  }

  viewToModelUpdate(newValue: any): void {
    this.viewModel = newValue;
  }
  private setUpControl(): void {
    this.control = new UntypedFormControl();
    this.addControl();
  }
  private addControl() {
    this.proxy = new NgControlProxy(this);
    this.formDirective.addControl(this.proxy);
  }

}

class NgControlProxy extends NgControl {
  name: string | number;
  valueAccessor: ControlValueAccessor;
  private delegate: MyModelDirective;

  constructor(delegate: MyModelDirective) {
    super();
    this.name = delegate.name;
    this.valueAccessor = delegate.valueAccessor;
    this.delegate = delegate;
  }

  get formDirective(): Form {
    return this.delegate.formDirective;
  }
  get _rawValidators(): Array<Validator | ValidatorFn> {
    return this.delegate._rawValidators;
  }
  set _rawValidators(value: Array<Validator | ValidatorFn>) {
    if (this.delegate) {
      this.delegate._rawValidators = value;
    }
  }
  get _rawAsyncValidators(): Array<AsyncValidator | AsyncValidatorFn> {
    return this.delegate._rawAsyncValidators;
  }
  set _rawAsyncValidators(value: Array<AsyncValidator | AsyncValidatorFn>) {
    if (this.delegate) {
      this.delegate._rawAsyncValidators = value;
    }
  }
  get viewModel(): any {
    return this.delegate.viewModel;
  }
  set viewModel(value: any) {
    this.delegate.viewModel = value;
  }
  get validator(): ValidatorFn {
    return this.delegate.validator;
  }
  get asyncValidator(): AsyncValidatorFn {
    return this.delegate.asyncValidator;
  }
  get path(): string[] {
    return this.delegate.path;
  }
  viewToModelUpdate(newValue: any): void {
    this.delegate.viewToModelUpdate(newValue);
  }
  get control(): AbstractControl {
    return this.delegate.control;
  }
  set control(value: AbstractControl) {
    value['_counter'] = value['_counter'] ? value['_counter'] + 1 : 1;
    this.delegate.control = value;
  }
}



