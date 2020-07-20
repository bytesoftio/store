export interface ObservableStore<TState extends object> {
  state: TState
  initialState: TState

  get(): TState
  set(newState: TState): void
  add(newState: Partial<TState>): void
  reset(initialState?: TState): void

  listen<TStateMapped extends object = TState>(callback: StoreCallback<TStateMapped>, notifyImmediately?: boolean, mapper?: StoreMapper<TState, TStateMapped>): StoreCallbackUnsubscribe
}

export type StoreCallback<TState extends object> = (newState: TState) => void
export type StoreCallbackUnsubscribe = () => void
export type StoreMerger<TState extends object> = (oldState: TState, newState: Partial<TState>) => TState
export type StoreMapper<TState extends object, TStateMapped extends object> = (state: TState) => TStateMapped
export type StoreDiffer<TState extends object> = (oldState: TState, newState: TState) => boolean
export type CreateStore = <TState extends object>(initialState: TState) => ObservableStore<TState>
