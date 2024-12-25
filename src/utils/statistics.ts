import { ref } from 'vue'

const API_ENDPOINT = '/api/statistics'

export async function incrementDownloadCount() {
  try {
    const response = await fetch(`${API_ENDPOINT}/increment`, {
      method: 'POST',
    })
    return await response.json()
  } catch (error) {
    console.error('Failed to increment download count:', error)
  }
}

export async function getStatistics() {
  try {
    const response = await fetch(API_ENDPOINT)
    return await response.json()
  } catch (error) {
    console.error('Failed to fetch statistics:', error)
    return { downloads: 0, uniqueUsers: 0 }
  }
}