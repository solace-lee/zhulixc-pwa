import Vue, { VNode } from 'vue'

declare global {
  // 声明全局变量，方法
  var $: any
  var AMap: any

  interface Window {
    webkit: any
    JSON:any
  }
  interface Vue {
    $Toast: any
    getRequest: any
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

// 给VUE对象添加自定义方法
declare module 'vue/types/vue' {
  interface Vue {
    Toast: any
    Dialog: any
    getRequest: any
    dialog: any
  }
}
