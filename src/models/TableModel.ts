import {TableRow} from './TableRow';

export interface TableColumn {
  width?: number;
}

export interface TableModel {
  version: number;

  columns: TableColumn[];

  rows: TableRow[];
}