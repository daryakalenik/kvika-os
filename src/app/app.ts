import { Component, inject } from '@angular/core';

import { LoadingScreen } from './loading-screen/loading-screen';
import { DesktopShell } from './desktop-shell/desktop-shell';
import { Layout } from './services/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [LoadingScreen, DesktopShell],
  styleUrl: './app.scss',
})
export class App {
  readonly layoutService = inject(Layout);
}
