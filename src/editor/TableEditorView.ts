import {ItemView} from 'obsidian';

import {TableEditor} from './TableEditor';
import {Toolbar} from './Toolbar/Toolbar';

export const TABLE_EDITOR_VIEW = 'advanced-table-editor';

export class TableEditorView extends ItemView {
  getViewType() {
    return TABLE_EDITOR_VIEW;
  }

  getDisplayText() {
    return 'Table Editor';
  }

  async setTable(document: TableDocument) {
    this.document = document;

    this.render();
  }

  private render() {
    this.contentEl.empty();

    const toolbarEl = this.contentEl.createDiv();
    const gridEl = this.containerEl.createDiv();

    new Toolbar(toolbarEl, () => this.save());

    this.editor = new TableEditor(gridEl, this.document.model);
  }
}