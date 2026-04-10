import { ref, watch, computed, type Ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import defaultAvatar from '@/assets/user.png'

interface UserProfile {
  name: string
  email: string
  phone: string
  idNumber: string
  address: string
  avatar?: string
}

export function useProfile(user: Ref<UserProfile>) {
  const auth = useAuthStore()
  const isEditing = ref(false)

  const form = ref<UserProfile>({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    address: '',
    avatar: '',
  })

  const licenses = ref<string[]>([])
  const newLicense = ref('')

  // 保留原始資料，取消編輯時還原
  const originalUser = ref<UserProfile>({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    address: '',
    avatar: '',
  })

  // 頭像改成獨立 ref，避免 computed 與 API 資料衝突
  const avatar = ref(defaultAvatar)

  watch(
    user,
    (newUser) => {
      if (!newUser) return

      const clonedUser = { ...newUser }

      form.value = clonedUser
      originalUser.value = clonedUser
      avatar.value = newUser.avatar || defaultAvatar
    },
    { immediate: true, deep: true },
  )

  const handleAvatarUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (!file) return

    const reader = new FileReader()

    reader.onload = () => {
      const imageUrl = reader.result as string
      avatar.value = imageUrl
      auth.updateAvatar(imageUrl)
    }

    reader.readAsDataURL(file)
  }

  const toggleEdit = () => {
    if (isEditing.value) {
      // 離開編輯模式 → 還原
      form.value = { ...originalUser.value }
      avatar.value = originalUser.value.avatar || defaultAvatar
    }

    isEditing.value = !isEditing.value
  }

  const saveProfile = () => {
    console.log('save', form.value)

    // 儲存後更新原始資料
    originalUser.value = { ...form.value }
    isEditing.value = false
  }

  const addLicense = () => {
    if (!newLicense.value.trim()) return
    licenses.value.push(newLicense.value.trim())
    newLicense.value = ''
  }

  const removeLicense = (index: number) => {
    licenses.value.splice(index, 1)
  }

  return {
    isEditing,
    form,
    licenses,
    newLicense,
    avatar,
    handleAvatarUpload,
    toggleEdit,
    saveProfile,
    addLicense,
    removeLicense,
  }
}
