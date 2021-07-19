interface Keys {
  public: string
  private: string
  chain: string
  address: string
}

interface Ownership {
  type: 'ownership'
  seed: string
  keys: Keys,
  derivationPath: string
}

export interface UrbitWallet {
  meta: {
   generator: {
    name: string
    version: string
   },
   spec: string
   ship: number
   patp: string
   tier: 'galaxy' | 'star' | 'planet'
   passphrase: string | null
  },
  ticket: string
  shards: string[]
  ownership: Ownership
}
