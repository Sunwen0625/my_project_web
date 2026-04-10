<script setup lang="ts">
import { watch, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import UserProfilePage from '@/components/profile/UserProfile.vue'
import AdminProfile from '@/components/ui/AdminProfile.vue'
import { getUserByEmail, type UserProfile } from '@/api/user'

const auth = useAuthStore()
const licenses = ref<string[]>([])

const user = ref<UserProfile>({
  name: '',
  email: '',
  phone: '',
  idNumber: '',
  address: '',
  avatar: '',
})

async function fetchUser() {
  try {
    const data = await getUserByEmail('123@example.com')
    console.log('API 回傳:', data)
    user.value = data
  } catch (error) {
    console.error('載入使用者失敗', error)
  }
}

watch(
  () => auth.isUser,
  (isUser) => {
    if (isUser) {
      fetchUser()
    }
  },
  { immediate: true },
)
</script>
<template>
  <!-- 一般使用者 -->
  <UserProfilePage v-if="auth.isUser" :user="user" :licenses="licenses" :avatar="user.avatar" />

  <!-- 管理員 -->
  <AdminProfile
    v-else-if="auth.isAdmin"
    :user="{
      name: auth.user?.name || '',
      adminId: 'ADM-001',
    }"
  />

  <!-- 訪客 -->
  <div v-else class="text-gray-400">請先登入</div>
</template>
