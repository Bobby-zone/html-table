import {TableModel} from '../models/TableModel';

import {Cell} from './Cell';
import {MouseManager} from './MouseManager';
import {Row} from './Row';
import {SelectionManager} from './SelectionManager';

// create <table>
export class Grid {
  private table!: HTMLTableElement;
  private rows: Row[] = [];
  private mouse: MouseManager;

  constructor(
      private container: HTMLElement,
      private model: TableModel,
      private selection: SelectionManager,
  ) {
    this.mouse = new MouseManager(this, selection);

    this.render();
  }

  private render() {
    this.container.empty();

    this.table = this.container.createEl('table', {cls: 'table-grid'});

    for (const [rowIndex, rowModel] of this.model.rows.entries()) {
      const row = new Row(
          this,
          this.table,
          rowModel,
          this.selection,
          rowIndex,
      );

      this.rows.push(row);
    }
  }

  // Cell lookup
  public getCell(row: number, column: number): Cell|undefined {
    const rowObject = this.rows[row];

    if (!rowObject) return undefined;

    return rowObject.getCell(column);
  }

  public getRows(): Row[] {
    return this.rows;
  }

  // Rectangle selection
  public getRectangle(start: Cell, end: Cell): Cell[] {
    const result: Cell[] = [];

    const top = Math.min(start.getRow(), end.getRow());
    const bottom = Math.max(start.getRow(), end.getRow());

    const left = Math.min(start.getCol(), end.getCol());
    const right = Math.max(start.getCol(), end.getCol());

    for (let r = top; r <= bottom; r++) {
      const row = this.rows[r];

      if (!row) continue;

      for (let c = left; c <= right; c++) {
        const cell = row.getCell(c);

        if (cell) result.push(cell);
      }
    }
    return result;
  }

  // helpers
  public getMouseManager(): MouseManager {
    return this.mouse;
  }

  public destroy(): void {
    this.mouse.destroy();
  }
}