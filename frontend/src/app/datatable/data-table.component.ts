import { AfterViewInit, Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ColumnDef,
  Table,
  createTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getGroupedRowModel,
  getExpandedRowModel,
  RowData,
} from '@tanstack/table-core';
import {
  Virtualizer,
  elementScroll,
  observeElementRect,
  observeElementOffset,
} from '@tanstack/virtual-core';

@Component({
  selector: 'app-data-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-table.component.html',
  styleUrl: './data-table.component.css'
})
export class DataTableComponent<T extends RowData> implements AfterViewInit, OnChanges {
  @Input() data: T[] = [];
  @Input() columns: ColumnDef<T, any>[] = [];

  @ViewChild('scroller', { static: true }) scroller!: ElementRef<HTMLDivElement>;

  table!: Table<T>;
  rowVirtualizer?: Virtualizer<HTMLDivElement, Element>;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['columns']) {
      this.initTable();
    }
  }

  ngAfterViewInit(): void {
    this.initVirtualizer();
  }

  private initTable() {
    this.table = createTable({
      data: this.data,
      columns: this.columns,
      getCoreRowModel: getCoreRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getSortedRowModel: getSortedRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
      getGroupedRowModel: getGroupedRowModel(),
      getExpandedRowModel: getExpandedRowModel(),
      enableColumnResizing: true,
      columnResizeMode: 'onChange',
      enableColumnPinning: true,
      state: {},
      onStateChange: () => {},
      renderFallbackValue: null,
    });
    if (this.rowVirtualizer) {
      this.rowVirtualizer.setOptions({
        count: this.table.getRowModel().rows.length,
        getScrollElement: () => this.scroller.nativeElement,
        estimateSize: () => 35,
        scrollToFn: elementScroll,
        observeElementRect,
        observeElementOffset,
      });
    }
  }

  private initVirtualizer() {
    this.rowVirtualizer = new Virtualizer<HTMLDivElement, Element>({
      count: this.table.getRowModel().rows.length,
      getScrollElement: () => this.scroller.nativeElement,
      estimateSize: () => 35,
      scrollToFn: elementScroll,
      observeElementRect,
      observeElementOffset,
    });
  }

  get renderRows() {
    if (!this.rowVirtualizer) return this.table.getRowModel().rows;
    const virtualItems = this.rowVirtualizer.getVirtualItems();
    return virtualItems.map(item => this.table.getRowModel().rows[item.index]);
  }

  flexRender(comp: any, props: any) {
    return typeof comp === 'function' ? comp(props) : comp;
  }
}
