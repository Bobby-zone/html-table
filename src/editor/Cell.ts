import {TableCell} from '../models/TableCell';

import {CellState} from './CellState';
import {SelectionManager} from './SelectionManager';

// create <td>
export class Cell {
  private td!: HTMLTableCellElement;
  private textarea!: HTMLTextAreaElement;

  private state = new CellState();

  constructor(
      private tr: HTMLTableRowElement,
      private model: TableCell,
      private selection: SelectionManager,
      private rowIndex: number,
      private colIndex: number,
  ) {
    this.render();
  }

  private render() {
    this.td = this.tr.createEl('td', {cls: 'table-cell'});

    if (this.model.rowspan) {
      this.td.rowSpan = this.model.rowspan;
    }
    if (this.model.colspan) {
      this.td.colSpan = this.model.colspan;
    }

    this.textarea = this.td.createEl('textarea', {cls: 'table-cell-input'});

    this.textarea.value = this.model.text;

    this.registerEvents();
    this.refreshState();
  }

  // events
  private registerEvents(): void {
    this.td
        .addEventListener(
            'mousedown',
            (event) => {
              this.selection.selectSingle(this);
            })

            this.textarea
        .addEventListener(
            'input',
            () => {
              this.model.text = this.textarea.value;
            })

            this.textarea
        .addEventListener(
            'focus',
            () => {
              this.activate();
            })

            this.textarea.addEventListener('blur', () => {
              this.deactivate();
            })
  }

  // selection
  public select(): void {
    this.state.setSelected(true);
    this.refreshState();
  }
  public unselect(): void {
    this.state.setSelected(false);
    this.refreshState();
  }

  public activate(): void {
    this.state.setActive(true);
    this.refreshState();
  }
  public deactivate(): void {
    this.state.setActive(false);
    this.refreshState();
  }

  public beginEdit(): void {
    this.state.setEditing(true);
    this.textarea.focus();
    this.refreshState();
  }
  public endEdit(): void {
    this.state.setEditing(false);
    this.refreshState();
  }

  // state
  private refreshState(): void {
    this.td.toggleClass('is-selected', this.state.isSelected());
    this.td.toggleClass('is-active', this.state.isActive());
    this.td.toggleClass('is-editing', this.state.isEditing());
  }

  // helpers
  public getRow() {
    return this.rowIndex;
  }

  public getCol() {
    return this.colIndex;
  }

  public getElement(): HTMLTableCellElement {
    return this.td;
  }

  public getModel() {
    return this.model;
  }

  public focus(): void {
    this.textarea.focus();
  }
}