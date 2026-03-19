<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderView from './components/layout/HeaderView.vue'
import Sidebar from './components/layout/Sidebar.vue'
import DevRoleSwitcher from '@/components/DevRoleSwitcher.vue'
const isDev = import.meta.env.DEV
</script>

<template>
  <!-- 整體佈局：Header + Main -->
  <div class="flex flex-col min-h-screen">
    <!-- 上方 Header -->
    <HeaderView />

    <!-- 主要區塊：Sidebar + 右側內容 -->
    <div class="grid grid-cols-[240px_1fr] flex-1">
      <!-- Sidebar -->
      <Sidebar class="h-full" />

      <!-- 右側內容 -->
      <section class="p-5 bg-black flex justify-center items-center overflow-auto">
        <RouterView />
        <!-- 🔹 只在開發環境 -->
        <DevRoleSwitcher v-if="isDev" />
      </section>
    </div>
  </div>
</template>
