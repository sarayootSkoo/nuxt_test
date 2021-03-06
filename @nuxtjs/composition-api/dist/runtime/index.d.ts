import {
  Ref,
  defineComponent as defineComponent$1,
  SetupContext,
  ComputedRef,
  InjectionKey,
} from '@vue/composition-api'
export {
  App,
  ComponentInstance,
  ComponentInternalInstance,
  ComponentPropsOptions,
  ComponentPublicInstance,
  ComponentRenderProxy,
  ComputedGetter,
  ComputedOptions,
  ComputedRef,
  ComputedSetter,
  Data,
  DeepReadonly,
  EffectScope,
  ExtractDefaultPropTypes,
  ExtractPropTypes,
  FlushMode,
  InjectionKey,
  MethodOptions,
  PropOptions,
  PropType,
  Ref,
  SetupContext,
  SetupFunction,
  ShallowUnwrapRef,
  ToRefs,
  UnwrapNestedRefs,
  UnwrapRef,
  UnwrapRefSimple,
  VueWatcher,
  WatchCallback,
  WatchEffect,
  WatchOptions,
  WatchOptionsBase,
  WatchSource,
  WatchStopHandle,
  WritableComputedOptions,
  WritableComputedRef,
  computed,
  createApp,
  createRef,
  customRef,
  defineAsyncComponent,
  del,
  effectScope,
  getCurrentInstance,
  getCurrentScope,
  h,
  inject,
  isRaw,
  isReactive,
  isReadonly,
  isRef,
  markRaw,
  nextTick,
  onActivated,
  onBeforeMount,
  onBeforeUnmount,
  onBeforeUpdate,
  onDeactivated,
  onErrorCaptured,
  onMounted,
  onScopeDispose,
  onServerPrefetch,
  onUnmounted,
  onUpdated,
  provide,
  proxyRefs,
  reactive,
  readonly,
  ref,
  set,
  shallowReactive,
  shallowReadonly,
  shallowRef,
  toRaw,
  toRef,
  toRefs,
  triggerRef,
  unref,
  useAttrs,
  useCSSModule,
  useCssModule,
  useSlots,
  version,
  warn,
  watch,
  watchEffect,
  watchPostEffect,
  watchSyncEffect,
} from '@vue/composition-api'
import { Context, Plugin, Middleware } from '@nuxt/types'
import * as vue_router from 'vue-router'
import { Route } from 'vue-router'
import * as vue from 'vue'
import { VueConstructor } from 'vue'
import { MetaInfo } from 'vue-meta'
import * as vue_types_vue from 'vue/types/vue'
import { Store } from 'vuex'

/**
 * You can create reactive values that depend on asynchronous calls with `useAsync`.
 * On the server, this helper will inline the result of the async call in your HTML and automatically inject them into your client code. Much like `asyncData`, it _won't_ re-run these async calls client-side.
 *
 * However, if the call hasn't been carried out on SSR (such as if you have navigated to the page after initial load), it returns a `null` ref that is filled with the result of the async call when it resolves.
 *
 * **At the moment, `useAsync` is only suitable for one-offs, unless you provide your own unique key.**
 * @param cb The async function that will populate the ref this function returns.
 * @param key Under the hood, `useAsync` requires a key to ensure that the ref values match between client and server. If you have added `@nuxtjs/composition-api/module` to your `buildModules`, this will be done automagically by an injected Babel plugin. If you need to do things differently, you can specify a key manually or add `@nuxtjs/composition-api/dist/babel-plugin` to your Babel plugins.
 *
 * @example
  ```ts
  import { defineComponent, useAsync, computed } from '@nuxtjs/composition-api'
  import axios from 'axios'

  export default defineComponent({
    setup() {
      const posts = useAsync(() => axios.get('/api/posts'))

      return { posts }
    },
  })
  ```
 */
declare const useAsync: <T>(
  cb: () => T | Promise<T>,
  key?: string | Ref<null> | undefined
) => Ref<T | null>

/**
 * If you want to enable `useMeta`, make sure to include `head: {}` in your component definition.
 * @example
  ```ts
  import { defineComponent } from '@nuxtjs/composition-api'

  export default defineComponent({
    head: {},
    setup() {
      ...
    }
  })
  ```
 */
declare const defineComponent: typeof defineComponent$1

