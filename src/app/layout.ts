import { Injectable, signal } from '@angular/core';
import { DesktopItem } from './constants/desktop-items.constant';

export interface ActiveWindowData extends DesktopItem {
  folded: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Layout {
  isLoading = signal(false);
  activeWindowData = signal<ActiveWindowData | null>(null);
}
