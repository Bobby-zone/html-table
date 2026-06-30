import {TableRow} from '../models/TableRow';

import {Cell} from './Cell';
import {SelectionManager} from './SelectionManager';

// create <tr>
export class Row {
  private tr!: HTMLTableRowElement;
  private cells: Cell[] = [];

  constructor(
      private table: HTMLTableElement,
      private model: TableRow,
      private selection: SelectionManager,
      private rowIndex: number,
  ) {
    this.render();
  }

  private render() {
    this.tr = this.table.createEl('tr');

    for (const [columnIndex, cellModel] of this.model.cells.entries()) {
      const cell = new Cell(
          this.tr, cellModel, this.selection, this.rowIndex, columnIndex);

      this.cells.push(cell);
    }
  }

  // helpers
  public getCell(column: number): Cell|undefined {
    return this.cells[column];
  }

  public getCells(): Cell[] {
    return this.cells;
  }

  public getElement(): HTMLTableRowElement {
    return this.tr;
  }

  public getIndex(): number {
    return this.rowIndex;
  }
}