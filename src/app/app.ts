import { Component } from '@angular/core';
import {LoadingScreen} from './loading-screen/loading-screen';
import {DesktopShell} from './desktop-shell/desktop-shell';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [
    LoadingScreen,
    DesktopShell
  ],
  styleUrl: './app.scss'
})
export class App {
}
