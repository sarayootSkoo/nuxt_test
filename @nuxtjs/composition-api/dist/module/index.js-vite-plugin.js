'use strict'

const crypto = require('crypto')
const MagicString = require('magic-string')
const estreeWalker = require('estree-walker')

function _interopDefaultLegacy(e) {
  return e && typeof e === 'object' && 'default' in e ? e : { default: e }
}

const crypto__default = /*#__PURE__*/ _interopDefaultLegacy(crypto)
const MagicString__default = /*#__PURE__*/ _interopDefaultLegacy(MagicString)

function createKey(source, method = 'base64') {
  const hash = crypto__default['default'].createHash('md5')
  hash.update(source)
  return hash.digest(method).toString()
}
function compositionApiPlugin() {
  return {
    name: 'nuxt:composition-api',
    enforce: 'pre',
    transform(code, filename) {
      const keyedFunctions =
        /(useStatic|shallowSsrRef|ssrPromise|ssrRef|reqSsrRef|useAsync)/
      if (!keyedFunctions.test(code)) {
        return {
          code,
          map: null,
        }
      }
      try {
        const { 0: script = code, index: codeIndex = 0 } =
          code.match(/(?<=<script[^>]*>)[\S\s.]*?(?=<\/script>)/) || []
        const ast = this.parse(script)
        const s = new MagicString__default['default'](code)
        estreeWalker.walk(ast, {
          enter(node) {
            var _a, _b
            const { end } = node
            const { callee, arguments: args = [] } = node
            if (
              (callee == null ? void 0 : callee.type) === 'Identifier' ||
              ((_a = callee == null ? void 0 : callee.property) == null
                ? void 0
                : _a.type) === 'Identifier'
            ) {
              let method = 'base64'
              switch (
                callee.name ||
                ((_b = callee.property) == null ? void 0 : _b.name)
              ) {
                case 'useStatic':
                  if (args.length > 2) return
                  if (args.length === 2) {
                    s.prependLeft(codeIndex + end - 1, ', undefined')
                  }
                  method = 'hex'
                  break
                case 'shallowSsrRef':
                case 'ssrPromise':
                case 'ssrRef':
                case 'reqSsrRef':
                case 'useAsync':
                  if (args.length > 1) return
                  break
                default:
                  return
              }
              s.appendLeft(
                codeIndex + end - 1,
                ", '" + createKey(`${filename}-${end}`, method) + "'"
              )
            }
          },
        })
        return {
          code: s.toString(),
          map: s.generateMap({ source: filename }).toString(),
        }
      } catch (e) {}
    },
  }
}

exports.compositionApiPlugin = compositionApiPlugin
