import {TableCell} from '../models/TableCell';

import {MarkdownRendererWrapper} from './MarkdownRenderer';

export class CellRenderer {
  static render(el: HTMLElement, cell: TableCell, ctx?: any) {
    MarkdownRendererWrapper.render(el, cell.text, ctx);
  }
}