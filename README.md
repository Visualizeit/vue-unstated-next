# vue-unstated-next

The state management library inspired by [unstated-next](https://github.com/jamiebuilds/unstated-next) is suitable for Vue Composition API

## Features

- :muscle: Type Safe
- :rocket: No performance overhead
- :zap: Lightweight in size

## Installation

```
npm install vue-unstated-next
# or 
yarn add vue-unstated-next
```

## Usage

### Creating a Container

use **createContainer** to define the state to be shared

```ts
//CounterService.ts
import { ref } from 'vue'
import { createContainer } from 'vue-unstated-next'

const useCounter = (initialValue: number = 0) => {
    const count = ref(initialValue)

    const increase = () => count.value++
    const decrease = () => count.value--

    return {
        count,
        increase,
        decrease
    }
}

export const CounterService = createContainer(useCounter)
```
### Define provider

define the provider in the parent component

provider have two styles: function and component,Both have the same effect

#### useProvider

pass the parameter into the **useProvider** to define the initial state

```vue
<!-- Parent.vue -->
<template>
    <Child />
    <Child />
</template>

<script setup lang="ts">
import Child from './components/Child.vue'
import { CounterService } from '../src/useCounter'

CounterService.useProvider(10)

</script>
```

#### ComponentProvider

use **initial-state** prop to define the initial value

```ts
//CounterService.ts
export const CounterService = createContainer(useCounter)
//add componentProvider export
export const CounterServiceProvider = CounterService.Provider
```



```vue
<!-- Parent.vue -->
<template>
    <CounterServiceProvider :initial-state="10">
        <Child />
        <Child />
    </CounterServiceProvider>
</template>

<script setup lang="ts">
import Child from './components/Child.vue'
import { CounterServiceProvider } from '../src/useCounter'

</script>
```



### Using containers

 child component use **useContainer** to get state

```vue
<!-- Child.vue -->
<template>
    count:{{ count }}
    <button @click="decrease()">-</button>
    <button @click="increase()">+</button>
</template>

<script setup lang="ts">
import { CounterService } from '../../src/useCounter'

const { count, decrease, increase } = CounterService.useContainer()

</script>
```

