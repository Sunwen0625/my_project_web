<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'

type CaseItem = {
  經緯度: { lat: number; lon: number }
  車牌: string
  照片: string
  時間: string // ISO
  完整路名: string
}

// 每頁 10 筆
const PAGE_SIZE = 10
const currentPage = ref(1)
const rawCases = ref<CaseItem[]>([])
const errorMsg = ref<string | null>(null)

const formatTime = (iso: string) => {
  try {
    const d = new Date(iso)
    return new Intl.DateTimeFormat('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    }).format(d)
  } catch {
    return iso
  }
}

const fetchCases = async () => {
  try {
    // 放在 public/case.json => 產出後可用 /case.json 直接取
    const res = await fetch('/data/cases.json', { cache: 'no-store' })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const data = await res.json()

    // 支援「單筆物件」或「多筆陣列」
    const arr = Array.isArray(data) ? data : [data]

    // 基本驗證與清洗（避免欄位缺漏）
    rawCases.value = arr.filter(Boolean).map((item: any) => ({
      經緯度: item?.經緯度 ?? { lat: null, lon: null },
      車牌: item?.車牌 ?? '-',
      照片: item?.照片 ?? '',
      時間: item?.時間 ?? '',
      完整路名: item?.完整路名 ?? '-',
    }))
  } catch (err: any) {
    errorMsg.value =
      '讀取 case.json 失敗。請確認檔案路徑與 JSON 格式是否正確（若是多筆請放成陣列）。' +
      (err?.message ? `（${err.message}）` : '')
  }
}

onMounted(fetchCases)

// 總頁數
const totalPages = computed(() => Math.max(1, Math.ceil(rawCases.value.length / PAGE_SIZE)))

// 分頁後的資料
const paginated = computed(() => {
  const start = (currentPage.value - 1) * PAGE_SIZE
  return rawCases.value.slice(start, start + PAGE_SIZE)
})

const goToPage = (p: number) => {
  if (p >= 1 && p <= totalPages.value) currentPage.value = p
}

const gmapUrl = (lat?: number, lon?: number) => {
  if (lat == null || lon == null) return null
  return `https://www.google.com/maps?q=${lat},${lon}`
}
</script>

<template>
  <div class="p-6 space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-2xl font-bold">案件列表</h2>
      <span class="text-sm text-gray-500">共 {{ rawCases.length }} 筆（每頁 10 筆）</span>
    </div>

    <div v-if="errorMsg" class="p-3 rounded bg-red-50 text-red-700">
      {{ errorMsg }}
    </div>

    <div v-else>
      <div class="overflow-x-auto border border-gray-200 rounded-lg">
        <table class="min-w-full">
          <thead class="bg-gray-800 text-white">
            <tr>
              <th class="px-4 py-2 text-left whitespace-nowrap">車牌</th>
              <th class="px-4 py-2 text-left whitespace-nowrap">時間</th>
              <th class="px-4 py-2 text-left whitespace-nowrap">完整路名</th>
              <th class="px-4 py-2 text-left whitespace-nowrap">經緯度</th>
              <th class="px-4 py-2 text-left whitespace-nowrap">照片</th>
              <th class="px-4 py-2 text-left whitespace-nowrap">操作</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, idx) in paginated" :key="idx" class="border-t hover:bg-gray-700">
              <td class="px-4 py-2">{{ item.車牌 }}</td>
              <td class="px-4 py-2">{{ formatTime(item.時間) }}</td>
              <td class="px-4 py-2">{{ item.完整路名 }}</td>
              <td class="px-4 py-2">
                <div v-if="item.經緯度?.lat != null && item.經緯度?.lon != null">
                  {{ item.經緯度.lat }}, {{ item.經緯度.lon }}
                </div>
                <div v-else class="text-gray-400">—</div>
              </td>
              <td class="px-4 py-2">
                <a
                  v-if="item.照片"
                  :href="item.照片"
                  target="_blank"
                  rel="noopener"
                  class="inline-block"
                  title="點我開新視窗查看大圖"
                >
                  <img
                    :src="item.照片"
                    alt="照片"
                    class="w-16 h-16 object-cover rounded"
                    @error="($event.target as HTMLImageElement).style.display = 'none'"
                  />
                </a>
                <span v-else class="text-gray-400">無</span>
              </td>
              <td class="px-4 py-2">
                <a
                  v-if="gmapUrl(item.經緯度?.lat, item.經緯度?.lon)"
                  :href="gmapUrl(item.經緯度.lat, item.經緯度.lon)!"
                  target="_blank"
                  rel="noopener"
                  class="px-3 py-1 border rounded hover:bg-gray-100 inline-flex items-center"
                >
                  在地圖開啟
                </a>
                <span v-else class="text-gray-400">—</span>
              </td>
            </tr>

            <tr v-if="paginated.length === 0">
              <td colspan="6" class="px-4 py-6 text-center text-gray-500">目前沒有資料</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- 分頁控制 -->
      <div class="flex items-center justify-center gap-2 mt-4">
        <button
          @click="goToPage(1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          ‹‹
        </button>
        <button
          @click="goToPage(currentPage - 1)"
          :disabled="currentPage === 1"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          上一頁
        </button>

        <span class="px-3 py-1"> 第 {{ currentPage }} / {{ totalPages }} 頁 </span>

        <button
          @click="goToPage(currentPage + 1)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          下一頁
        </button>
        <button
          @click="goToPage(totalPages)"
          :disabled="currentPage === totalPages"
          class="px-3 py-1 border rounded disabled:opacity-50"
        >
          ››
        </button>
      </div>
    </div>
  </div>
</template>
