import { Component, inject } from '@angular/core';
import { Window } from './window/window';
import { Layout } from '../../services/layout';
import {
  DESKTOP_ITEMS,
  DesktopItem,
} from '../../constants/desktop-items.constant';

@Component({
  selector: 'app-workspace',
  imports: [Window],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {
  readonly layoutService = inject(Layout);
  readonly desktopItems = DESKTOP_ITEMS;

  openWindow(data: DesktopItem) {
    this.layoutService.openNewWindow(data);
  }
}
