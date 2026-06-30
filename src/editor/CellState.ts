import {Cell} from './Cell';

export class CellState {
  private selected = false;
  private active = false;
  private editing = false;

  // Selected
  public isSelected(): boolean {
    return this.selected;
  }
  public setSelected(value: boolean): void {
    this.selected = value;
  }

  // Active
  public isActive(): boolean {
    return this.active;
  }
  public setActive(value: boolean): void {
    this.active = value;
  }

  // Editing
  public isEditing(): boolean {
    return this.editing;
  }
  public setEditing(value: boolean): void {
    this.editing = value;
  }

  // Reset
  public clear(): void {
    this.selected = false;
    this.active = false;
    this.editing = false;
  }
}