import { jsPDF } from 'jspdf'
import type { CVData } from '../types'

export const generatePDF = async (cvData: CVData, elementRef: HTMLElement) => {
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  })

  // Set up fonts
  pdf.addFont('SpaceGrotesk-Regular.ttf', 'SpaceGrotesk', 'normal')
  pdf.addFont('SpaceGrotesk-Bold.ttf', 'SpaceGrotesk', 'bold')
  
  // Calculate dimensions
  const pageWidth = pdf.internal.pageSize.getWidth()
  const pageHeight = pdf.internal.pageSize.getHeight()
  const margin = 15

  // Add content with proper scaling
  const scale = (pageWidth - 2 * margin) / elementRef.offsetWidth

  return pdf
}