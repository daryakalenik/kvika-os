import { Injectable, signal } from '@angular/core';
import { DesktopItem } from '../constants/desktop-items.constant';

export interface OpenWindowData extends DesktopItem {
  minimized: boolean;
  zIndex: number;
}

const defaultZIndex = 10;

@Injectable({
  providedIn: 'root',
})
export class Layout {
  isLoading = signal(false);
  activeWindowId = signal<string | null>(null);
  openWindows = signal<OpenWindowData[]>([]);

  openNewWindow(data: DesktopItem) {
    const windows = this.openWindows();
    const window = windows.find((v) => v.id === data.id);

    if (window) {
      if (window.minimized) {
        this.showFoldedWindow(data.id);
      }

      return;
    }

    if (!windows.length) {
      this.openWindows.set([
        { ...data, minimized: false, zIndex: defaultZIndex },
      ]);
    } else {
      let highest = 0;

      for (const window of windows) {
        if (window.zIndex > highest) {
          highest = window.zIndex;
        }
      }

      this.openWindows.update((v) => {
        const windows = v.map((item) => ({ ...item, minimized: true }));

        return [...windows, { ...data, minimized: false, zIndex: highest + 1 }];
      });
    }

    this.activeWindowId.set(data.id);
  }

  closeActiveWindow() {
    const id = this.activeWindowId();

    if (!id) return;

    const windows = this.openWindows();
    const newWindows = windows.filter((v) => v.id !== id);

    if (windows.length === newWindows.length) {
      this.activeWindowId.set(null);
      console.warn('Layout invariant violated: active window was not found', {
        activeWindowId: id,
        openWindowIds: windows.map((window) => window.id),
      });
      return;
    }

    if (!newWindows.length) {
      this.openWindows.set([]);
      this.activeWindowId.set(null);
      return;
    }

    let highestIndex;
    let highest = 0;

    for (let i = 0; i < newWindows.length; i++) {
      if (newWindows[i].zIndex > highest && !newWindows[i].minimized) {
        highest = newWindows[i].zIndex;
        highestIndex = i;
      }
    }

    this.openWindows.set(newWindows);
    this.activeWindowId.set(
      highestIndex != null ? newWindows[highestIndex].id : null,
    );
  }

  foldActiveWindow() {
    const id = this.activeWindowId();
    const windows = this.openWindows();

    if (!id || !windows.length) return;

    if (!windows.some((window) => window.id === id)) {
      console.warn('Layout invariant violated: active window was not found', {
        activeWindowId: id,
        openWindowIds: windows.map((window) => window.id),
      });
      this.activeWindowId.set(null);
      return;
    }

    const newWindows = windows.map((window) => {
      if (window.id === id) {
        return { ...window, minimized: true };
      } else return window;
    });

    let highestIndex;
    let highest = 0;

    for (let i = 0; i < newWindows.length; i++) {
      if (newWindows[i].zIndex > highest && !newWindows[i].minimized) {
        highest = newWindows[i].zIndex;
        highestIndex = i;
      }
    }

    this.openWindows.set(newWindows);
    this.activeWindowId.set(
      highestIndex != null ? newWindows[highestIndex].id : null,
    );
  }

  getWindowById(id: string): OpenWindowData | null {
    return this.openWindows().find((v) => v.id === id) ?? null;
  }

  showFoldedWindow(id: string) {
    const windows = this.openWindows();

    if (!windows.length) return;

    if (!windows.some((window) => window.id === id && window.minimized)) {
      console.warn(
        'Layout invariant violated: minimized window was not found',
        {
          windowId: id,
          openWindowIds: windows.map((window) => window.id),
        },
      );
      return;
    }

    let highest = 0;

    for (const window of windows) {
      if (window.zIndex > highest && !window.minimized) {
        highest = window.zIndex;
      }
    }

    const newWindows = windows.map((window) => {
      if (window.id === id) {
        return { ...window, minimized: false, zIndex: highest + 1 };
      } else return { ...window, minimized: true };
    });

    this.openWindows.set(newWindows);
    this.activeWindowId.set(id);
  }

  closeFoldedWindow(id: string) {
    const windows = this.openWindows();

    if (!windows.length) return;

    if (!windows.some((window) => window.id === id && window.minimized)) {
      console.warn(
        'Layout invariant violated: minimized window was not found',
        {
          windowId: id,
          openWindowIds: windows.map((window) => window.id),
        },
      );
      return;
    }

    const newWindows = windows.filter((window) => window.id !== id);

    let highestIndex;
    let highest = 0;

    for (let i = 0; i < newWindows.length; i++) {
      if (newWindows[i].zIndex > highest && !newWindows[i].minimized) {
        highest = newWindows[i].zIndex;
        highestIndex = i;
      }
    }

    this.openWindows.set(newWindows);
    this.activeWindowId.set(
      highestIndex != null ? newWindows[highestIndex].id : null,
    );
  }
}
