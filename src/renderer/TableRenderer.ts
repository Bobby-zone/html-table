import {TableModel} from '../models/TableModel';

import {CellRenderer} from './CellRenderer';

export class TableRenderer {
  render(container: HTMLElement, model: TableModel, ctx?: any) {
    const table = container.createEl('table');
    table.addClass('html-table');

    for (const row of model.rows) {
      const tr = table.createEl('tr');

      for (const cell of row.cells) {
        const td = tr.createEl('td');

        if (cell.rowspan) td.rowSpan = cell.rowspan
          if (cell.colspan) td.rowSpan = cell.colspan

          CellRenderer.render(td, cell, ctx);
      }
    }
  }
}