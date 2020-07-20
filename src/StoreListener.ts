import { StoreCallback, StoreDiffer, StoreMapper } from "./types"

export class StoreListener<TState extends object, TStateMapped extends object> {
  callback: StoreCallback<TStateMapped>
  mapper: StoreMapper<TState, TStateMapped>
  differ: StoreDiffer<TStateMapped>
  oldState: TStateMapped

  constructor(
    callback: StoreCallback<TStateMapped>,
    mapper: StoreMapper<TState, TStateMapped>,
    differ: StoreDiffer<TStateMapped>,
  ) {
    this.callback = callback
    this.mapper = mapper
    this.differ = differ
    this.oldState = undefined as any
  }

  notify(newState: TState) {
    const mappedNewState = this.mapper(newState)
    const isDifferent = this.differ(this.oldState, mappedNewState)

    if (isDifferent) {
      this.oldState = mappedNewState
      this.callback(mappedNewState)
    }
  }
}
