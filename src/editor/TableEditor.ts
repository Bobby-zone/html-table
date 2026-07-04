// editor/TableEditor.ts

import {TableDocument} from '../models/TableDocument';
import {TableModel} from '../models/TableModel';
import {TableSerializer} from '../parser/TableSerializer';

import {Grid} from './Grid';
import {SelectionManager} from './SelectionManager';
import {SaveAction} from './Toolbar/Action/SaveAction';
import {Toolbar} from './Toolbar/Toolbar';

export class TableEditor {
  private document!: TableDocument;
  private editor!: TableEditor;
  private selection: SelectionManager;
  private grid!: Grid;
  private toolbar!: Toolbar;
  private toolbarContainer!: HTMLElement;
  private gridContainer!: HTMLElement;

  constructor(
      private container: HTMLElement,
      private model: TableModel,
  ) {
    this.selection = new SelectionManager();
    this.render();
  }

  private render(): void {
    this.container.empty();

    this.toolbarContainer = this.container.createDiv('table-toolbar-container');
    this.gridContainer = this.container.createDiv('table-grid-container');

    this.toolbar = new Toolbar(
        this.toolbarContainer,
        [{
          id: 'save',
          text: 'Save',
          title: 'Save Table',
          action: new SaveAction(this.onSave)
        }],
    );

    this.grid = new Grid(
        this.container,
        this.model,
        this.selection,
    );
  }

  private async save() {
    const model = this.editor.getModel();

    const replacement = TableSerializer.serialize(model);

    this.document.editor.replaceRange(
        replacement, this.document.from, this.document.to);

    // return focus to original note
    await this.app.workspace.setActiveLeaf(
        this.document.sourceLeaf, {focus: true});

    // close editor tab
    this.leaf.detach();
  }

  public getModel(): TableModel {
    return this.model;
  }

  public getSelection(): SelectionManager {
    return this.selection;
  }
}