import { Component, inject } from '@angular/core';
import { Layout } from '../../layout';

@Component({
  selector: 'app-bottom-bar',
  imports: [],
  templateUrl: './bottom-bar.html',
  styleUrl: './bottom-bar.scss',
})
export class BottomBar {
  readonly layoutService = inject(Layout);

  toggleWindow() {
    this.layoutService.activeWindowData.update((v) =>
      v
        ? {
            ...v,
            folded: !v.folded,
          }
        : null,
    );
  }
}
