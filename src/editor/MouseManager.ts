import {Cell} from './Cell';
import {Grid} from './Grid';
import {SelectionManager} from './SelectionManager';

export class MouseManager {
  private dragging = false;
  private anchorCell: Cell|null = null;

  constructor(
      private grid: Grid,
      private selection: SelectionManager,
  ) {
    document.addEventListener('mouseup', this.onMouseUp);
  }

  // cell events
  public mouseDown(cell: Cell, event: MouseEvent): void {
    event.preventDefault();

    this.dragging = true;
    this.anchorCell = cell;

    this.selection.selectSingle(cell);
  }

  public mouseEnter(cell: Cell): void {
    if (!this.dragging) return;

    if (!this.anchorCell) return;

    const cells = this.grid.getRectangle(this.anchorCell, cell);
    this.selection.selectRectangle(cells);
  }

  // mouse up
  private onMouseUp =
      () => {
        this.dragging = false;
      }

  // cleanup
  public destroy(): void {
    document.removeEventListener('mousup', this.onMouseUp)
  }
}