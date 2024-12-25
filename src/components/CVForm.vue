<script setup lang="ts">
import { ref } from 'vue'
import type { CVData, Experience, Education } from '../types'

const props = defineProps<{
  modelValue: CVData
}>()

const emit = defineEmits(['update:modelValue'])

const addExperience = () => {
  const newExp: Experience = {
    id: Date.now().toString(),
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: ''
  }
  emit('update:modelValue', {
    ...props.modelValue,
    experience: [...props.modelValue.experience, newExp]
  })
}

const addEducation = () => {
  const newEdu: Education = {
    id: Date.now().toString(),
    institution: '',
    degree: '',
    field: '',
    startDate: '',
    endDate: ''
  }
  emit('update:modelValue', {
    ...props.modelValue,
    education: [...props.modelValue.education, newEdu]
  })
}

const handlePhotoUpload = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files[0]) {
    const reader = new FileReader()
    reader.onload = (e) => {
      emit('update:modelValue', {
        ...props.modelValue,
        personalInfo: {
          ...props.modelValue.personalInfo,
          photo: e.target?.result as string
        }
      })
    }
    reader.readAsDataURL(input.files[0])
  }
}

const addSkill = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    const input = event.target as HTMLInputElement
    const skill = input.value.trim()
    if (skill && !props.modelValue.skills.includes(skill)) {
      emit('update:modelValue', {
        ...props.modelValue,
        skills: [...props.modelValue.skills, skill]
      })
      input.value = ''
    }
  }
}
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow-sm">
    <h2 class="section-title">Personal Information</h2>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Photo</label>
        <input
          type="file"
          accept="image/*"
          @change="handlePhotoUpload"
          class="input-field"
        >
      </div>
      <input
        v-model="modelValue.personalInfo.name"
        placeholder="Full Name"
        class="input-field"
      >
      <input
        v-model="modelValue.personalInfo.title"
        placeholder="Professional Title"
        class="input-field"
      >
      <input
        v-model="modelValue.personalInfo.email"
        placeholder="Email"
        type="email"
        class="input-field"
      >
      <input
        v-model="modelValue.personalInfo.phone"
        placeholder="Phone"
        class="input-field"
      >
      <input
        v-model="modelValue.personalInfo.location"
        placeholder="Location"
        class="input-field"
      >
    </div>

    <h2 class="section-title mt-8">Professional Summary</h2>
    <textarea
      v-model="modelValue.summary"
      placeholder="Write a brief professional summary..."
      rows="4"
      class="input-field"
    ></textarea>

    <h2 class="section-title mt-8">Experience</h2>
    <div class="space-y-4">
      <div v-for="(exp, index) in modelValue.experience" :key="exp.id" class="p-4 border rounded-lg">
        <input
          v-model="modelValue.experience[index].company"
          placeholder="Company"
          class="input-field mb-2"
        >
        <input
          v-model="modelValue.experience[index].position"
          placeholder="Position"
          class="input-field mb-2"
        >
        <div class="grid grid-cols-2 gap-2 mb-2">
          <input
            v-model="modelValue.experience[index].startDate"
            type="date"
            class="input-field"
          >
          <input
            v-model="modelValue.experience[index].endDate"
            type="date"
            class="input-field"
          >
        </div>
        <textarea
          v-model="modelValue.experience[index].description"
          placeholder="Description"
          rows="3"
          class="input-field"
        ></textarea>
      </div>
      <button @click="addExperience" class="btn w-full">Add Experience</button>
    </div>

    <h2 class="section-title mt-8">Education</h2>
    <div class="space-y-4">
      <div v-for="(edu, index) in modelValue.education" :key="edu.id" class="p-4 border rounded-lg">
        <input
          v-model="modelValue.education[index].institution"
          placeholder="Institution"
          class="input-field mb-2"
        >
        <input
          v-model="modelValue.education[index].degree"
          placeholder="Degree"
          class="input-field mb-2"
        >
        <input
          v-model="modelValue.education[index].field"
          placeholder="Field of Study"
          class="input-field mb-2"
        >
        <div class="grid grid-cols-2 gap-2">
          <input
            v-model="modelValue.education[index].startDate"
            type="date"
            class="input-field"
          >
          <input
            v-model="modelValue.education[index].endDate"
            type="date"
            class="input-field"
          >
        </div>
      </div>
      <button @click="addEducation" class="btn w-full">Add Education</button>
    </div>

    <h2 class="section-title mt-8">Skills</h2>
    <div class="space-y-4">
      <input
        placeholder="Type a skill and press Enter"
        @keydown.enter="addSkill"
        class="input-field"
      >
      <div class="flex flex-wrap gap-2">
        <span
          v-for="skill in modelValue.skills"
          :key="skill"
          class="px-3 py-1 bg-gray-100 rounded-full text-sm"
        >
          {{ skill }}
        </span>
      </div>
    </div>
  </div>
</template>