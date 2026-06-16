import { Component, inject } from '@angular/core';
import { Layout } from '../../../services/layout';

@Component({
  selector: 'app-window',
  imports: [],
  templateUrl: './window.html',
  styleUrl: './window.scss',
})
export class Window {
  readonly layoutService = inject(Layout);

  closeWindow() {
    this.layoutService.closeActiveWindow();
  }

  foldWindow() {
    this.layoutService.foldActiveWindow();
  }
}
