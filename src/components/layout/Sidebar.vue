<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
    <aside class="sidebar">
        <nav class="menu">
          <RouterLink to="/" class="menu-item">首頁</RouterLink>
          <RouterLink to="/about" class="menu-item">關於我們</RouterLink>
          <RouterLink to="/profile" class="menu-item">個人資料</RouterLink>
          <RouterLink to="/report" class="menu-item">檢舉違規停車</RouterLink>
          <RouterLink to="/records" class="menu-item">檢舉紀錄</RouterLink>
          <RouterLink to="/map" class="menu-item">地圖</RouterLink>
        </nav>
      </aside>
</template>

<style scoped>
    /* 側邊欄樣式（沿用你的深色） */
    .sidebar {
    background: #2b2a2a;
    border-right: none;
    box-shadow: inset -1px 0 0 rgba(255, 255, 255, 0.06);
    padding: 16px 12px;
    position: sticky;
    top: 0;
    align-self: start;
    height: calc(100vh - 0px);
    overflow: auto;
    }

    /* 自訂捲軸（深色 Sidebar 比較協調） */
    .sidebar::-webkit-scrollbar {
    width: 8px;
    }
    .sidebar::-webkit-scrollbar-track {
    background: #2a2a2a;
    }
    .sidebar::-webkit-scrollbar-thumb {
    background: #444;
    border-radius: 8px;
    }
    .sidebar::-webkit-scrollbar-thumb:hover {
    background: #555;
    }

    /* 導覽選單 */
    .menu {
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin: 0;
    padding: 0;
    }

    /* 單一選單項目（保留你的白字） */
    .menu-item {
    display: block;
    padding: 10px 12px;
    border-radius: 8px;
    text-decoration: none;
    color: #ffffff;
    font-size: 16px;
    transition: background 0.2s ease, color 0.2s ease, transform 0.05s ease;
    outline: none; /* 讓 focus-visible 生效更好看 */
    }

    /* 滑過效果（比 #969697 更適合深底的微亮灰） */
    .menu-item:hover {
    background: #3a3a3a;
    }

    /* 鍵盤可及性：聚焦時的外框（不影響滑鼠點擊） */
    .menu-item:focus-visible {
    box-shadow: 0 0 0 3px rgba(255,255,255,0.18);
    }

    /* 目前所在頁面（Vue Router 會自動加上此類名） */
    .menu-item.router-link-active {
    background: #424242;       /* 比 hover 再明顯一點 */
    color: #ffffff;
    font-weight: 600;
    /* 左側色條作為重點（可當品牌色替換） */
    box-shadow: inset 3px 0 0 0 #969697;
    }

    /* 完全精準匹配（通常是首頁 /exact match）可略微再強化 */
    .menu-item.router-link-exact-active {
    background: #4a4a4a;
    box-shadow: inset 3px 0 0 0 #b5b5b5;
    }
</style>
