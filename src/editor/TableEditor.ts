// editor/TableEditor.ts

import {TableModel} from '../models/TableModel';

export class TableEditor {
  constructor(
      private readonly container: HTMLElement,
      private readonly model: TableModel) {
    this.container = container;
    this.model = model;

    this.render();
  }

  public getModel(): TableModel {
    return this.model;
  }

  private render(): void {
    this.container.empty();

    const table = this.container.createEl('table');

    for (const row of this.model.rows) {
      const tr = table.createEl('tr');

      for (const cell of row.cells) {
        const td = tr.createEl('td');

        const input = td.createEl('textarea');

        input.value = cell.text;

        input.oninput = () => {
          cell.text = input.value;
        };
      }
    }
  }
}