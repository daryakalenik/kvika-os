import { Component, inject } from '@angular/core';
import { Layout } from '../../../layout';

@Component({
  selector: 'app-window',
  imports: [],
  templateUrl: './window.html',
  styleUrl: './window.scss',
})
export class Window {
  readonly layoutService = inject(Layout);

  closeWindow() {
    this.layoutService.closeWindow();
  }

  foldWindow() {
    this.layoutService.foldWindow();
  }
}
