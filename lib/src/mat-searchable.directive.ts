import { Directive, OnInit, AfterContentInit, OnDestroy, ContentChildren, QueryList, ContentChild, Input } from '@angular/core';
import { MatSelect } from '@angular/material';
import { Subject, Observable } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, withLatestFrom, startWith, first } from 'rxjs/operators';
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

  /** Whether the input box (and selection, as well) should be cleared on opening the dropdown. */
  @Input()
  clearSearchInput = false;

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
            if (this.clearSearchInput && !!this._matSelect.value) {
              // HACK: normally, these are not accessible.
              this._matSelect._selectionModel.clear();
              (<any>this._matSelect)._propagateChanges(undefined);
            }

            this._searchableBox.focus();
          } else if (this.clearSearchInput) {
            this._clear();
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
        ([searchValue, optionDirectives]) => this._filterOptionDirectives(optionDirectives, searchValue)
      );
  }

  ngOnDestroy() {
    this._destroys$.next();
    this._destroys$.complete();
  }

  /** Silently clears the search input and the filtering. */
  private _clear() {
    this._searchableBox.clear(true);
    this._getDirectiveChanges()
      .pipe(
        first()
      )
      .subscribe(optionDirectives => this._filterOptionDirectives(optionDirectives, ''));
  }

  /** Filters the available options according to the search value. */
  private _filterOptionDirectives(optionDirectives: QueryList<MatSearchableItemDirective>, searchValue: string) {
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

  /** Returns the stream of searchable items changes. */
  private _getDirectiveChanges(): Observable<QueryList<MatSearchableItemDirective>> {
    return this._matOptionDirectives.changes
      .pipe(
        startWith(this._matOptionDirectives)
      );
  }
}
