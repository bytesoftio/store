import { StoreCallback, StoreDiffer, StoreMapper } from "./types"

export class StoreListener<S extends object, SM extends object> {
  callback: StoreCallback<SM>
  mapper: StoreMapper<S, SM>
  differ: StoreDiffer<SM>
  oldState: SM

  constructor(
    callback: StoreCallback<SM>,
    mapper: StoreMapper<S, SM>,
    differ: StoreDiffer<SM>,
  ) {
    this.callback = callback
    this.mapper = mapper
    this.differ = differ
    this.oldState = undefined as any
  }

  notify(newState: S) {
    const mappedNewState = this.mapper(newState)
    const isDifferent = this.differ(this.oldState, mappedNewState)

    if (isDifferent) {
      this.oldState = mappedNewState
      this.callback(mappedNewState)
    }
  }
}