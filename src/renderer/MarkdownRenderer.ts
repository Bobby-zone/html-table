import {MarkdownRenderer} from 'obsidian';

export class MarkdownRendererWrapper {
  static render(el: HTMLElement, text: string, ctx?: any) {
    MarkdownRenderer.renderMarkdown(text, el, '', ctx);
  }
}