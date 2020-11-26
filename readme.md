# @bytesoftio/store

## Installation

`yarn add @bytesoftio/store` or `npm install @bytesoftio/store`

## Table of contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Description](#description)
- [createStore](#createstore)
- [ObservableStore](#observablestore)
- [Usage in React](#usage-in-react)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Description

Similar to the [@bytesoftio/value](https://github.com/bytesoftio/value) package, except this one is optimized for use with objects. It comes with
differs, mergers and can be used with a custom mapper / connector. Thanks to the [@bytesoftio/use-store](https://github.com/bytesoftio/use-store) package, this library allows you to write stores that can be used in any environment as well as inside React through hooks.

## createStore

Creates a new instance of `ObservableStore` .

```ts
import { createStore } from "@bytesoftio/store"

// create a new store from initial state
const store = createStore({some: "data"})
```

## ObservableStore

A very simple observable like object.

```ts
import { createStore } from "@bytesoftio/store"

const store = createStore({firstName: "John", lastName: "Doe"})

// get the underlying store value, read only
store.get()

// update all of the store data
store.set({firstName: "Steve", lastName: "Jobs"})

// update some of the store data
store.add({lastName: "Wozniak"})

// reset store back to initial state {firstName: "John", lastName: "Doe"}
store.reset()

// reset store state and change its initial value
store.reset({firstName: "James", lastName: "Bond"})

// listen to state changes outside
store.listen(state => console.log(state))
```

## Usage in React

To learn how to use this package inside React, please refer to the [@bytesoftio/use-store](https://github.com/bytesoftio/use-store) package.
