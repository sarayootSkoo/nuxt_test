'use strict'

const crypto = require('crypto')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e }
}

const crypto__default = /*#__PURE__*/ _interopDefaultLegacy(crypto)

function ssrRefPlugin({ loadOptions, getEnv, types: t }) {
  const env = getEnv()
  const cwd = env === 'test' ? '' : loadOptions().cwd
  let varName = ''
  const visitor = {
    ...(env !== 'production'
      ? {
          VariableDeclarator(path) {
            varName = 'name' in path.node.id ? `${path.node.id.name}-` : ''
          },
        }
      : {}),
    CallExpression(path) {
      if (!('name' in path.node.callee)) return
      let method = 'base64'
      switch (path.node.callee.name) {
        case 'useStatic':
          if (path.node.arguments.length > 2) return
          if (path.node.arguments.length === 2) path.node.arguments.push()
          method = 'hex'
          break
        case 'shallowSsrRef':
        case 'ssrPromise':
        case 'ssrRef':
        case 'reqSsrRef':
        case 'useAsync':
          if (path.node.arguments.length > 1) return
          break
        default:
          return
      }
      const hash = crypto__default['default'].createHash('md5')
      hash.update(`${cwd}-${path.node.callee.start}`)
      const digest = hash.digest(method).toString()
      path.node.arguments.push(t.stringLiteral(`${varName}${digest}`))
    },
  }
  return { visitor }
}

module.exports = ssrRefPlugin
