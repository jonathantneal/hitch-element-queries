# Hitch Element Queries

Element queries allow developers style elements based on their own measurements. [Hitch.js](https://github.com/jonathantneal/Hitch) is used to enable these features in CSS.

## Syntax

Syntactically, element query features resemble CSS pseudo classes: they consist of a **selector**, a **colon**, a **feature** name, and a **value** to test for.

```css
<selector>:<query>(<value>)
```

## Features

Element queries let the presentation of content be tailored to a wide range of viewing experiences without having to change the content itself.

## Width

`min-width` and `max-width` describe the layout width of an element. This includes its horizontal borders, horizontal padding, horizontal scrollbar (if present and rendered), and its CSS width.

```css
:min-width(<value>)
```

```css
:max-width(<value>)
```

## Height

`min-height` and `max-height` describe the layout height of an element. This includes its vertical borders, vertical padding, vertical scrollbar (if present and rendered), and its CSS height.

```css
:min-height(<value>)
```

```css
:max-height(<value>)
```

## Aspect Ratio

`min-aspect-ratio` and `max-aspect-ratio` describe the aspect ratio of an element. This value consists of two positive integers separated by a slash `/` character. This represents the ratio of horizontal pixels (first term) to vertical pixels (second term).

```css
:min-aspect-ratio(<ratio>)
```

```css
:max-aspect-ratio(<ratio>)
```

## orientation

`orientation` describes whether an element is in landscape (it is wider than it is tall) or portrait (it is taller than it is wide) mode.

```css
:orientation(<landscape|portrait>)
```
