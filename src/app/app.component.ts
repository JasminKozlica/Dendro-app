import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TreeInputComponent } from './components/tree-input/tree-input.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [TreeInputComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dendro-app';
}
