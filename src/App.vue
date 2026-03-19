<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderView from './components/layout/HeaderView.vue'
import Sidebar from './components/layout/Sidebar.vue'
</script>

<template>
  <!-- 整體佈局：Header + Main -->
  <div class="flex flex-col min-h-screen">
    <!-- 上方 Header -->
    <HeaderView />

    <!-- 主要區塊：Sidebar + 右側內容 -->
    <div class="grid grid-cols-[240px_1fr] gap-0">
      <!-- Sidebar -->
      <Sidebar class="md:relative md:h-auto md:pb-2 md:border-b md:border-gray-800" />

      <!-- 右側內容 -->
      <section class="flex-1 p-5 md:p-2 bg-black flex justify-center items-center">
        <RouterView />
      </section>
    </div>
  </div>
</template>
