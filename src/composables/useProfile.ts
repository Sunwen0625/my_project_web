import { ref, reactive, computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import defaultAvatar from '@/assets/user.png'

export function useProfile(initialUser: any) {
  const isEditing = ref(false)

  const form = reactive({
    name: initialUser.name,
    email: initialUser.email,
    phone: initialUser.phone,
    address: initialUser.address,
  })

  const licenses = ref<string[]>([])
  const newLicense = ref('')

  // ===== 新增：頭像 =====
  const auth = useAuthStore()
  const avatar = computed({
    get: () => auth.user?.avatar || defaultAvatar,
    set: (value: string) => {
      auth.updateAvatar(value)
    },
  })

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
    isEditing.value = !isEditing.value

    if (!isEditing.value) {
      form.name = initialUser.name
      form.email = initialUser.email
      form.phone = initialUser.phone
      form.address = initialUser.address
    }
  }

  const saveProfile = () => {
    console.log('save', form)
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
