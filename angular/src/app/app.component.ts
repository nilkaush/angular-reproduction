import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { JsonPipe } from '@angular/common';
import { DropdownComponent } from './dropdown.component';
import { MyModelDirective } from './model/model.directive';
@Component({
  standalone:true,
  selector: 'app-root',
  imports: [
    FormsModule,
    JsonPipe,
    DropdownComponent,
    MyModelDirective
    
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent{
  model = ""



}