interface ContextCallback {
  (context: Context): void
}
/**
 * @deprecated
 * Recommend using `useContext` instead
 */
declare const withContext: (callback: ContextCallback) => void
interface UseContextReturn
  extends Omit<Context, 'route' | 'query' | 'from' | 'params'> {
  route: Ref<Route>
  query: Ref<Route['query']>
  from: Ref<Context['from']>
  params: Ref<Route['params']>
}
/**
 * `useContext` will return the Nuxt context.
 * @example
  ```ts
  import { defineComponent, ref, useContext } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      const { store } = useContext()
      store.dispatch('myAction')
    },
  })
  ```
 */
declare const useContext: () => UseContextReturn

declare const defineNuxtPlugin: (plugin: Plugin) => Plugin
declare const defineNuxtMiddleware: (middleware: Middleware) => Middleware

declare type ComponentInstance = InstanceType<VueConstructor>

interface Fetch {
  (context: ComponentInstance): void | Promise<void>
}
/**
 * Versions of Nuxt newer than v2.12 support a [custom hook called `fetch`](https://nuxtjs.org/api/pages-fetch/) that allows server-side and client-side asynchronous data-fetching.

 * @param callback The async function you want to run.
 * @example

  ```ts
  import { defineComponent, ref, useFetch } from '@nuxtjs/composition-api'
  import axios from 'axios'

  export default defineComponent({
    setup() {
      const name = ref('')

      const { fetch, fetchState } = useFetch(async () => {
        name.value = await axios.get('https://myapi.com/name')
      })

      // Manually trigger a refetch
      fetch()

      // Access fetch error, pending and timestamp
      fetchState

      return { name }
    },
  })
  ```
 */
declare const useFetch: (callback: Fetch) => {
  fetch: () => void
  fetchState: {
    error: Error | null
    pending: boolean
    timestamp: number
  }
  $fetch: () => void
  $fetchState: {
    error: Error | null
    pending: boolean
    timestamp: number
  }
}

declare type SetupFunction = (
  this: void,
  props: Record<string, unknown>,
  ctx: SetupContext
) => void | Record<any, any>
/**
 * Run a callback function in the global setup function. This should be called from a Nuxt plugin.
 * @param fn The function to run in the setup function. It receives the global props and context.
 * @example
    ```ts
    import { onGlobalSetup } from '@nuxtjs/composition-api'
    
    export default () => {
      onGlobalSetup(() => {
        provide('globalKey', true)
      })
    }
    ```
 */
declare const onGlobalSetup: (fn: SetupFunction) => void
/**
 *
 * @private
 */
declare const setMetaPlugin: Plugin
/**
 * @private
 */
declare const globalPlugin: Plugin

declare type MetaInfoMapper<T> = {
  [P in keyof T]: P extends 'base'
    ? T[P] | undefined
    : T[P] extends () => any
    ? T[P] | undefined
    : T[P] extends Array<any> | Record<string, unknown>
    ? T[P]
    : T[P] | undefined
}
declare type ToRefs<T extends Record<string, any>> = {
  [P in keyof T]: Ref<T[P]>
}
/**
 * `useMeta` lets you interact directly with [`head()` properties](https://nuxtjs.org/api/pages-head/) in `setup`. **Make sure you set `head: {}` in your component options.**
 * @example
    ```ts
    import { defineComponent, useMeta, computed } from '@nuxtjs/composition-api'

    export default defineComponent({
      head: {},
      setup() {
        const { title } = useMeta()
        title.value = 'My page'
      })
    })
    ```
 * @param init Whatever defaults you want to set for `head` properties.
 */
declare const useMeta: <
  T extends MetaInfo,
  MetaRefs extends ToRefs<MetaInfoMapper<Required<MetaInfo>> & T>
>(
  init?: T | (() => T) | undefined
) => NonNullable<MetaRefs>

/**
 * @deprecated
 */
declare const reqRef: <T>(initialValue: T) => Ref<T>
/**
 * @deprecated
 */
declare const reqSsrRef: <T>(
  initialValue: T,
  key?: string | undefined
) => Ref<T>

