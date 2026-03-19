<script setup lang="ts">
import { ref, onMounted } from 'vue'
import BaseRecordTable from '@/components/ui/BaseRecordTable.vue'
const data = ref([])
const error = ref<string | null>(null)

const fetchData = async () => {
  try {
    const res = await fetch('/data/reported.json')
    const json = await res.json()
    data.value = Array.isArray(json) ? json : [json]
  } catch (e) {
    error.value = '讀取失敗'
  }
}

onMounted(fetchData)
</script>

<template>
  <div class="p-6">
    <h2 class="text-2xl font-bold text-white mb-4">違規歷史</h2>

    <BaseRecordTable :data="data" :error="error" />
  </div>
</template>
