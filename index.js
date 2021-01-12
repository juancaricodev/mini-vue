class Reactive {
  constructor(options) {
    this.origin = options.data()

    // Destination
    this.$data = new Proxy(this.origin, {
      get(target, name) {
        if (name in target) {
          return target[name]
        }
        console.warn('Property', name, 'doesn\'t exist')
        return ''
      }
    })
  }

  mount() {
    document.querySelectorAll('*[p-text]').forEach(el => {
      this.pText(el, this.$data, el.getAttribute('p-text'))
    })
  }

  pText(el, target, name) {
    el.innerText = target[name]
  }

  pModel() {}
}

const Global = {
  createApp(options) {
    return new Reactive(options)
  }
}
