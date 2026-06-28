import {CellStyle} from './CellStyle';

export interface TableCell {
  id?: string;
  text: string;

  rowspan?: number;
  colspan?: number;

  style?: CellStyle;
}