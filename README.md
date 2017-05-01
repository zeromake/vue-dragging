Awe-dnd
========
Makes your elements draggable in Vue. 

![](https://github.com/hilongjw/vue-dragging/blob/master/preview.gif)

See Demo: [http://hilongjw.github.io/vue-dragging/](http://hilongjw.github.io/vue-dragging/)

Some of goals of this project worth noting include:

* support desktop and mobile 
* Vue data-driven philosophy
* Supports both of Vue 1.0 and Vue 2.0


## Requirements

- Vue: ^1.0.0 or ^2.0.0 

## Install

From npm:

``` sh

$ npm install awe-dnd --save

```

## Usage

``` javascript
//main.js

import VueDND from 'awe-dnd'

Vue.use(VueDND)
```

``` html
<!--your.vue-->
<script>
export default {
  data () {
    return {
        colors: [{
            text: "Aquamarine"
        }, {
            text: "Hotpink"
        }, {
            text: "Gold"
        }, {
            text: "Crimson"
        }, {
            text: "Blueviolet"
        }, {
            text: "Lightblue"
        }, {
            text: "Cornflowerblue"
        }, {
            text: "Skyblue"
        }, {
            text: "Burlywood"
        }]
    }
  }
}
</script>

<template>
  <div class="color-list" v-dragevent="{ group: 'color', list: colors}">
      <div 
          class="color-item" 
          v-for="color in colors" v-dragging="{ item: color, group: 'color' }"
          :key="color.text"
      >{{color.text}}</div>
  </div>
</template>
```

# API

`v-dragging="{ item: color, group: 'color' }"`
`v-dragevent="{ group: 'color', list: colors, dragged: handleDragged, dragend: handleDragend }"`
#### Arguments:

 * `{item} Object require`
 * `{list} Array require`
 * `{group} String require`
 * `{dragged} Function`
 * `{dragend} Function`

 `group` is unique key of dragable list.
 `dragged` is dragged event function.
 `dragend` is dragend event function.

#### Example

``` html
<!-- Vue2.0 -->
<div class="color-list" v-dragevent="{ group: 'color', list: colors}">
    <div 
        class="color-item" 
        v-for="color in colors" v-dragging="{ item: color, group: 'color' }"
        :key="color.text"
    >{{color.text}}</div>
</div>

<!-- Vue1.0 -->
<div class="color-list" v-dragevent="{ group: 'color', list: colors}">
    <div 
        class="color-item" 
        v-for="color in colors" v-dragging="{ item: color, group: 'color', key: color.text }"
        track-by="text"
    >{{color.text}}</div>
</div>
```

#### Event

``` html
<div class="color-list" v-dragevent="{ group: 'color', list: colors, dragged: handleDragged, dragend: handleDragend }">
    <div 
        class="color-item" 
        v-for="color in colors" v-dragging="{ item: color, group: 'color', otherData: otherData }"
        :key="color.text"
    >{{color.text}}</div>
</div>
```

``` javascript
export default {
    methods: {
        handleDragged: function(data) {
            console.log('dragged', data)
        },
        handleDragend: function(data) {
            console.log('dragend', data)
        }
    }
}
```

# License

[The MIT License](http://opensource.org/licenses/MIT)
