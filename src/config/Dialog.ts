// 封装一个弹出层框的方法

function Dialog (this: any, content:string, title:string, type:string) {
  if (!type) {
    type = "alert"
  }
  this.$createDialog({
    content: content,
    title: title,
    type: type,
  }).show()
}

export { Dialog }