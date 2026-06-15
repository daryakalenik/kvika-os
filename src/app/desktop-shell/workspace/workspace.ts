import { Component, inject } from '@angular/core';
import { Window } from './window/window';
import { ActiveWindowData, Layout } from '../../layout';

@Component({
  selector: 'app-workspace',
  imports: [Window],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {
  readonly layoutService = inject(Layout);

  openWindow(data: ActiveWindowData) {
    this.layoutService.activeWindowData.set(data);
  }
}
