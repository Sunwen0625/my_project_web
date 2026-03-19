<template>
  <div class="flex justify-center py-10">
    <div class="w-full max-w-3xl bg-[#2a2a2a] rounded-2xl shadow-lg p-8 text-gray-200">
      <!-- 標題 -->
      <h1 class="text-2xl font-bold text-white mb-6">使用者資料</h1>

      <!-- 上半部：頭像 + 基本資料 -->
      <div class="flex flex-col md:flex-row gap-8">
        <!-- 頭像 -->
        <div class="flex flex-col items-center gap-3">
          <div
            class="w-24 h-24 rounded-full overflow-hidden border-2 border-white bg-gray-500 flex items-center justify-center"
          >
            <img src="@/assets/user.png" alt="User Avatar" class="w-full h-full object-cover" />
          </div>

          <button class="text-sm text-blue-400 hover:underline">上傳頭像</button>
        </div>

        <!-- 基本資訊 -->
        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p class="text-gray-400 text-sm">使用者名稱</p>
            <p class="text-white font-semibold">John Doe</p>
          </div>

          <div>
            <p class="text-gray-400 text-sm">電子郵件</p>
            <p class="text-white font-semibold">john.doe@example.com</p>
          </div>

          <div>
            <p class="text-gray-400 text-sm">電話號碼</p>
            <p class="text-white font-semibold">123-456-7890</p>
          </div>

          <div>
            <p class="text-gray-400 text-sm">身分證號碼</p>
            <p class="text-white font-semibold">F123456789</p>
          </div>

          <div class="md:col-span-2">
            <p class="text-gray-400 text-sm">地址</p>
            <p class="text-white font-semibold">123 Main St, Anytown, USA</p>
          </div>
        </div>
      </div>

      <!-- 分隔線 -->
      <div class="my-6 border-t border-gray-600"></div>

      <!-- 車牌管理 -->
      <div>
        <h2 class="text-lg font-semibold text-white mb-3">車牌管理（選填）</h2>

        <div class="space-y-3">
          <!-- 單一車牌 -->
          <div class="flex gap-3">
            <input
              type="text"
              placeholder="請輸入車牌號碼"
              class="flex-1 px-3 py-2 rounded-lg border border-gray-600 bg-[#1f1f1f] text-white outline-none focus:border-blue-500"
            />
            <button
              class="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-400 transition text-white font-semibold"
            >
              儲存
            </button>
          </div>

          <!-- 新增 -->
          <button
            class="px-4 py-2 rounded-lg bg-green-600 hover:bg-green-500 transition text-white font-semibold"
          >
            ＋ 增加車牌
          </button>
        </div>
      </div>

      <!-- 分隔線 -->
      <div class="my-6 border-t border-gray-600"></div>

      <!-- 操作按鈕 -->
      <div class="flex justify-end gap-4">
        <button
          class="px-5 py-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 transition text-white font-semibold"
        >
          編輯資料
        </button>

        <button
          class="px-5 py-2 rounded-xl bg-red-500 hover:bg-red-400 transition text-white font-semibold"
        >
          登出
        </button>
      </div>
    </div>
  </div>
</template>
