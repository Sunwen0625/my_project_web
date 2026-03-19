import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export type Role = 'guest' | 'user' | 'admin'

interface User {
  name: string
  avatar?: string
}

export const useAuthStore = defineStore('auth', () => {
  // 🔹 state
  const role = ref<Role>('guest')
  const user = ref<User | null>(null)

  // 🔹 getters（可讀性提升）
  const isGuest = computed(() => role.value === 'guest')
  const isUser = computed(() => role.value === 'user')
  const isAdmin = computed(() => role.value === 'admin')

  // 🔹 actions
  function loginAsUser(userData: User) {
    role.value = 'user'
    user.value = userData
  }

  function loginAsAdmin(userData: User) {
    role.value = 'admin'
    user.value = userData
  }

  function logout() {
    role.value = 'guest'
    user.value = null
  }

  return {
    role,
    user,
    isGuest,
    isUser,
    isAdmin,
    loginAsUser,
    loginAsAdmin,
    logout,
  }
})
