<script setup lang="ts">
import type { Experience } from '../../types'
import { ref } from 'vue'

const props = defineProps<{
  modelValue: Experience[]
}>()

const emit = defineEmits(['update:modelValue'])

const addExperience = () => {
  const newExp: Experience = {
    id: Date.now().toString(),
    company: '',
    position: '',
    startDate: '',
    endDate: '',
    description: '',
    achievements: []
  }
  emit('update:modelValue', [...props.modelValue, newExp])
}

const removeExperience = (id: string) => {
  emit('update:modelValue', props.modelValue.filter(exp => exp.id !== id))
}

const addAchievement = (expIndex: number) => {
  const exp = props.modelValue[expIndex]
  if (!exp.achievements) exp.achievements = []
  exp.achievements.push('')
  emit('update:modelValue', [...props.modelValue])
}
</script>

<template>
  <div class="space-y-6">
    <h2 class="section-title">Professional Experience</h2>
    
    <div v-for="(exp, index) in modelValue" :key="exp.id" class="p-4 border rounded-lg space-y-4">
      <div class="flex justify-between">
        <h3 class="font-semibold">Experience {{ index + 1 }}</h3>
        <button @click="removeExperience(exp.id)" class="text-red-600 hover:text-red-800">Remove</button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          v-model="exp.company"
          placeholder="Company Name"
          class="input-field"
        >
        <input
          v-model="exp.position"
          placeholder="Job Title"
          class="input-field"
        >
        <input
          v-model="exp.startDate"
          type="date"
          class="input-field"
        >
        <input
          v-model="exp.endDate"
          type="date"
          class="input-field"
        >
      </div>
      
      <textarea
        v-model="exp.description"
        placeholder="Job Description"
        rows="3"
        class="input-field"
      ></textarea>
      
      <div class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">Key Achievements</label>
        <div v-for="(achievement, achIndex) in exp.achievements" :key="achIndex" class="flex gap-2">
          <input
            v-model="exp.achievements[achIndex]"
            placeholder="Achievement or responsibility"
            class="input-field flex-1"
          >
          <button @click="exp.achievements.splice(achIndex, 1)" class="text-red-600 hover:text-red-800">×</button>
        </div>
        <button @click="addAchievement(index)" class="text-sm text-blue-600 hover:text-blue-800">
          + Add Achievement
        </button>
      </div>
    </div>
    
    <button @click="addExperience" class="btn w-full">Add Experience</button>
  </div>
</template>