import { Directive, OnInit, AfterContentInit, OnDestroy, ContentChildren, QueryList, ContentChild } from '@angular/core';
import { MatSelect } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, withLatestFrom, startWith } from 'rxjs/operators';
import { MatSearchableItemDirective } from './mat-searchable-item.directive';
import { MatSearchableInputComponent } from './mat-searchable-input.component';

/** Directive for marking a `MatSelect` component searchable. */
@Directive({
  selector: '[matSearchable]'
})
export class MatSearchableDirective implements OnInit, AfterContentInit, OnDestroy {
  /** Holds the list of `MatSearchableItemDirective` references. */
  @ContentChildren(MatSearchableItemDirective)
  private _matOptionDirectives: QueryList<MatSearchableItemDirective>;

  /** Holds the reference to the search input component. */
  @ContentChild(MatSearchableInputComponent)
  private _searchableBox: MatSearchableInputComponent;

  /** Subject for signalling component destruction. */
  private _destroys$ = new Subject<null>();

  constructor (
    private _matSelect: MatSelect
  ) { }

  ngOnInit() {
    /** Subscribe to dropdown opening / closing. */
    this._matSelect.openedChange
      .pipe(
        takeUntil(this._destroys$)
      )
      .subscribe(
        opened => {
          if (opened) {
            this._searchableBox.focus();
          }
        }
      );
  }

  ngAfterContentInit() {
    /** Subscribe to filtering input changes. */
    this._searchableBox.changes$
      .pipe(
        debounceTime(50),
        distinctUntilChanged(),
        withLatestFrom(this._getDirectiveChanges()),
        takeUntil(this._destroys$)
      )
      .subscribe(
        ([searchValue, optionDirectives]) => {
          optionDirectives.forEach(item => {
            const value = searchValue + '';
            const contains = item.text.includes(value.trim().toLowerCase());
            if (contains) {
              if (item.detached) {
                item.attach();
              }
            } else {
              if (!item.detached) {
                item.detach();
              }
            }
          });
        }
      );
  }

  ngOnDestroy() {
    this._destroys$.next();
    this._destroys$.complete();
  }

  /** Returns the stream of searchable items changes. */
  private _getDirectiveChanges(): Observable<QueryList<MatSearchableItemDirective>> {
    return this._matOptionDirectives.changes
      .pipe(
        startWith(this._matOptionDirectives)
      );
  }
}
