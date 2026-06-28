import {App, Editor, MarkdownFileInfo, MarkdownView, Notice, Plugin, WorkspaceLeaf} from 'obsidian';

import {TABLE_EDITOR_VIEW, TableEditorView} from './editor/TableEditorView';
import {TableDocument} from './models/TableDocument';
import {TableBlockParser} from './parser/TableBlockParser';
import {TableRenderer} from './renderer/TableRenderer';

// Remember to rename these classes and interfaces!

export default class TablePlugin extends Plugin {
  async onload() {
    // register the custom editor view
    this.registerView(
        TABLE_EDITOR_VIEW, (leaf: WorkspaceLeaf) => new TableEditorView(leaf));

    // find codeblock table
    this.registerMarkdownCodeBlockProcessor(
        'table', async (source, el, ctx) => {
          try {
            const model = TableBlockParser.parse(source);

            const renderer = new TableRenderer();
            await renderer.render(el, model, ctx);
          } catch (err) {
            console.error(err);

            el.createEl('pre', {text: 'Failed to render table.'});
          }
        });


    // command: edit selected table
    this.addCommand({
      id: 'edit-table',
      name: 'Edit table',
      editorCallback:
          async (editor: Editor, _ctx: MarkdownView|MarkdownFileInfo) => {
            const view = this.app.workspace.getActiveViewOfType(MarkdownView);

            const selection = editor.getSelection().trim();

            let model;

            try {
              model = TableBlockParser.parse(selection);
            } catch (err) {
              console.error(err);
              new Notice('Invalid table JSON.');
              return;
            }

            const leaf = this.app.workspace.getLeaf(true);

            await leaf.setViewState({type: TABLE_EDITOR_VIEW, active: true});

            const tableView = leaf.view as TableEditorView;

            const document: TableDocument = {
              editor,
              from: editor.getCursor('from'),
              to: editor.getCursor('to'),
              model,
              sourceLeaf: view!.leaf
            };

            await tableView.setTable(document);
          }
    });
  }

  onunload() {
    this.app.workspace.detachLeavesOfType(TABLE_EDITOR_VIEW);
  }
}
