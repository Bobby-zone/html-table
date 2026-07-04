import {ButtonComponent} from 'obsidian';

import {ToolbarButton} from './ToolbarButton';

export class Toolbar {
  private container: HTMLElement;

  constructor(
      parent: HTMLElement,
      buttons: ToolbarButton[],
  ) {
    this.container = parent.createDiv('table-toolbar');
    this.render(buttons);
  }

  private render(buttons: ToolbarButton[]): void {
    for (const button of buttons) {
      const btn = new ButtonComponent(this.container);

      if (button.icon) {
        btn.setIcon(button.icon);
      }

      if (button.text) {
        btn.setButtonText(button.text);
      }

      btn.setTooltip(button.title);

      btn.onClick(button.onClick);
    }
  }
  // constructor(container: HTMLElement, onSave: () => void) {
  //   const saveBtn = container.createEl('button');
  //   saveBtn.textContent = 'Save';
  //   saveBtn.onclick = onSave;
  // }
}