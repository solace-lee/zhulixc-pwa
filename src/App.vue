<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>-->
    <router-view/>
  </div>
</template>

<style lang="stylus">
#app
  font-family "Avenir", Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  // text-align: center
*
  box-sizing: border-box

//注册页-修改checkBox
.newUser
  .cube-checkbox_checked
    >.cube-checkbox-wrap
      >.cube-checkbox-ui
        >i
          color:#00ae87
 .cube-input-field
   color #fff
.icon
  width 1em
  height 1em
  vertical-align -0.15em
  fill currentColor
  overflow: hidden
</style>
