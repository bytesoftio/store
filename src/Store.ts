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

export class Store<TState extends object> implements ObservableStore<TState> {
  initialState: TState
  state: TState
  merger: StoreMerger<TState>
  differ: StoreDiffer<any>
  listeners: StoreListener<TState, any>[]

  constructor(
    initialState: TState,
    merger: StoreMerger<TState> = defaultMerger,
    differ: StoreDiffer<TState> = defaultDiffer,
  ) {
    this.initialState = cloneDeep(initialState)
    this.state = cloneDeep(initialState)
    this.differ = differ
    this.merger = merger
    this.listeners = []
  }

  get(): TState {
    return cloneDeep(this.state)
  }

  set(newState: TState) {
    const isDifferent = this.differ(this.state, newState)

    if (isDifferent) {
      this.state = cloneDeep(newState)
      this.notify()
    }
  }

  add(newState: Partial<TState>) {
    const mergedNewState = this.merger(this.state, cloneDeep(newState))

    this.set(mergedNewState)
  }

  reset(initialState?: TState) {
    if (initialState) {
      this.initialState = cloneDeep(initialState)
    }

    this.set(this.initialState)
  }

  listen<TStateMapped extends object = TState>(callback: StoreCallback<TStateMapped>, notifyImmediately: boolean = true, mapper?: StoreMapper<TState, TStateMapped>): StoreCallbackUnsubscribe {
    mapper = mapper ? mapper : defaultMapper as StoreMapper<TState, TStateMapped>

    const listener = new StoreListener<TState, TStateMapped>(callback, mapper, this.differ)
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
