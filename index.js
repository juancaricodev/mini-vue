class Reactive {
  constructor(options) {
    this.origin = options.data()
  }

  mount() {
    document.querySelectorAll('*[p-text]').forEach(el => {
      this.pText(el, this.origin, el.getAttribute('p-text'))
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