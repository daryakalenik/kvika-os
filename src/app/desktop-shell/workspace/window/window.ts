import { Component, inject, input } from '@angular/core';

import { Layout, OpenWindowData } from '../../../services/layout';

@Component({
  selector: 'app-window',
  templateUrl: './window.html',
  styleUrl: './window.scss',
  host: {
    '(click)': 'onWindowClick()',
  },
})
export class Window {
  readonly data = input.required<OpenWindowData>();

  readonly layoutService = inject(Layout);

  closeWindow() {
    this.layoutService.closeActiveWindow();
  }

  foldWindow() {
    this.layoutService.foldActiveWindow();
  }

  onWindowClick() {
    this.layoutService.activateWindow(this.data().id);
  }
}
