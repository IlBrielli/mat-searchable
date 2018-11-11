# MatSearchable
[![npm version](https://img.shields.io/npm/v/@bl4y/mat-searchable.svg?style=flat-square)](https://www.npmjs.com/package/@bl4y/mat-searchable)

[https://github.com/bl4y/mat-searchable](https://github.com/bl4y/mat-searchable)

## What is MatSearchable?
*MatSearchable* is a lightweight library for adding filtering and searching capabilities to the [MatSelect](https://material.angular.io/components/select/overview) component.

![Intro](https://raw.githubusercontent.com/bl4y/mat-searchable/master/docs/intro.png)

## ..yet another searching library?
Well, almost!

The most important trait of *MatSearchable* (compared to other extension libraries) is that it requires **no refactorization** of your current MatSelect implementation.

*MatSearchable* does not manipulate your original input data or require you to mess up your clean code. It leverages advanced DOM manipulation techniques, reaching identical performance to the built-in core directives, like **ngFor**.

**Try** it on StackBlitz: [https://stackblitz.com/edit/mat-searchable-demo](https://stackblitz.com/edit/mat-searchable-demo)

## How to use it?
#### Install the package:
```sh
npm install @bl4y/mat-searchable
```

#### Reference the module in your `app.module.ts`:
```typescript
import { MatSearchableModule } from '@bl4y/mat-searchable';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    MatSearchableModule //! <- IMPORT THIS
  ]
})
export class AppModule { }
```

#### Add the neccessary directives and components to your current logic:
```html
<mat-select matSearchable>
  <mat-searchable-input placeholder="What do you want to search for?"></mat-searchable-input>
  <ng-container *ngFor="let country of countries">
    <mat-option *matSearchableItem [value]="country.code">
      {{ country.name }}
    </mat-option>
  </ng-container>
</mat-select>
```

Here is a diff to show how easy it is to extend the *MatSelect* functionality with *MatSearchable*:
![Diff](https://raw.githubusercontent.com/bl4y/mat-searchable/master/docs/diff.png)

Pretty awesome, huh?

## Inputs
Currently the only input supported on the `MatSearchableInputComponent` is setting the placeholder text.

```typescript
/** Label of the input placeholder.  */
@Input()
placeholder = 'Search..';
```

## Dependencies
* `@angular/core`: `>=5.0.0`
* `@angular/common`: `>=5.0.0`
* `@angular/forms`: `>=5.0.0`
* `@angular/cdk`: `>=5.0.0`
* `@angular/material`: `>=5.0.0`
* `rxjs`: `>=5.5.2`

## Contributions
Contributions are always welcome, please open an issue or a pull request!

## Support me!
If you feel like this library supported you and your project, you can contribute to it's maintenance by [buying me a cup of coffee](https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=D8FHCS57JAD3N) :)
