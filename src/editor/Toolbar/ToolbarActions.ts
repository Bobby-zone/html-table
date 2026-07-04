export interface ToolbarAction {
  id: string;
  execute(): void|Promise<void>;
  canExecute?(): boolean;
  title?: string;
}