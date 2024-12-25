<script setup lang="ts">
import type { PersonalInfo } from '../../types'

defineProps<{
  modelValue: PersonalInfo
}>()

const emit = defineEmits(['update:modelValue'])

const updateField = (field: keyof PersonalInfo, value: string) => {
  emit('update:modelValue', {
    ...props.modelValue,
    [field]: value
  })
}
</script>

<template>
  <div class="space-y-4">
    <h2 class="section-title">Personal Information</h2>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <input
        v-model="modelValue.name"
        placeholder="Full Name"
        class="input-field"
      >
      <input
        v-model="modelValue.title"
        placeholder="Professional Title"
        class="input-field"
      >
      <input
        v-model="modelValue.email"
        type="email"
        placeholder="Email Address"
        class="input-field"
      >
      <input
        v-model="modelValue.phone"
        placeholder="Phone Number"
        class="input-field"
      >
      <input
        v-model="modelValue.location"
        placeholder="City, Country"
        class="input-field"
      >
      <input
        v-model="modelValue.linkedin"
        placeholder="LinkedIn Profile URL"
        class="input-field"
      >
      <input
        v-model="modelValue.github"
        placeholder="GitHub Profile URL"
        class="input-field"
      >
      <input
        v-model="modelValue.website"
        placeholder="Personal Website URL"
        class="input-field"
      >
    </div>
    
    <div>
      <label class="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
      <input
        type="file"
        accept="image/*"
        @change="$emit('photo-upload', $event)"
        class="input-field"
      >
    </div>
  </div>
</template>