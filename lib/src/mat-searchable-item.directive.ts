import { Directive, OnInit, DoCheck, EmbeddedViewRef, ViewContainerRef, TemplateRef } from '@angular/core';

/** Name of the `mat-option` node. */
const matOptionNodeName = 'MAT-OPTION';

/** Directive for marking a `MatOption` searchable. */
@Directive({
  selector: '[matSearchableItem]'
})
export class MatSearchableItemDirective implements OnInit, DoCheck {
  /** Holds a reference to the view of the item. */
  private _view: EmbeddedViewRef<null>;

  /** Holds the text content of the item. */
  private _text: string;

  constructor (
    private _viewContainer: ViewContainerRef,
    private _template: TemplateRef<null>
  ) { }

  /**
   * Determines whether the item is currently detached from the view container.
   *
   * @returns boolean
   */
  get detached(): boolean {
    return !this._viewContainer.length;
  }

  /**
   * Retrieves the text content of the item.
   *
   * @returns string
   */
  get text(): string {
    return this._text;
  }

  /**
   * Refreshes the `_text` field with the latest text content.
   *
   * @param view Reference to the view.
   */
  private _refreshText(view: EmbeddedViewRef<null>) {
    if (view.rootNodes) {
      const rootNode = view.rootNodes.find(node => node.nodeName === matOptionNodeName);
      if (rootNode) {
        this._text = (rootNode.textContent + '').toLowerCase();
      }
    }
  }

  ngOnInit() {
    // create the embedded view from the template of the structural directive and store the reference
    this._view = this._viewContainer.createEmbeddedView(this._template);
  }

  ngDoCheck() {
    // refresh the text content on each change detection tick
    this._refreshText(this._view);
  }

  /** Attaches the view to the view container, making it appear in the DOM. */
  attach() {
    this._viewContainer.insert(this._view);
  }

  /**
   * Detaches the view from the view container, making it disappear from the DOM. The reference to the
   * view will be retained for optimization purposes.
   */
  detach() {
    this._viewContainer.detach();
  }
}
