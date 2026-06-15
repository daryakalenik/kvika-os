import { Injectable, signal } from '@angular/core';

export interface ActiveWindowData {
  id: string;
  icon: string;
  folded: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class Layout {
  isLoading = signal(false);
  activeWindowData = signal<ActiveWindowData | null>(null);
}
