import {ToolbarAction} from '../ToolbarActions';

export class SaveAction implements ToolbarAction {
  public readonly id = 'save';

  constructor(
      private onSave: () => Promise<void>,
  ) {}

  public async execute(): Promise<void> {
    await this.onSave();
  }
}