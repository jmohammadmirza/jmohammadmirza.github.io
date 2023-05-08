import { Component } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {ProgressBarMode} from '@angular/material/progress-bar';

import { Router, NavigationStart, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'qna-app';
}
