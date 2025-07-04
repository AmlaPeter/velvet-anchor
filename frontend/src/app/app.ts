import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DataTableExampleComponent } from './datatable/datatable-example.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DataTableExampleComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'frontend';
}
