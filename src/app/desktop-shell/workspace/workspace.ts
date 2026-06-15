import { Component } from '@angular/core';
import { Window } from './window/window';

@Component({
  selector: 'app-workspace',
  imports: [Window],
  templateUrl: './workspace.html',
  styleUrl: './workspace.scss',
})
export class Workspace {}
