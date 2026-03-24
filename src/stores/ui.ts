import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { SnackbarMessage } from 'vuetify/lib/components/VSnackbarQueue/VSnackbarQueue'

export enum Color {
  INFO = 'info',
  SUCCESS = 'success',
  ERROR = 'error'
}

export const useUIStore = defineStore('ui', () => {
  const queue = ref<SnackbarMessage[]>([])
  const isQueueing = ref(false)
  const currentItem = ref<SnackbarMessage | null>()
  
  function queueMessage(color: Color, text: string, timeout: number=2000) {
    queue.value.push({color, text, timeout})

    // if (isQueueing.value) return
    // processQueue()
  }

  // async function processQueue() {
  //   isQueueing.value = true

  //   while(queue.length > 0) {
  //     const next = queue.shift()
  //     if (next) {
  //       await show(next)
  //     }
  //   }

  //   isQueueing.value = false
  // }

  // async function show(queueItem: QueueItem) {
  //   currentItem.value = queueItem
  //   await new Promise(res => setTimeout(res, queueItem.time))

  //   currentItem.value = null
  //   await new Promise(res => setTimeout(res, 300))
  // }

  return({queueMessage, currentItem, queue})
})