declare function setSSRContext(app: any): void
/**
 * `ssrRef` will automatically add ref values to `window.__NUXT__` on SSR if they have been changed from their initial value. It can be used outside of components, such as in shared utility functions, and it supports passing a factory function that will generate the initial value of the ref. **At the moment, an `ssrRef` is only suitable for one-offs, unless you provide your own unique key.**
 * @param value This can be an initial value or a factory function that will be executed on server-side to get the initial value.
 * @param key Under the hood, `ssrRef` requires a key to ensure that the ref values match between client and server. If you have added `@nuxtjs/composition-api/module` to your `buildModules`, this will be done automagically by an injected Babel plugin. If you need to do things differently, you can specify a key manually or add `@nuxtjs/composition-api/dist/babel-plugin` to your Babel plugins.
 * @example
  ```ts
  import { ssrRef } from '@nuxtjs/composition-api'

  const val = ssrRef('')

  // When hard-reloaded, `val` will be initialised to 'server set'
  if (process.server) val.value = 'server set'

  // When hard-reloaded, the result of myExpensiveSetterFunction() will
  // be encoded in nuxtState and used as the initial value of this ref.
  // If client-loaded, the setter function will run to come up with initial value.
  const val2 = ssrRef(myExpensiveSetterFunction)
  ```
 */
declare const ssrRef: <T>(
  value: T | (() => T),
  key?: string | undefined
) => Ref<T>
/**
 * This helper creates a [`shallowRef`](https://vue-composition-api-rfc.netlify.app/api.html#shallowref) (a ref that tracks its own .value mutation but doesn't make its value reactive) that is synced between client & server.
 * @param value This can be an initial value or a factory function that will be executed on server-side to get the initial value.
 * @param key Under the hood, `shallowSsrRef` requires a key to ensure that the ref values match between client and server. If you have added `@nuxtjs/composition-api/module` to your `buildModules`, this will be done automagically by an injected Babel plugin. If you need to do things differently, you can specify a key manually or add `@nuxtjs/composition-api/dist/babel-plugin` to your Babel plugins.

 * @example
  ```ts
  import { shallowSsrRef, onMounted } from '@nuxtjs/composition-api'

  const shallow = shallowSsrRef({ v: 'init' })
  if (process.server) shallow.value = { v: 'changed' }

  // On client-side, shallow.value will be { v: changed }
  onMounted(() => {
    // This and other changes outside of setup won't trigger component updates.
    shallow.value.v = 'Hello World'
  })
  ```
 */
declare const shallowSsrRef: <T>(
  value: T | (() => T),
  key?: string | undefined
) => Ref<T>
/**
 * `ssrPromise` runs a promise on the server and serialises the result as a resolved promise for the client. It needs to be run within the `setup()` function but note that it returns a promise which will require special handling. (For example, you cannot just return a promise from setup and use it in the template.)
 * @param value This can be an initial value or a factory function that will be executed on server-side to get the initial value.
 * @param key Under the hood, `ssrPromise` requires a key to ensure that the ref values match between client and server. If you have added `@nuxtjs/composition-api/module` to your `buildModules`, this will be done automagically by an injected Babel plugin. If you need to do things differently, you can specify a key manually or add `@nuxtjs/composition-api/dist/babel-plugin` to your Babel plugins.
 * @example

    ```ts
    import {
      defineComponent,
      onBeforeMount,
      ref,
      ssrPromise,
    } from '@nuxtjs/composition-api'

    export default defineComponent({
      setup() {
        const _promise = ssrPromise(async () => myAsyncFunction())
        const resolvedPromise = ref(null)

        onBeforeMount(async () => {
          resolvedPromise.value = await _promise
        })

        return {
          // On the server, this will be null until the promise resolves.
          // On the client, if server-rendered, this will always be the resolved promise.
          resolvedPromise,
        }
      },
    })
    ```
 */
declare const ssrPromise: <T>(
  value: () => Promise<T>,
  key?: string | undefined
) => Promise<T>

