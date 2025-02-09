import {Component, OnInit, signal} from '@angular/core';

@Component({
  selector: 'app-chat-loader',
  imports: [],
  templateUrl: './chat-loader.component.html',
  styleUrl: './chat-loader.component.scss'
})
export class ChatLoaderComponent implements OnInit {

  loaderList: string[] = [
    'Thinking it through...',
    'Generating tasks...',
    'Estimating task duration...',
    'Estimating rate...',
    'Putting it all together...'
  ]

  currentTaskIndex = signal(0);

  ngOnInit() {
    this.cycleLoaderList()
  }

  private cycleLoaderList() {
    const taskInterval = setInterval(() => {
      if (this.currentTaskIndex() + 1 < this.loaderList.length) {
        this.currentTaskIndex.update(() => this.currentTaskIndex() + 1)
      } else {
        clearInterval(taskInterval)
      }
    }, 5000)
  }
}
