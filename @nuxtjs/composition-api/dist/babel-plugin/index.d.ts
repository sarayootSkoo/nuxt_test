import * as types from '@babel/types'
import { Visitor } from '@babel/traverse'

interface Babel {
  types: typeof types
  loadOptions: () => Record<string, any>
  getEnv: () => string
}
declare function ssrRefPlugin({ loadOptions, getEnv, types: t }: Babel): {
  visitor: Visitor<{}>
}

export { ssrRefPlugin as default }