/**
 * You can pre-run expensive functions using `useStatic`.
 *
 * __SSG__
 * If you are generating the whole app (or just prerendering some routes with `nuxt build && nuxt generate --no-build`) the following behaviour will be unlocked:

    1. On generate, the result of a `useStatic` call will be saved to a JSON file and copied into the `/dist` directory.
    2. On hard-reload of a generated page, the JSON will be inlined into the page and cached.
    3. On client navigation to a generated page, this JSON will be fetched - and once fetched it will be cached for subsequent navigations. If for whatever reason this JSON doesn't exist, such as if the page *wasn't* pre-generated, the original factory function will be run on client-side.

  If you are pregenerating some pages in your app note that you may need to increase `generate.interval`. (See [setup instructions](https://composition-api.nuxtjs.org/setup.html).)

  *
  * __SSR__
  * If the route is not pre-generated (including in dev mode), then:

    1. On a hard-reload, the server will run the factory function and inline the result in `nuxtState` - so the client won't rerun the API request. The result will be cached between requests.
    2. On client navigation, the client will run the factory function.

  In both of these cases, the return result of `useStatic` is a `null` ref that is filled with the result of the factory function or JSON fetch when it resolves.

 * @param factory The async function that will populate the ref this function returns. It receives the param and keyBase (see below) as parameters.
 * @param param A an optional param (such as an ID) to distinguish multiple API fetches using the same factory function.
 * @param keyBase A key that should be unique across your project. If not provided, this will be auto-generated by `@nuxtjs/composition-api`.
 * @example
  ```ts
  import { defineComponent, useContext, useStatic, computed } from '@nuxtjs/composition-api'
  import axios from 'axios'

  export default defineComponent({
    setup() {
      const { params } = useContext()
      const id = computed(() => params.value.id)
      const post = useStatic(
        id => axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`),
        id,
        'post'
      )

      return { post }
    },
  })
  ```
 */
declare const useStatic: <T>(
  factory: (param: string, key: string) => Promise<T>,
  param: Ref<string> | undefined,
  keyBase: string
) => Ref<T | null>

/**
 * You might want to create a custom helper to 'convert' a non-Composition API property to a Composition-ready one. `wrapProperty` enables you to do that easily, returning either a computed or a bare property as required.
 * @param property the name of the property you would like to access. For example, `$store` to access `this.$store`.
 * @param makeComputed a boolean indicating whether the helper function should return a computed property or not. Defaults to `true`.
 */
declare const wrapProperty: <
  K extends keyof vue.default,
  T extends boolean = true
>(
  property: K,
  makeComputed?: T | undefined
) => () => T extends true
  ? ComputedRef<
      vue_types_vue.CombinedVueInstance<
        vue.default,
        object,
        object,
        object,
        Record<never, any>
      >[K]
    >
  : vue_types_vue.CombinedVueInstance<
      vue.default,
      object,
      object,
      object,
      Record<never, any>
    >[K]
/**
 * Gain access to the router just like using this.$router in a non-Composition API manner.
 * @example
  ```ts
  import { defineComponent, useRouter } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      const router = useRouter()
      router.push('/')
    }
  })
  ```
 */
declare const useRouter: () => vue_router.default
/**
 * Returns `this.$route`, wrapped in a computed - so accessible from `.value`.
 * @example
  ```ts
  import { computed, defineComponent, useRoute } from '@nuxtjs/composition-api'

  export default defineComponent({
    setup() {
      const route = useRoute()
      const id = computed(() => route.value.params.id)
    }
  })
  ```
 */
declare const useRoute: () => ComputedRef<vue_router.Route>
/**
 * Gain access to the store just like using this.$store in a non-Composition API manner. You can also provide an injection key or custom type to get back a semi-typed store:
 * @example
  ```ts
  import { defineComponent, useStore } from '@nuxtjs/composition-api'

  export interface State {
    count: number
  }

  export const key: InjectionKey<Store<State>> = Symbol()

  export default defineComponent({
    setup() {
      const store = useStore()
      const store = useStore(key)
      const store = useStore<State>()
      // In both of these cases, store.state.count will be typed as a number
    }
  })
  ```
 */
declare const useStore: <S>(key?: InjectionKey<S> | undefined) => Store<S>

export {
  defineComponent,
  defineNuxtMiddleware,
  defineNuxtPlugin,
  globalPlugin,
  onGlobalSetup,
  reqRef,
  reqSsrRef,
  setMetaPlugin,
  setSSRContext,
  shallowSsrRef,
  ssrPromise,
  ssrRef,
  useAsync,
  useContext,
  useFetch,
  useMeta,
  useRoute,
  useRouter,
  useStatic,
  useStore,
  withContext,
  wrapProperty,
}
