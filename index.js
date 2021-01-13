class Reactive {
  // Dependencies
  deps = new Map()

  constructor(options) {
    this.origin = options.data()

    const self = this

    // Destination
    this.$data = new Proxy(this.origin, {
      get(target, name) {
        // if (name in target)
        if (Reflect.has(target, name)) {
          self.track(target, name)
          // return target[name]
          return Reflect.get(target, name)
        }
        console.warn('Property', name, 'doesn\'t exist')
        return ''
      },
      set(target, name, value) {
        Reflect.set(target, name, value)
        self.trigger(name)
      }
    })
  }

  track(target, name) {
    if (!this.deps.has(name)) {
      const effect = () => {
        document.querySelectorAll(`*[p-text=${name}]`).forEach(el => {
          this.pText(el, target, name)
        })
      }
      this.deps.set(name, effect)
    }
  }

  trigger(name) {
    const effect = this.deps.get(name)
    effect()
  }

  mount() {
    document.querySelectorAll('*[p-text]').forEach(el => {
      this.pText(el, this.$data, el.getAttribute('p-text'))
    })

    document.querySelectorAll('*[p-model]').forEach(el => {
      const name = el.getAttribute('p-model')
      this.pModel(el, this.$data, name)

      el.addEventListener('input', () => {
        // this.$data[name] = el.value
        Reflect.set(this.$data, name, el.value)
      })
    })
  }

  pText(el, target, name) {
    // el.innerText = target[name]
    el.innerText = Reflect.get(target, name)
  }

  pModel(el, target, name) {
    // el.value = target[name]
    el.value = Reflect.get(target, name)
  }
}

const Global = {
  createApp(options) {
    return new Reactive(options)
  }
}
