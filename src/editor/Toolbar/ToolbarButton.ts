export interface ToolbarButton {
  id: string;
  title: string;
  icon?: string;
  text?: string;

  onClick: () => void;
}