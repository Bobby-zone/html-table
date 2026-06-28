export class Toolbar {
  constructor(container: HTMLElement, onSave: () => void) {
    const saveBtn = container.createEl('button');
    saveBtn.textContent = 'Save';
    saveBtn.onclick = onSave;
  }
}