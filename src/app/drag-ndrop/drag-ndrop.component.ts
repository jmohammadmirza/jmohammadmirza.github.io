import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-drag-ndrop',
  templateUrl: './drag-ndrop.component.html',
  styleUrls: ['./drag-ndrop.component.css'],
})
export class DragNDropComponent {
  todo = [
    'Get to work',
    'Pick up groceries',
    'Do Miswak',
    'Go home',
    'Fall asleep'
  ];

  done = [
    'Get up',
    'Take a Gusl',
    'Check e-mail',
    'Walk'
  ];

  drop(event: CdkDragDrop<string[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex);
    }
  }
}
