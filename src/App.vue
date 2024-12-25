<script setup lang="ts">
import { ref } from 'vue'
import CVForm from './components/CVForm.vue'
import CVPreview from './components/CVPreview.vue'
import { type CVData } from './types'

const cvData = ref<CVData>({
  personalInfo: {
    name: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    photo: null
  },
  summary: '',
  experience: [],
  education: [],
  skills: []
})
</script>

<template>
  <main class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <header class="text-center mb-12">
        <h1 class="text-4xl font-bold font-space-grotesk">CVite</h1>
        <p class="text-gray-600 mt-2 font-space-grotesk">Create your professional CV in minutes</p>
      </header>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CVForm v-model="cvData" />
        <CVPreview :data="cvData" />
      </div>
    </div>
  </main>
</template>