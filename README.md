# vue-position-after-transform

Because Css is positioning elements before transform, some special positioning is difficult or even impossible.

`Vue-position-after-transform` does js positioning after css-transform - with the help of `getBoundingClientRect`.

### [Demo](https://vue-comps.github.io/vue-position-after-transform)

# Install

```sh
npm install --save-dev vue-position-after-transform
```
or include `build/bundle.js`.

## Usage
```coffee
# link the components up
components:
  "pat": require("vue-position-after-transform").parent
  "patc": require("vue-position-after-transform").child
  # or when using bundle.js:
  "pat": window.vueComps.pat
  "patc": window.vueComps.patc
```
```html
# in the template
<pat>
  <patc style="transform:rotate(45deg)">some rotated stuff</patc>
</pat>
```
For examples see [`dev/`](https://github.com/vue-comps/vue-position-after-transform/tree/master/dev).

#### Props
| Name | type | default | description |
| ---:| --- | ---| --- |
| update | Boolean | false | will update on element resize |
| valign | String | "top" | available: "top", "center", "bottom" |
| halign | String | "left" | available: "left", "center","justify", "right" |
| childwidth | String | "mean" | available: "mean", "actual" or an absolute number; width which is taken to position the children. |
| origin | String | "center" | available: "left", "center", "right"; used in halign: "center" and "justify" to position child relative to given childwidth |
| rotatedParent | Boolean | false | set `true` when the component is rotated somehow. This will append the content to `body` during calculation, consequently all nested styling will be ignored |

# Development
Clone repository.
```sh
npm install
npm run dev
```
Browse to `http://localhost:8080/`.

## License
Copyright (c) 2016 Paul Pflugradt
Licensed under the MIT license.
