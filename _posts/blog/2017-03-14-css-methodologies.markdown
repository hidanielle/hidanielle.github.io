---
layout: post
title:  "An introduction to CSS Methodologies: Naming Conventions and File Structures"
date:   2017-03-14 12:48:54 -0500
categories:
- blog
---


CSS Methodologies are structured ways of writing and organizing your CSS and HTML. Adopting a standard convention has benefits across small and large projects, but choosing the right one can be difficult at first. The range of methodologies go from strict to more relaxed, and sometimes even rolling your own convention is the best way to go. Below, I've compiled various popular CSS mehodologies and a (somewhat) brief introduction of each.

*Originally posted on [Codepen](https://codepen.io/hidanielle/post/css-methodologies-naming-conventions-and-file-structures)*


> Modularity, DRY, SRP, etc. is never a goal, \*it’s a trait\*. Don’t
> let the pursuit of theory get in the way of actual productivity.” -
> @csswizardry

## BEM 

### Intro
> “BEM (Block, Element, Modifier) is a component-based approach to web development. The idea behind it is to divide the user interface into independent blocks. This makes interface development easy and fast even with a complex UI, and it allows reuse of existing code without copying and pasting.”

### Rules

#### General
* Very opinionated
* Class name selectors only - no tags or ID’s
* Block and Element names describe purpose (_"What is it?" — menu or button_), not its state (_"What does it look like?" — red or big_).

#### Blocks
_A functionally independent page component that can be reused_

* If a section of code might be reused and it doesn't depend on other page components being implemented, you should create a block.
* The block shouldn't influence its environment, meaning you shouldn't set the external geometry (margin) or positioning for the block.
* Can be nested inside eachother

#### Element
_Part of a block_

* If the section of code can't be used separately without the parent entity (the block), an element is usually created.
* Element name is separated from the block name with a double underscore (`__`).
* An element is always part of a block, not another element. 
* The block name defines the namespace, which guarantees that the elements are dependent on the block (`block__elem`).

#### Modifier
_Defines the appearance, state, or behavior of a block or element_

* Name is separated from the block or element name by a single underscore (`_`)
* Can’t be used alone - make sure to apply the original block or element class still

##### Boolean
_Used when only the presence or absence of the modifier is important, and its value is irrelevant_

* For example, `disabled`
* If a Boolean modifier is present, its value is assumed to be true.
* The structure of the modifiers full name follows the pattern:
  * `block-name_modifier-name`
  * `block-name__element-name_modifier-name`

##### Key-value
_Used when the modifier value is important_

* For example, _"a menu with the islands design theme"_: `menu_theme_islands`
* The structure of the modifiers full name follows the pattern:
  * `block-name_modifier-name_modifier-value`
  * `block-name__element-name_modifier-name_modifier-value`

##### Common modifications
* No key-value type modifiers
* Modifier name is separated from the block or element name by a double dash (--) instead of a single underscore
`block-name--modifier-name`


#### Mixing
_A technique for using different BEM entities on a single DOM node_

* This is where you could put position/parent specific styles like margins
* Mixes allow you to:
  * Combine the behavior and styles of multiple entities without duplicating code.
  * Create semantically new UI components based on existing ones.

In the following example, the `search-form` block is mixed with the `search-form` element of the `header` block - this way, we can apply position specific styles to the element because it is dependent on it’s parent header block.

```
<div class="header">
    <div class="search-form header__search-form"></div>
</div>

```

### Markup Examples

#### Dom Tree
```
<div class="block">
    <div class="block__elem1">
        <div class="block__elem2">
            <div class="block__elem3"></div>
        </div>
    </div>
</div>
```
#### Bem Tree
```
.block {}
.block__elem1 {}
.block__elem2 {}
.block__elem3 {}
```

#### Sass
```
.block {
    &__elem1 {}
    &__elem2 {}
    &__elem3 {}
}
```

### File Structure

#### Nested
_A file for everything_

* A directory in the file structure for every block, that is named after that block
* Names of files are based off of the BEM naming convention
* Folders contain all files relating to that block (css, js, etc), or could just be CSS
* Modifiers and elements of a block are saved as separate files in block sub directories

```
blocks/
    input/
      _type/          # type modifier directory
            input_type_search.css     
        input.css       # input block implementation in CSS
        input.js        # input block implementation in JavaScript
    button/
        button.css
        button.js
        button.png

```

#### Just Blocks

_Put all blocks and block-specific elements and modifiers in separate files that get included in to one css file_

```
blocks/
  head.css
  menu.css
```

#### All Related Files
_Put all blocks in their own directory_

```
blocks/
   menu/
      menu.js
      menu.css
```

## OOCSS
_More like a concept - doesn’t have standard naming conventions and can play well with BEM as the goals are the same: code reuse._

### Basic Principles

#### Separating Structure From Skin:
_To abstract the structure and positioning styles of an object from the presentational styles, or skin._

* Things like Position, float, margin, etc from background-color, border, etc
* Don’t mix these properties with skin/styling properties on the same class.
* Skinning properties and be reused on a variety of elements, preventing property duplication.
* In something like BEM, all of these potentially different specific styles can be handled by modifiers, or mixing of blocks and elements.

#### Separating Container From Content
_To break components’ dependency of their containers. Any object should be able to be placed in another container and still look and behave the same._

* Styled element should never be dependent on where it’s at in a page - (_think blocks and elements_)
* Go straight into object, give them a class and reference that in your CSS.
* Never mimic the structure of your HTML in CSS - don’t refer to tags or IDs in your stylesheets.
* Create and apply classes that describe the use of the tag in question.
* Keep nested classes to a bare minimum.


## SMACSS
### Intro
_Scalable and Modular Architecture for CSS_
> “At the very core of SMACSS is categorization. By categorizing CSS rules, we begin to see patterns and can define better practices around each of these patterns.”

### Goals
* Increase the semantic value of a section of html and content
* Decrease the expectation of a specific html structure

### Rules
#### General
* Much less opinionated
* Fine with IDs and descendent selectors where appropriate
  * Single use calls for IDs. 
  * Multiple uses call for classes.
* Pages are made up of "major" and "minor" components
* Structure is as follows:
  * **base** (the defaults, reset can go here, styles that remain consistent everywhere the element is)
  * **layout** (divide page into sections, hold one or more modules together)
  * **module** (reusable, modular parts; callouts, sidebar, product lists, media elements)
  * **state** (way to describe how modules or layouts will look in a particular state; hidden, expanded, active, inactive)
  * **theme** (define things like a color scheme or typographic treatment across a site)

#### Recommended Naming Convention
* **Base** - nothing
* **Layout** - `l-`
* **States** - `is-` (`is-hidden`, `is-collapsed`)
* **Modules** - just use the name of the module itself, as they are the bulk of the project, related modules receive a consistent prefix to help organize them

#### Base
* Styles applied directly to elements through element selectors, descendents, child, pseudo selectors, NOT specific class or ID’s
* **AKA**: Default styles for elements - CSS resets is a good example of this

#### Layout
* Styling for **Major** page components (things like the header, banner, footer, etc)

#### Module
* Styling for **Minor** page components that tend to live inside **layouts** and even within other modules
* Designed to exist on their own - avoid IDs
* Child elements in SMACSS (_like what an “element” is to a “block” in BEM_) have the parent item prefixed with a dash.
  * `menu` and `menu-item`.

##### Subclassing Modules
* Will likely need to reuse a module in a different section where it might look slightly different
* Create a new class off of the main class that will apply that change only - avoiding any specificty issues
* **This is kind of like a modifier class in BEM, or like _mixing_ blocks/elements**
* Keep the base module name and the new sub-module name on the HTML element (_need to make sure the element gets the default styles and the modifications_)

#### State
_Overrides under certain conditions_

* For example:
  * An accordion section may be in a collapsed or expanded state
  * A message may be in a success or error state.”
* States are generally applied to the same element as a layout rule or applied to the same element as a base module class.
* These often imply a JS dependancy - as in something happened to actually toggle that class
* `!important` is allowed and sometimes recommended since you won’t normally have two states applied that affect the same attribute so conflicts are unlikely (_still, leave this off until you actually NEED it_)
* In a case where a state rule is made for a specific module, the state class name should include the module name in it. The state rule should also reside with the module rules and not with the rest of the global state rules.
  * `is-accordion-collapsed`

#### Theme
* Themes can affect any of the primary types. 
  * It could override base styles like default link colours. 
  * It could change module elements such as chrome colours and borders. 
  * It could affect layout with different arrangements. 
  * It could alter how states look.
* Not one of the "core" types as it's not used often - though likely used often in content management systems to provide editors with more flexibility
* For example, a dialog module that needs to have a border colour of blue, the border itself would be initially defined in the module and then the theme defines the colour

### File Structure Possibilities
#### A File For Each 
```
base.scss
layout.scss
module.scss
state.scss
```

#### A Folder For Each
```
base/
  _b-reset.scss
layout/
  _l-grid.scss
module/
  _m-accordion.scss
state/
  _s-global.scss
  _s-accordion.scss
```



## ITCSS
### Intro
_Inverted Triangle CSS: Scalable and maintainable_

> “Instead of grouping things into 'typographic styles' , or 'form styles' , we are breaking them into groups based around specificity, reach and explicitness.”

* ITCSS can be used with preprocessors or without them and is compatible with CSS methodologies like BEM, SMACSS or OOCSS.
* Separates your CSS codebase to several layers
* No open source documentation - partially proprietary, created by Harry Roberts

![Picture of ITCC Triangle](https://cdn-images-1.medium.com/max/800/1*RfxbLlVnVwaH11Fs9tVAzQ.png)

### Rules
#### General
> “Class-based architecture. You are not afraid of adding classes to your HTML; you don't believe that 'less markup' and 'clean markup' are the same thing; and you understand that binding onto classes, rather than bare HTML elements, provides a more robust and scalable architecture.”

* No IDs in CSS
* Componentised UI architecture
* The first two layers don't generate any CSS and are only used with pre-processors

#### Namespacing And Bemit
* By namespacing styles, you can provide other developers with important contextual information - ie. what to avoid editing because it could have negative effects elsewhere, what is just a specific component, etc.
* The **BEMIT** recommended naming convention takes the namespacing approach that ITCSS has and combines it with the block approach of BEM.

> “The one thing missing from BEM is that it only tells us what classes to in relative terms, as in, how classes are related to each other. They don’t really give us any idea of how things behave, act, or should be implemented in a global and non-relative sense.”



#### Layer 1: Settings
* Used with preprocessors 
* Contain font, colors definitions, base font size, config, etc.that are GLOBAL 
  * NOT Settings like `$heading-size-1` - that should be defined in the Headings partial

#### Layer 2: Tools
* Globally used mixins and functions. 
* Imported after the Settings layer because a mixin may require one of the global settings
* Contains things like gradient mixins, font-sizing mixins, a11y classes

#### Layer 3: Generic
* Reset and/or normalize styles, box-sizing definition, etc. 
* This is the first layer which generates actual CSS.
* Very high-level, far reaching styles
* Contains things like CSS resets, box sizing rules, etc.
* Affects a lot of the DOM

#### Layer 4: Elements
* Styling for bare HTML elements (like H1, A, etc.). 
* These come with default styling from the browser and this is where you override that
* “_What does an h1 look like without a class on it?_”, generic form elements, etc.
* Typically the last layer to contain bare, element-based selectors
* Rarely added to or changed after initial setup

#### Layer 5: Objects
* Class-based selectors which define undecorated design patterns, for example media object known from OOCSS
* Range from something as simple as a `.wrapper` element, to layout systems
* In SMACSS, for example, these might be considered “layouts”

##### **Recommended Naming Convention**
`.o-object-name[<element>|<modifier>] {}`

```
.o-layout {}
  .o-layout__item {}
.o-layout--fixed {}
```

#### Layer 6: Components
* Specific UI components
* This is where majority of our work takes place and our UI components are often composed of Objects and Components
* Shouldn't find any selectors with a lower specificity than one class in this layer
* These are like Blocks in BEM, that can contain Elements

##### **Recommended Naming Convention**
`.c-component-name[<element>|<modifier>] {}`

```
.c-modal {}
  .c-modal__title {}
.c-modal--gallery {}
```
#### Layer 7: Trumps
* Utilities and helper classes with ability to override anything which goes before in the triangle
* Inelegant and heavy-handed, eg. `.sr-only`, `.text-center`
* A lot of the declarations in this layer will carry `!important`
* Highest specificity layer

##### **Recommended Naming Convention**
`.u-utility-name {}`

```
.u-clearfix {}
```


#### Themes, Scopes, States And Hacks

BEMIT provides namespacing recommendations for various other classes that come up often in development. This sets up teams for success and easier understanding when jumping into other projects

##### **Themes**
`.t-theme-name {}`

* Like themes in SMACSS - states that give CMS editors flexibility 
* Classes don't need to exist on their own, and can simply be included wherever they effect something via SASS nesting
* Seeing a theme in your HTML will tell a developer that this has been modified to look a certain way

In the below example, the `&` will output `.t-light .c-btn` which basically says _"the button will look like this when it is in this theme"_

```
.c-btn {
  display: inline-block;
  padding: 1em;
  background-color: #333;
  color: #e4e4e4;
  .t-light & {
    background-color: #e4e4e4;
    color: #333;
  }
}
```

##### **Scopes**
`.s-scope-name {}`

* Useful within CMS's that output markup that you can't control. You can add a class `s-cms-content` to the parent and then begin styling/overriding any selectors from within that scope.

##### **States**

`.[is|has]-state {}`

```
.is-open {}
.has-dropdown {}
```

* Taken from SMACSS
* Ensures that States are easily noticed, generally follows the same idea as SMACSS states

##### **Hacks**
`._<namespace>hack-name {}`

* Might need to add a class to our markup purely to help us hack or override something
* Naming convention is to mirror the idea of private variables
* These are ugly and should be temporary

##### **Javascript**
`.js-component-name {}`

* Allows for safe collaboration - having classes that are specific to JS hooks

##### **Responsive**
`@<breakpoint>`

* A naming convention for responsive classes (_similar to how certain Frameworks have `hidden-on-mobile`_)
*  **You have to escape the @ symbol in your CSS file**

```
u-hidden\@print {} // a utility class to hide things when in print context.
u-1/4\@lg {} // a utility to make something a quarter width in the large breakpoint.
o-layout\@md {} // a layout object in the medium breakpoint.
```


### File Structure
* Series of partials that are named like  `_<layer>.<partial>.scss`
  * eg. ` _settings.colors.scss`
* Alternatively could have folders for each layer as well
* Partials should be kept as small and granular as possible, with each one containing only as much CSS as it needs to fulfill its role.
  * `_elements.headings.scss` would contain only the rules for `h1` to `h6` and nothing more
 
#### Example `app.scss`
```
@import "settings.global";
@import "settings.colors";

@import "tools.functions";
@import "tools.mixins";

@import "generic.box-sizing";
@import "generic.normalize";

@import "elements.headings";
@import "elements.links";

@import "objects.wrappers";
@import "objects.grid";

@import "components.site-nav";
@import "components.buttons";
@import "components.carousel";

@import "trumps.clearfix";
@import "trumps.utilities";
@import "trumps.ie8";
```

### Healthchecks
By writing to these strict conventions, we get autocomplete in text editors, and can easily identify how many of these different types of classes we have - either by highlighting components through select CSS in dev, etc.

## Resources
> - http://www.jamesturneronline.net/blog/bemit-naming-convention.html
> - https://csswizardry.com/2015/03/immutable-css/
> - https://smacss.com/book/formatting
> - https://csswizardry.com/2015/03/more-transparent-ui-code-with-namespaces/
> - https://csswizardry.com/2015/08/bemit-taking-the-bem-naming-convention-a-step-further/
> - http://www.creativebloq.com/web-design/manage-large-css-projects-itcss-101517528
> - https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/
> - https://blog.toughbyte.com/blabla-9fd86eae4e6c#.nh6cbs1qa
> - http://getbem.com/naming/
> - https://alistapart.com/article/meaningful-css-style-like-you-mean-it
> - https://medium.com/@pistenprinz/css-at-trivago-part-2-naming-conventions-and-methodologies-d51b445a3a39#.csk7n44yz
> - https://github.com/suitcss/suit http://cssguidelin.es/
> - https://github.com/stubbornella/oocss/wiki
> - http://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/
> - https://smacss.com/