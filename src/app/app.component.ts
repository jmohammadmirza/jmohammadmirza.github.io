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
  isLoading = true;
  
  color: ThemePalette = 'accent';
  mode: ProgressBarMode = 'determinate';
  value = this.isLoading ? undefined : 50;
  bufferValue = 75;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.isLoading = true;
      }
      if (event instanceof NavigationEnd) {
        this.isLoading = false;
      }
    });
  }
}
