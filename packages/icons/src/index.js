import IconExample from './IconExample.vue'

export { IconExample }
export default {
  install(app) {
    app.component('IconExample', IconExample)
  }
}
