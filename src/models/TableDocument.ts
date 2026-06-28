import {Editor, EditorPosition, WorkspaceLeaf} from 'obsidian'

import {TableModel} from './TableModel'

export interface TableDocument {
  editor: Editor;
  model: TableModel;

  from: EditorPosition;
  to: EditorPosition;

  sourceLeaf: WorkspaceLeaf;
}