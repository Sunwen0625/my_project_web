import { ref, watch, type Ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import defaultAvatar from '@/assets/user.png'
import { updateUserByEmail } from '@/api/user'

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

  // 保留原始資料，取消編輯時還原
  const originalUser = ref<UserProfile>({
    name: '',
    email: '',
    phone: '',
    idNumber: '',
    address: '',
    avatar: '',
  })

  const licenses = ref<string[]>([])
  const newLicense = ref('')

  // 頭像改成獨立 ref，避免 computed 與 API 資料衝突
  const avatar = ref(defaultAvatar)

  watch(
    user,
    (newUser) => {
      if (!newUser) return

      const clonedUser: UserProfile = {
        ...newUser,
        avatar: newUser.avatar || '',
      }

      form.value = clonedUser
      originalUser.value = clonedUser
      avatar.value = newUser.avatar || defaultAvatar
    },
    { immediate: true, deep: true },
  )

  /**
   * 处理头像上传的函数
   * @param {Event} event - 触发文件上传的事件对象
   */
  const handleAvatarUpload = (event: Event) => {
    // 从事件目标中获取上传的文件
    const file = (event.target as HTMLInputElement).files?.[0]
    // 如果没有文件，则直接返回
    if (!file) return

    // 创建一个FileReader实例用于读取文件
    const reader = new FileReader()

    // 设置文件读取完成后的回调函数
    reader.onload = () => {
      // 获取读取结果（图片的Data URL）
      const imageUrl = reader.result as string
      // 更新头像的值
      avatar.value = imageUrl
      // 调用认证模块的updateAvatar方法更新头像
      auth.updateAvatar(imageUrl)
    }

    // 以Data URL格式读取文件
    reader.readAsDataURL(file)
  }

  /**
   * 切换编辑模式函数
   * 用于在编辑模式和查看模式之间切换，并在退出编辑模式时恢复原始数据
   */
  const toggleEdit = () => {
    if (isEditing.value) {
      // 離開編輯模式 → 還原
      // 当退出编辑模式时，将表单数据恢复为原始用户数据
      form.value = { ...originalUser.value }
      // 将头像恢复为原始用户头像或默认头像
      avatar.value = originalUser.value.avatar || defaultAvatar
    }

    // 切换编辑状态，如果正在编辑则退出，如果未编辑则进入
    isEditing.value = !isEditing.value
  }

  /**
   * 保存用户个人资料信息
   * 该函数异步处理用户资料的更新操作，包括基本信息和头像
   * 更新成功后会重置表单状态和编辑状态
   */
  const saveProfile = async () => {
    try {
      // 调用更新用户信息的API，传入用户邮箱和要更新的信息
      const res = await updateUserByEmail(user.value.email, {
        name: form.value.name, // 用户姓名
        email: form.value.email, // 用户邮箱
        phone_number: form.value.phone, // 用户电话号码
        address: form.value.address, // 用户地址
        idNumber: form.value.idNumber, // 用户身份证号
        avatar: form.value.avatar, // 用户头像URL
      })

      // 创建更新后的用户信息对象，确保头像有默认值
      const updatedUser: UserProfile = {
        ...res.user, // 保留所有返回的用户信息
        avatar: res.user.avatar || '', // 如果没有头像则使用空字符串
      }

      // 更新表单数据为最新的用户信息
      form.value = updatedUser
      // 保存原始用户信息用于后续可能的取消操作
      originalUser.value = { ...updatedUser }
      // 更新头像状态，如果没有则使用默认头像
      avatar.value = updatedUser.avatar || defaultAvatar

      // 退出编辑模式
      isEditing.value = false
    } catch (error) {
      // 捕获并处理更新过程中可能出现的错误
      console.error('更新失敗', error)
    }
  }

  /**
   * 添加许可证的函数
   * 将输入的新许可证添加到许可证列表中，并清空输入框
   */
  const addLicense = () => {
    const license = newLicense.value.trim() // 获取输入的许可证值并去除前后空格
    if (!license) return // 如果许可证为空，则直接返回，不执行后续操作

    licenses.value.push(license) // 将有效的许可证添加到许可证列表中
    newLicense.value = '' // 清空输入框的值
  }

  /**
   * 根据索引删除许可证数组中的元素
   * @param index - 要删除的元素在数组中的位置索引
   */
  const removeLicense = (index: number) => {
    licenses.value.splice(index, 1) // 使用splice方法从数组中移除指定索引的元素
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
