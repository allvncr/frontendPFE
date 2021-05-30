<template>
  <div id="app">
    <transition name="view">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: inter, Helvetica, Arial, sans-serif;
    line-height: 1.5;
}

.view-enter-active, .view-leave-active {
  transition: opacity .5s ease-in-out;
}

.view-enter-active{
  animation-delay: 0.5s;
}


.view-enter, .view-leave-to{
  opacity: 0;
}

.view-enter-to, .view-leave{
  opacity: 1;
}
</style>
