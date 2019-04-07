import Vue, { VNode } from 'vue'

declare global {
  // 声明全局变量，方法
  var $: any
  var AMap: any

  interface Window {
    webkit: any
    JSON:any
  }
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
