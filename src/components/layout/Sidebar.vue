<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <aside
    class="sticky top-0 self-start h-screen w-64 flex-shrink-0 overflow-y-auto bg-[#2b2a2a] px-3 py-4 shadow-[inset_-1px_0_0_rgba(255,255,255,0.06)] scrollbar-thin scrollbar-track-[#2a2a2a] scrollbar-thumb-[#444] hover:scrollbar-thumb-[#555]"
  >
    <nav class="flex flex-col gap-1.5 p-0 m-0">
      <RouterLink
        v-for="item in menuItems"
        :key="item.path"
        :to="item.path"
        class="block px-3 py-2.5 rounded-lg text-white text-base no-underline outline-none transition-all duration-200 hover:bg-[#3a3a3a] focus-visible:ring-4 focus-visible:ring-white/10"
        active-class="bg-[#424242] font-semibold shadow-[inset_3px_0_0_0_#969697]"
        exact-active-class="bg-[#4a4a4a] shadow-[inset_3px_0_0_0_#b5b5b5]"
      >
        {{ item.name }}
      </RouterLink>
    </nav>
  </aside>
</template>

<script lang="ts">
// 為了簡潔使用循環渲染，也可手動展開
const menuItems = [
  { name: '首頁', path: '/' },
  { name: '關於我們', path: '/about' },
  { name: '個人資料', path: '/profile' },
  { name: '檢舉違規停車', path: '/report' },
  { name: '檢舉紀錄', path: '/records' },
  { name: '地圖', path: '/map' },
]
</script>

<style scoped>
/* Tailwind 預設不包含捲軸細節控制，保留這部分最為精簡 */
aside::-webkit-scrollbar {
  width: 8px;
}
aside::-webkit-scrollbar-track {
  background: #2a2a2a;
}
aside::-webkit-scrollbar-thumb {
  background: #444;
  border-radius: 8px;
}
aside::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
