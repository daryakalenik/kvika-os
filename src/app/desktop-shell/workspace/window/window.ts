import { Component, inject } from '@angular/core';
import { Layout } from '../../../layout';

@Component({
  selector: 'app-window',
  imports: [],
  templateUrl: './window.html',
  styleUrl: './window.scss',
})
export class Window {
  private readonly layoutService = inject(Layout);

  closeWindow() {
    this.layoutService.activeWindowData.set(null);
  }

  foldWindow() {
    this.layoutService.activeWindowData.update((v) =>
      v ? { ...v, folded: true } : null,
    );
  }
}
