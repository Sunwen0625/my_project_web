<script setup lang="ts">
import ProfileView from '@/components/profile/ProfileView.vue'
import ProfileForm from '@/components/profile/ProfileForm.vue'
import { useProfile } from '@/composables/useProfile'

const props = defineProps<{
  user: {
    name: string
    email: string
    phone: string
    idNumber: string
    address: string
  }
}>()

const {
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
} = useProfile(props.user)
</script>

<template>
  <div class="flex justify-center py-10">
    <div class="w-full max-w-3xl bg-[#2a2a2a] rounded-2xl p-8">
      <ProfileView
        v-if="!isEditing"
        :user="props.user"
        :licenses="licenses"
        :avatar="avatar"
        @edit="toggleEdit"
        @uploadAvatar="handleAvatarUpload"
      />

      <ProfileForm
        v-else
        :form="form"
        :licenses="licenses"
        :newLicense="newLicense"
        @save="saveProfile"
        @cancel="toggleEdit"
        @addLicense="addLicense"
        @removeLicense="removeLicense"
        @update:newLicense="(v) => (newLicense = v)"
      />
    </div>
  </div>
</template>
