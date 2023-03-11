<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="useModalStore().hideModal()">
      <div :class="divMain" @click.stop>
        <div :class="divHeader">
          {{ useModalStore().modalTitle }}
        </div>
        <p>{{ useModalStore().modalText }}</p>
        <div :class="divButton" @click="useModalStore().hideModal()">
          OK
        </div>
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
const divMain = 'mt-[10%] w-1/3 h-fit border border-black rounded bg-white text-center'
const divHeader = 'py-4 text-3xl font-bold text-[#b91c1c]'
const divButton = 'mx-auto my-4 p-2 w-16 border border-black rounded bg-[#0275ff] hover:bg-sky-400' +
                ' text-white hover:text-gray-700 cursor-pointer'
</script>

<style scoped>
.modal-overlay {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: center;
    background-color: #000000da;
    z-index: 2;
}

.modal-fade-enter,
.modal-fade-leave-to {
    opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity 0.5s ease;
}
</style>
