import { Injectable, signal, WritableSignal } from '@angular/core';
import { DesktopItem } from './constants/desktop-items.constant';

export interface OpenWindowData extends DesktopItem {
  minimized: boolean;
  zIndex: number;
}

@Injectable({
  providedIn: 'root',
})
export class Layout {
  isLoading = signal(false);
  activeWindowId: WritableSignal<string | null> = signal(null);
  openWindows = signal<OpenWindowData[]>([]);

  openNewWindow(data: DesktopItem) {
    const windows = this.openWindows();
    const idToWindowMap = new Map<string, DesktopItem>();

    for (const window of windows) {
      idToWindowMap.set(window.id, window);
    }

    if (idToWindowMap.has(data.id)) return;

    if (!windows.length) {
      this.openWindows.set([{ ...data, minimized: false, zIndex: 10 }]);
    } else {
      let highest = 0;

      for (const window of windows) {
        if (window.zIndex > highest) {
          highest = window.zIndex;
        }
      }

      this.openWindows.update((v) => {
        return [...v, { ...data, minimized: false, zIndex: highest + 1 }];
      });
    }

    this.activeWindowId.set(data.id);
  }

  closeWindow() {
    const id = this.activeWindowId();

    if (!id) return;

    const windows = this.openWindows();
    const foundWindow = windows.findIndex((window) => window.id === id);

    windows.splice(foundWindow, 1);

    if (!windows.length) {
      this.openWindows.set([]);
      this.activeWindowId.set(null);
      return;
    }

    let highestIndex;

    for (let i = 0; i < windows.length; i++) {
      let highest = 0;

      if (windows[i].zIndex > highest && !windows[i].minimized) {
        highest = windows[i].zIndex;
        highestIndex = i;
      }
    }

    this.openWindows.set(windows);
    this.activeWindowId.set(
      highestIndex != null ? windows[highestIndex].id : null,
    );
  }

  getWindowById(id: string | null): OpenWindowData | null {
    if (!this.openWindows().length || !id) return null;

    return this.openWindows().find((v) => v.id === id) ?? null;
  }

  foldWindow() {
    const id = this.activeWindowId();

    if (!id) return;

    const windows = this.openWindows();
    const foundWindow = windows.find((window) => window.id === id);

    if (!foundWindow) return;

    foundWindow.minimized = true;

    let highestIndex;

    for (let i = 0; i < windows.length; i++) {
      let highest = 0;

      if (windows[i].zIndex > highest && !windows[i].minimized) {
        highest = windows[i].zIndex;
        highestIndex = i;
      }
    }

    this.openWindows.set(windows);
    this.activeWindowId.set(
      highestIndex != null ? windows[highestIndex].id : null,
    );
  }

  showFoldedWindow(id: string) {
    if (!id) return;

    const windows = this.openWindows();
    const foundWindowIdx = windows.findIndex((window) => window.id === id);

    if (foundWindowIdx === -1) return;

    const foundWindow = windows[foundWindowIdx];

    windows.splice(foundWindowIdx, 1);

    let highest = 0;

    for (const window of windows) {
      if (window.zIndex > highest) {
        highest = window.zIndex;
      }
    }

    this.openWindows.update((v) => {
      return [...v, { ...foundWindow, minimized: true, zIndex: highest + 1 }];
    });

    this.activeWindowId.set(id);
  }

  closeFoldedWindow(id: string) {
    if (!id) return;

    const windows = this.openWindows();
    const foundWindow = windows.findIndex((window) => window.id === id);

    windows.splice(foundWindow, 1);

    if (!windows.length) {
      this.openWindows.set([]);
      this.activeWindowId.set(null);
      return;
    }

    let highestIndex;

    for (let i = 0; i < windows.length; i++) {
      let highest = 0;

      if (windows[i].zIndex > highest && !windows[i].minimized) {
        highest = windows[i].zIndex;
        highestIndex = i;
      }
    }

    this.openWindows.set(windows);
    this.activeWindowId.set(
      highestIndex != null ? windows[highestIndex].id : null,
    );
  }
}
