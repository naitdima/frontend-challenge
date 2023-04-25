import { ref } from 'vue'
import type { Ref } from 'vue'

export function useWebSockets(url: string, onMessageCB: (data: any) => void) {
  const socket: Ref<null | WebSocket> = ref(null)
  const socketIsConnected: Ref<boolean> = ref(false)

  function init(): void {
    socket.value = new WebSocket(url)
    socket.value.addEventListener('open', onOpen)
    socket.value.addEventListener('message', onMessage)
    socket.value.addEventListener('close', onClose)
    socket.value.addEventListener('error', onError)
  }

  function destroy(): void {
    if (socketIsConnected.value) {
      socket.value?.close()
    }
  }

  function sendMessage(message: any): void {
    if (socket.value?.readyState === WebSocket.OPEN) {
      socket.value.send(JSON.stringify(message))
    } else {
      throw new Error('WebSocket is not connected.')
    }
  }

  function onOpen(): void {
    socketIsConnected.value = true
  }

  function onClose(): void {
    socketIsConnected.value = false
    socket.value = null
  }

  function onError(error: Event): void {
    console.error('WebSocket error:', error)
  }

  function onMessage(event: MessageEvent): void {
    if (!event?.data) {
      return
    }

    onMessageCB(JSON.parse(event.data))
  }

  return {
    init,
    destroy,
    sendMessage
  }
}
