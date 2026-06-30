import {Cell} from './Cell';

export class SelectionManager {
  private selectedCells: Set<Cell> = new Set();
  private activeCell: Cell|null = null;
  private anchorCell: Cell|null = null;

  // Remove every selected cell.
  public clear(): void {
    for (const cell of this.selectedCells) {
      cell.unselect();
    }

    this.selectedCells.clear();

    if (this.activeCell) {
      this.activeCell.deactivate();
    }

    this.activeCell = null;
    this.anchorCell = null;
  }

  // Select one cell
  public selectSingle(cell: Cell): void {
    this.clear();

    this.selectedCells.add(cell);

    cell.select()
    cell.activate();

    this.activeCell = cell;
    this.anchorCell = cell;
  }

  add(cell: Cell) {
    this.selectedCells.add(cell);
    cell.select();
  }

  // Rectangle selection
  public selectRectangle(cells: Cell[]): void {
    this.clear();

    for (const cell of cells) {
      this.selectedCells.add(cell);
      cell.select();
    }

    if (cells.length > 0) {
      this.activeCell = cells[cells.length - 1] ?? null;
      this.anchorCell = cells[0] ?? null;
      if (!this.activeCell || !this.anchorCell)
        return

            this.activeCell.activate();
    }
  }

  public isSelected(cell: Cell): boolean {
    return this.selectedCells.has(cell);
  }

  public getSelected(): Cell[] {
    return [...this.selectedCells];
  }

  public getActiveCell(): Cell|null {
    return this.activeCell;
  }

  public getAnchorCell(): Cell|null {
    return this.anchorCell;
  }
}