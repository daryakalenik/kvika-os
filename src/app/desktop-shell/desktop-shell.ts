import { Component } from '@angular/core';
import { TopBar } from './top-bar/top-bar';
import { Workspace } from './workspace/workspace';
import { BottomBar } from './bottom-bar/bottom-bar';

@Component({
  selector: 'app-desktop-shell',
  imports: [TopBar, Workspace, BottomBar],
  templateUrl: './desktop-shell.html',
  styleUrl: './desktop-shell.scss',
})
export class DesktopShell {}
