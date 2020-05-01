export interface ObservableStore<S extends object> {
  state: S
  initialState: S

  get(): S
  set(newState: S): void
  add(newState: Partial<S>): void
  reset(initialState?: S): void

  listen<SM extends object = S>(callback: StoreCallback<SM>, mapper?: StoreMapper<S, SM>, notifyImmediately?: boolean): StoreCallbackUnsubscribe
}

export type StoreCallback<S extends object> = (newState: S) => void
export type StoreCallbackUnsubscribe = () => void
export type StoreMerger<S extends object> = (oldState: S, newState: Partial<S>) => S
export type StoreMapper<S extends object, SM extends object> = (state: S) => SM
export type StoreDiffer<S extends object> = (oldState: S, newState: S) => boolean
export type CreateStore = <S extends object>(initialState: S) => ObservableStore<S>