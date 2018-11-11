import { Component, ElementRef, HostListener, ViewChild, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  A,
  DOWN_ARROW,
  END,
  ENTER,
  HOME,
  LEFT_ARROW,
  RIGHT_ARROW,
  SPACE,
  UP_ARROW,
} from '@angular/cdk/keycodes';
import { Observable } from 'rxjs';

/** Component for displaying the search input box inside the dropdown overlay. */
@Component({
  selector: 'mat-searchable-input',
  template: `
    <div class="mat-tab-header">
      <input matInput autocomplete="off" class="mat-input-element" [formControl]="_searchBox" [placeholder]="placeholder" #searchBox />
    </div>
  `,
  styles: [ 'input { padding: 16px; box-sizing: border-box; }' ]
})
export class MatSearchableInputComponent {
  /** Holds the reference to the input DOM element. */
  @ViewChild('searchBox', { read: ElementRef })
  private _searchBoxInputElement: ElementRef;

  /** Label of the input placeholder.  */
  @Input()
  placeholder = 'Search..';

  /** Holds the reference to the form control instance of the input DOM element. */
  _searchBox = new FormControl();

  /**
   * Gets the observable stream responsible for tracking the input value changes.
   *
   * @returns Observable<string>
   */
  get changes$(): Observable<string> {
    return this._searchBox.valueChanges;
  }

  /**
   * Handles the key down event and decides when to propagate the event to `MatSelect`.
   *
   * @param event KeyboardEvent
   */
  @HostListener('keydown', ['$event'])
  _handleKeyDown(event: KeyboardEvent) {
    if (
      event.keyCode !== DOWN_ARROW &&
      event.keyCode !== UP_ARROW &&
      event.keyCode !== LEFT_ARROW &&
      event.keyCode !== RIGHT_ARROW &&
      event.keyCode !== HOME &&
      event.keyCode !== END &&
      event.keyCode !== ENTER &&
      event.keyCode !== SPACE &&
      (event.keyCode !== A || !event.ctrlKey)
    ) {
      event.stopPropagation();
    }
  }

  /** Places the focus on the input element. */
  focus() {
    if (this._searchBoxInputElement.nativeElement) {
      this._searchBoxInputElement.nativeElement.focus();
    }
  }

  /** Resets the value of the input element. */
  clear() {
    this._searchBox.setValue('');
  }
}
