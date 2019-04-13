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
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
}
* {
  box-sizing: border-box;
}
//注册页-修改checkBox
.newUser{
  .cube-checkbox_checked{
    >.cube-checkbox-wrap{
      >.cube-checkbox-ui {
        >i{
          color:#00ae87
        }
      }
    }
  }
}
  // .form{
  //   .cube-input-field{
  //       background: none;
  //       input {
  //       width: 80%;
  //       height: 95%;
  //       vertical-align: middle;
  //       border: none;
  //       font-size: 1.6rem;
  //       color: #fff;
  //       opacity: 0.5;
  //       background: none;
  //       border:none;
  //       outline: none; // 去除选中状态边框
  //       /* width: 4rem; */
  //     }
  //   }
  // }
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
