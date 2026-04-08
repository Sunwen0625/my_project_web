<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import UserProfile from '@/components/profile/UserProfile.vue'
import AdminProfile from '@/components/ui/AdminProfile.vue'

const auth = useAuthStore()
</script>
<template>
  <!-- 一般使用者 -->
  <UserProfile
    v-if="auth.isUser"
    :user="{
      name: auth.user?.name || '',
      email: 'test@mail.com',
      phone: '0912345678',
      idNumber: 'A123456789',
      address: '台北市大安區復興南路一段390號2樓',
    }"
  />

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
