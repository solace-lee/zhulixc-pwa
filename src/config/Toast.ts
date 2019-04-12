// 封装一个提示弹框的方法

function Toast (this: any, content:string, type:string, time:number, mask:boolean) {
  if (!type) {
    type = "text"
  }
  this.$createToast({
    txt: content,
    time: time,
    type: type,
    mask: mask
  }).show()
}

export { Toast }
