<template>
  <div @drop="onDrop" style="height: 100%">
    <VueFlow
      v-model="elements"
      :class="{ dark }"
      class="basicflow"
      :default-viewport="{ zoom: 1.5 }"
      :min-zoom="0.2"
      :max-zoom="4"
      style="height: 100%"
      @dragover="onDragOver"
      @dragleave="onDragLeave"
    >
      <Drawer>
        <div
          class="vue-flow__node-input"
          :draggable="true"
          @dragstart="onDragStart($event, 'input')"
        >
          Input Node
        </div>
        <div
          class="vue-flow__node-default"
          :draggable="true"
          @dragstart="onDragStart($event, 'default')"
        >
          Default Node
        </div>
        <div
          class="vue-flow__node-output"
          :draggable="true"
          @dragstart="onDragStart($event, 'output')"
        >
          Output Node
        </div>
      </Drawer>
      <Background :gap="12" />
      <MiniMap />
      <Controls />

      <Panel position="top-right" class="controls">
        <div class="control-btn" title="Reset Transform" @click="resetTransform">
          <Resting />
        </div>
        <div class="control-btn" title="Shuffle Node Positions" @click="updatePos">
          <Shuffle />
        </div>
        <div class="control-btn" title="Log toObject" @click="logToObject">
          <Log />
        </div>
        <div class="control-btn" title="Toggle Dark Mode" @click="toggleDarkMode">
          <Sun v-if="dark" />
          <Moon v-else />
        </div>
      </Panel>
    </VueFlow>
  </div>
</template>

<script setup lang="ts">
import '@vue-flow/core/dist/style.css'
import '@vue-flow/core/dist/theme-default.css'

import { Log, Moon, Resting, Shuffle, Sun } from '@icon-park/vue-next'
import { Background, Controls, MiniMap } from '@vue-flow/additional-components'
import { isNode, Panel, useVueFlow, VueFlow } from '@vue-flow/core'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

// import { initialElements } from './initial-elements'
import { useDragAndDrop } from './useDnD'
const drag = useDragAndDrop()
const { onDrop, onDragOver, onDragLeave, onDragStart } = drag
// const { onConnect, addEdges } = useVueFlow()

const nodes = ref([])

// onConnect(addEdges)

// const { onDragStart } = storeToRefs(useDragAndDrop)

const { setTransform, toObject, onNodeDragStop, onConnect, addEdges } = useVueFlow()

onNodeDragStop((e) => console.log('drag stop', e))

onConnect((params) => addEdges(params))
const { elements } = storeToRefs(drag)
// const elementsValue = ref(drag.elements)
console.log('elements', elements)

function resetTransform() {
  return setTransform({
    x: 0,
    y: 0,
    zoom: 1
  })
}

function updatePos() {
  return elements.value.forEach((el) => {
    if (isNode(el)) {
      el.position = {
        x: Math.random() * 400,
        y: Math.random() * 400
      }
    }
  })
}

function logToObject() {
  return console.log(toObject())
}

const dark = ref(false)
function toggleDarkMode() {
  dark.value = !dark.value
}

// 1. 实现Pick
// function onDragStart(e, type) {

// }

// type MyPick<T, K extends keyof T> = {
//     [P in K]: T[P]
// }

// interface Todo {
//     title: string,
//     description: string,
//     completed: boolean
// }
// // title && completed必填
// type TodoPreview = MyPick<Todo, 'title' | 'completed'>

// const todo: TodoPreview = {
//     title: 'Clean room',
//     completed: false
// }

// console.log('todo', todo)
// // T:{ a: string, b: string }
// type Copy<T> = {
//     [P in keyof T]: T[P]
//     // ['a']: T['a'] --- string
//     // ['b']: T['b'] --- string
// }

// type Case1 = Copy<{ a: string, b: string }>
// const Case2: Case1 = {
//     a: '1',
//     b: '2'
// }
// console.log('Case2', Case2)

// 2.实现Readonly
// readonly不允许修改
// type MyReadonly<T> = {
//     readonly [P in keyof T]: T[P]
// }
// interface Todo {
//     title:string,
//     description: string
// }
// const todo: MyReadonly<Todo> = {
//     title: 'Hey',
//     description: 'foobar'
// }

// todo.title = 'hello'
// todo.description = 'barFoo'

// 3. 元组转为对象
// T[number]：其实就是string | number | symbol类型
// P是数组每一项值要符合T[number]
// type TupleToObject<T extends readonly (string | number | symbol)[]> = {
// type TupleToObject<T extends readonly (string | number | symbol)[]> = {
//     [P in T[number]]: P
//     // T[number]: string
// }
// const tuple = ['tesla', 'model 3', 'model X', 'model Y'] as const
// type result = TupleToObject<typeof tuple>
// const res: result = {
//     tesla: 'tesla',
//     'model 3': 'model 3',
//     'model X': 'model X',
//     'model Y': 'model Y'
// }
// console.log('result', res)

// 4. 第一个元素
// type arr1 = ['a', 'b', 'c']
// type arr2 = [3,2,1]
// type arr3 = []
// // type First<T extends (string | number | symbol)[]> = T['length'] extends 0 ? never : T[0]
// type First<T extends (string | number | symbol)[]> = T extends [] ? never : T[0]

// type head1 = First<arr1>
// type head2 = First<arr2>
// type head3 = First<arr3>

