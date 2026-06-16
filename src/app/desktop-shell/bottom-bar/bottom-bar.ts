import { Component, inject } from '@angular/core';
import { Layout } from '../../services/layout';
import { DesktopItem } from '../../constants/desktop-items.constant';

@Component({
  selector: 'app-bottom-bar',
  imports: [],
  templateUrl: './bottom-bar.html',
  styleUrl: './bottom-bar.scss',
})
export class BottomBar {
  readonly layoutService = inject(Layout);

  toggleWindow(item: DesktopItem) {
    if (item.id == this.layoutService.activeWindowId()) {
      this.layoutService.foldActiveWindow();
    } else {
      this.layoutService.showFoldedWindow(item.id);
    }
  }

  closeWindow(id: string) {
    this.layoutService.closeFoldedWindow(id);
  }
}
