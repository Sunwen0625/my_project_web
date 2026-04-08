<script setup lang="ts">
defineProps<{
  form: {
    name: string
    email: string
    phone: string
    address: string
  }
  licenses: string[]
  newLicense: string
}>()

defineEmits(['save', 'cancel', 'addLicense', 'removeLicense', 'update:newLicense'])
</script>

<template>
  <div>
    <h1 class="text-2xl font-bold text-white mb-6">編輯資料</h1>

    <div class="grid grid-cols-2 gap-4">
      <div>
        <p class="text-gray-400 text-sm">姓名</p>
        <input
          v-model="form.name"
          class="w-full px-3 py-2 rounded-lg bg-[#1f1f1f] border border-gray-600 text-white focus:border-blue-500"
        />
      </div>

      <div>
        <p class="text-gray-400 text-sm">Email</p>
        <input
          v-model="form.email"
          class="w-full px-3 py-2 rounded-lg bg-[#1f1f1f] border border-gray-600 text-white focus:border-blue-500"
        />
      </div>

      <div>
        <p class="text-gray-400 text-sm">電話</p>
        <input
          v-model="form.phone"
          class="w-full px-3 py-2 rounded-lg bg-[#1f1f1f] border border-gray-600 text-white focus:border-blue-500"
        />
      </div>

      <div>
        <p class="text-gray-400 text-sm">地址</p>
        <input
          v-model="form.address"
          class="w-full px-3 py-2 rounded-lg bg-[#1f1f1f] border border-gray-600 text-white focus:border-blue-500"
        />
      </div>
    </div>

    <!-- 車牌管理 -->
    <div>
      <p class="text-gray-400 text-sm mb-2 mt-4">車牌管理（選填）</p>
      <!-- 車牌列表垂直 -->
      <div class="flex flex-col gap-2">
        <div
          v-for="(plate, i) in licenses"
          :key="i"
          class="flex items-center justify-between bg-[#1f1f1f] px-3 py-2 rounded-lg border border-gray-600"
        >
          <span>{{ plate }}</span>
          <div class="mt-4"></div>
          <button
            @click="$emit('removeLicense', i)"
            class="text-red-500 hover:text-red-400 font-semibold"
          >
            刪除
          </button>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <!-- 新增車牌輸入 -->
        <div class="flex gap-2">
          <input
            class="w-full px-3 py-2 rounded-lg mt-4 bg-[#1f1f1f] border border-gray-600 text-white focus:border-blue-500"
            type="text"
            :value="newLicense"
            @input="$emit('update:newLicense', ($event.target as HTMLInputElement).value)"
          />
          <button
            @click="$emit('addLicense')"
            class="text-2xl px-4 py-2 rounded-lg mt-4 bg-green-600 hover:bg-green-500 transition text-white font-semibold"
          >
            ＋
          </button>
        </div>
      </div>
    </div>

    <!-- 儲存按鈕 -->
    <div class="flex justify-end mt-6">
      <button
        @click="$emit('save')"
        class="px-5 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 transition text-white font-semibold"
      >
        儲存
      </button>
    </div>
  </div>
</template>
