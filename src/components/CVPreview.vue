<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { CVData } from '../types'
import { jsPDF } from 'jspdf'
import html2canvas from 'html2canvas'

const props = defineProps<{
  data: CVData
}>()

const previewRef = ref<HTMLElement | null>(null)

const generatePDF = async () => {
  if (!previewRef.value) return

  const canvas = await html2canvas(previewRef.value, {
    scale: 2,
    useCORS: true,
    logging: false
  })

  const imgData = canvas.toDataURL('image/jpeg', 1.0)
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'px',
    format: 'a4',
  })

  pdf.addFont('SpaceGrotesk-Regular.ttf', 'SpaceGrotesk', 'normal')
  pdf.addFont('SpaceGrotesk-Bold.ttf', 'SpaceGrotesk', 'bold')
  pdf.setFont('SpaceGrotesk')

  pdf.addImage(imgData, 'JPEG', 0, 0, pdf.internal.pageSize.width, pdf.internal.pageSize.height)
  pdf.save('cvite-resume.pdf')
}
</script>

<template>
  <div class="bg-white p-6 rounded-xl shadow-sm">
    <button @click="generatePDF" class="btn mb-6">Download PDF</button>
    
    <div ref="previewRef" class="bg-white shadow-sm max-w-[800px] mx-auto">
      <!-- Header with thick gray background -->
      <div class="bg-gray-600 p-8 text-white">
        <div class="grid grid-cols-[auto_1fr] gap-8 items-start">
          <img
            v-if="data.personalInfo.photo"
            :src="data.personalInfo.photo"
            class="w-32 h-32 rounded-full object-cover border-4 border-white"
            alt="Profile photo"
          >
          <div>
            <h1 class="text-3xl font-bold font-space-grotesk tracking-tight">{{ data.personalInfo.name }}</h1>
            <p class="text-xl text-gray-200 mt-1 font-space-grotesk">{{ data.personalInfo.title }}</p>
            <div class="mt-4 grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-gray-200">
              <a :href="'mailto:' + data.personalInfo.email" class="hover:text-white">
                {{ data.personalInfo.email }}
              </a>
              <p>{{ data.personalInfo.phone }}</p>
              <p>{{ data.personalInfo.location }}</p>
              <a v-if="data.personalInfo.linkedin" :href="data.personalInfo.linkedin" target="_blank" class="hover:text-white">
                LinkedIn Profile
              </a>
              <a v-if="data.personalInfo.github" :href="data.personalInfo.github" target="_blank" class="hover:text-white">
                GitHub Profile
              </a>
              <a v-if="data.personalInfo.website" :href="data.personalInfo.website" target="_blank" class="hover:text-white">
                Personal Website
              </a>
            </div>
          </div>
        </div>
      </div>

      <!-- Content section -->
      <div class="p-8 space-y-6">
        <div v-if="data.summary" class="mb-8">
          <h2 class="text-lg font-semibold mb-3 font-space-grotesk text-gray-800 border-b border-gray-200 pb-2">
            SUMMARY
          </h2>
          <p class="text-sm text-gray-600 leading-relaxed">{{ data.summary }}</p>
        </div>

        <div v-if="data.experience.length">
          <h2 class="text-lg font-semibold mb-4 font-space-grotesk text-gray-800 border-b border-gray-200 pb-2">
            EXPERIENCE
          </h2>
          <div v-for="exp in data.experience" :key="exp.id" class="mb-6">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-base text-gray-800">{{ exp.position }}</h3>
                <p class="text-sm text-gray-600">{{ exp.company }}</p>
              </div>
              <div class="text-sm text-gray-500 whitespace-nowrap ml-4">
                {{ exp.startDate }} - {{ exp.endDate || 'Present' }}
              </div>
            </div>
            <p class="mt-2 text-sm text-gray-600 leading-relaxed">{{ exp.description }}</p>
          </div>
        </div>

        <div v-if="data.education.length">
          <h2 class="text-lg font-semibold mb-4 font-space-grotesk text-gray-800 border-b border-gray-200 pb-2">
            EDUCATION
          </h2>
          <div v-for="edu in data.education" :key="edu.id" class="mb-4">
            <div class="flex justify-between items-start">
              <div>
                <h3 class="font-semibold text-base text-gray-800">{{ edu.institution }}</h3>
                <p class="text-sm text-gray-600">{{ edu.degree }} in {{ edu.field }}</p>
              </div>
              <div class="text-sm text-gray-500 whitespace-nowrap ml-4">
                {{ edu.startDate }} - {{ edu.endDate || 'Present' }}
              </div>
            </div>
          </div>
        </div>

        <div v-if="data.skills.length">
          <h2 class="text-lg font-semibold mb-3 font-space-grotesk text-gray-800 border-b border-gray-200 pb-2">
            SKILLS
          </h2>
          <div class="flex flex-wrap gap-2">
            <span
              v-for="skill in data.skills"
              :key="skill"
              class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
            >
              {{ skill }}
            </span>
          </div>
        </div>

        <div v-if="data.projects?.length">
          <h2 class="text-lg font-semibold mb-4 font-space-grotesk text-gray-800 border-b border-gray-200 pb-2">
            PROJECTS
          </h2>
          <div v-for="project in data.projects" :key="project.id" class="mb-4">
            <h3 class="font-semibold text-base text-gray-800">{{ project.name }}</h3>
            <p class="text-sm text-gray-600 mt-1">{{ project.description }}</p>
            <a v-if="project.link" :href="project.link" target="_blank" class="text-sm text-blue-600 hover:underline mt-1 block">
              Project Link
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>