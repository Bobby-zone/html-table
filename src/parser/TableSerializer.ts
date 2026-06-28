import {TableModel} from '../models/TableModel';

export class TableSerializer {
  static serialize(model: TableModel): string {
    return JSON.stringify(model, null, 2);
  }
}