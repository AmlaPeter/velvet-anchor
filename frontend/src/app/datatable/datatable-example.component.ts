import { Component } from '@angular/core';
import { DataTableComponent } from './data-table.component';
import { ColumnDef } from '@tanstack/table-core';

interface Person {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
}

@Component({
  selector: 'app-data-table-example',
  standalone: true,
  imports: [DataTableComponent],
  template: `
    <app-data-table [data]="data" [columns]="columns"></app-data-table>
  `,
})
export class DataTableExampleComponent {
  data: Person[] = [
    { firstName: 'John', lastName: 'Doe', age: 28, visits: 15 },
    { firstName: 'Jane', lastName: 'Smith', age: 34, visits: 3 },
    { firstName: 'Alice', lastName: 'Johnson', age: 45, visits: 50 },
    { firstName: 'Bob', lastName: 'Williams', age: 23, visits: 8 },
  ];

  columns: ColumnDef<Person, any>[] = [
    {
      header: 'Name',
      columns: [
        { accessorKey: 'firstName', header: 'First Name' },
        { accessorKey: 'lastName', header: 'Last Name' },
      ],
    },
    {
      header: 'Info',
      columns: [
        { accessorKey: 'age', header: 'Age' },
        { accessorKey: 'visits', header: 'Visits' },
      ],
    },
  ];
}
