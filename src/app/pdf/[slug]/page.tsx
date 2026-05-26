import PdfDetailPage, { generateMetadata as generatePdfMetadata, generateStaticParams as generatePdfStaticParams } from '@/editable/pages/PdfDetailPage'

export const revalidate = 3
export const generateMetadata = generatePdfMetadata
export const generateStaticParams = generatePdfStaticParams
export default PdfDetailPage