// const test1: head1 = 'a'
// const test2: head2 = 3
// console.log('test1', test1, test2)

// 5. 获取元组长度
// type Length<T extends readonly any[]> = T['length']
// type tesla = ['tesla', 'model 3', 'model X', 'model Y']
// type spaceX = ['FALCON 9', 'FALCON HEAVY', 'DRAFON', 'STARSHIP', 'HUMAN SPACEFIGHT']

// type teslaLength = Length<tesla>
// type spaceXLength = Length<spaceX>

// 6. 实现Exclude
// type MyExclude<T,U> = T extends U ? never : T
// type Result = MyExclude<'a' | 'b' | 'c', 'a'>

// 7. 实现Awaited
// type MyAwaited<T> = T extends | Promise<infer R> | { then: (onfullfilled: (arg: infer R) => any) => any } ? MyAwaited<R> : T
// type ExampleType = Promise<{
//   then: (onfulfilled: (value: string) => any) => any
// }>
// // type ExampleType1 = Promise<ExampleType>
// type Result = MyAwaited<ExampleType>

// type ParamType<T> = T extends (arg: infer P) => any ? P : T;
// interface User {
//   name: string;
//   age: number;
// }

// type Func = (user: User) => void;
// type Param = ParamType<Func>;
// type AA = ParamType<string>;

// 8. 实现If
// type If<C extends boolean, T, F> = C extends true ? T : F
// type A = If<true, 'a', 'b'>
// type B = If<false, 'a', 'b'>

// 9. 实现Concat
// type Concat<T extends any[], U extends any[]> = [...T, ...U]
// type Result = Concat<[1], [2]>

// 10. 实现Includes
// 判断类型和值是否全等
// type MyEqual<A, B> = (<T>() => T extends A ? 1: 2) extends <T>() => T extends B ? 1 : 2 ? true :false
// type Includes<T extends readonly any[], U> = T extends [infer F, ...infer R] ? MyEqual<F, U> extends true ? true : Includes<R, U> : false
// type isPillarMen = Includes<['Kars', 'Esdisi', 'Wamuu', 'Santana'], 'Dio'>

// 11. 实现push
// type Push<T extends any[], U> = [...T, U]
// type Result = Push<[1, 2], 3>

// 12. 实现unshift
// type Unshift<T extends any[], U> = [U, ...T]
// type Result = Unshift<[1, 2], 0>

// 13. 实现Parameters
// type MyParamters<T extends (...args: any) => any> = T extends (...args: infer P) => any ? P : never
// const foo = (arg1: string, arg2: number): void => {}
// const foo1 = () => {}
// type FunctionParamsType = MyParamters<typeof foo>
// type FunctionParamsType1 = MyParamters<typeof foo1>
</script>

<style scoped>
@import url('https://cdn.jsdelivr.net/npm/@vue-flow/controls@latest/dist/style.css');
@import url('https://cdn.jsdelivr.net/npm/@vue-flow/minimap@latest/dist/style.css');

.controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 4px 8px;
  border-radius: 8px;
  background-color: var(--color-gray-100);
  border: 1px solid var(--color-gray-300);
  box-shadow: rgb(0 0 0 / 10%) 1px 2px 20px;
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  color: var(--color-gray-800);
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.control-btn:hover {
  background-color: var(--color-gray-300);
  transition: all 0.2s ease-in-out;
}

.app-left-panel-drawer {
  width: 200px;
  height: 100%;
  box-shadow: var(--color-gray-300) 1px 0 0;
  overflow: hidden;
  z-index: 10;
  position: fixed;
  background-color: #fff;
}

/* 下面我们会解释这些 class 是做什么的 */
.app-left-panel-drawer-enter-active,
.app-left-panel-drawer-leave-active {
  transition: width 0.1s cubic-bezier(0.3, 0.1, 0.3, 1);
}

.app-left-panel-drawer-enter-from,
.app-left-panel-drawer-leave-to {
  width: 0;
}

.app-left-panel-drawer-content {
  width: calc(var(--panel-width) - 60px);
  height: 100%;
  padding: 16px;
}

.basicflow .vue-flow__controls {
  z-index: 11;
}

.vue-flow-box div {
  margin-bottom: 20px;
}
</style>
<style lang="css">
.basicflow.dark {
  background: #000000;
  color: #fffffb;
}
.basicflow.dark .vue-flow__node {
  background: hsl(0, 0%, 10%);
  color: #fffffb;
}
.basicflow.dark .vue-flow__node.selected {
  background: hsl(0, 0%, 20%);
  border: 1px solid hotpink;
}
.basicflow .vue-flow__controls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.basicflow.dark .vue-flow__controls {
  border: 1px solid #fffffb;
}
.basicflow .vue-flow__controls .vue-flow__controls-button {
  border: none;
  border-right: 1px solid #eee;
}
.basicflow.dark .vue-flow__controls .vue-flow__controls-button {
  background: hsl(0, 0%, 20%);
  fill: #fffffb;
  border: none;
}
.basicflow.dark .vue-flow__controls .vue-flow__controls-button:hover {
  background: hsl(0, 0%, 30%);
}
.basicflow.dark .vue-flow__edge-textbg {
  fill: #292524;
}
.basicflow.dark .vue-flow__edge-text {
  fill: #fffffb;
}
</style>
