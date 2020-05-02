import {
  ObservableStore,
  StoreCallback,
  StoreCallbackUnsubscribe,
  StoreDiffer,
  StoreMapper,
  StoreMerger,
} from "./types"
import { defaultMerger } from "./defaultMerger"
import { defaultDiffer } from "./defaultDiffer"
import { defaultMapper } from "./defaultMapper"
import { StoreListener } from "./StoreListener"
import { cloneDeep } from "lodash"

export class Store<S extends object> implements ObservableStore<S> {
  initialState: S
  state: S
  merger: StoreMerger<S>
  differ: StoreDiffer<any>
  listeners: StoreListener<S, any>[]

  constructor(
    initialState: S,
    merger: StoreMerger<S> = defaultMerger,
    differ: StoreDiffer<S> = defaultDiffer,
  ) {
    this.initialState = cloneDeep(initialState)
    this.state = cloneDeep(initialState)
    this.differ = differ
    this.merger = merger
    this.listeners = []
  }

  get(): S {
    return cloneDeep(this.state)
  }

  set(newState: S) {
    const isDifferent = this.differ(this.state, newState)

    if (isDifferent) {
      this.state = cloneDeep(newState)
      this.notify()
    }
  }

  add(newState: Partial<S>) {
    const mergedNewState = this.merger(this.state, cloneDeep(newState))

    this.set(mergedNewState)
  }

  reset(initialState?: S) {
    if (initialState) {
      this.initialState = cloneDeep(initialState)
    }

    this.set(this.initialState)
  }

  listen<SM extends object = S>(callback: StoreCallback<SM>, mapper?: StoreMapper<S, SM>, notifyImmediately: boolean = true): StoreCallbackUnsubscribe {
    mapper = mapper ? mapper : defaultMapper as StoreMapper<S, SM>

    const listener = new StoreListener<S, SM>(callback, this, mapper, this.differ)
    this.listeners.push(listener)

    if (notifyImmediately) {
      listener.notify(this.state)
    }

    return () => {
      this.listeners = this.listeners.filter(item => item !== listener)
    }
  }

  protected notify() {
    this.listeners.forEach(listener => listener.notify(this.state as any))
  }
}