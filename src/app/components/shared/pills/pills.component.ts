import {Component, ElementRef, input, OnInit, signal, viewChild} from '@angular/core';
import {NgClass, NgStyle} from "@angular/common";
import {Subject, throttleTime} from "rxjs";

@Component({
  selector: 'app-pills',
  imports: [
    NgStyle,
    NgClass
  ],
  templateUrl: './pills.component.html',
  styleUrl: './pills.component.scss'
})
export class PillsComponent implements OnInit {

  pillComponent = viewChild<ElementRef<HTMLUListElement>>('pillComponent');
  pillWidth = signal(0);
  hoverPillPosLeft = signal(0);
  tags = input<string[]>();
  selected = signal('');
  private movePillSubject = new Subject<MouseEvent>();

  constructor() {
    this.movePillSubject.pipe((throttleTime(100))).subscribe(($event) => {
      this.movePill($event);
    })
  }

  ngOnInit() {
    if (this.tags()) {
      this.selected.update(() => this.tags()[0])
    }
  }

  onMovePill($event: MouseEvent) {
    this.movePillSubject.next($event)
  }

  onHideMovePill() {
    this.pillWidth.update(() => 0);
  }

  onSelectTag(tag: string) {
    this.selected.update(() => tag);
  }

  selectedTag(tag: string) {
    return this.selected() === tag;
  }

  private movePill($event: MouseEvent) {
    const target = $event.target as HTMLElement;
    if (target.localName === 'button') {
      this.pillWidth.update(() => target.getBoundingClientRect().width)
      const mousePosition = target.getBoundingClientRect().left - this.pillComponent().nativeElement.getBoundingClientRect().left;
      const positionPercentage = Math.round((mousePosition / this.pillComponent().nativeElement.getBoundingClientRect().width) * 100);
      this.hoverPillPosLeft.update(() => positionPercentage);
    }
  }

}
