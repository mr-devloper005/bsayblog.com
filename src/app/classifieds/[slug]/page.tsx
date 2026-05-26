import ClassifiedDetailPage, { generateMetadata as generateClassifiedMetadata, generateStaticParams as generateClassifiedStaticParams } from '@/editable/pages/ClassifiedDetailPage'

export const revalidate = 3
export const generateMetadata = generateClassifiedMetadata
export const generateStaticParams = generateClassifiedStaticParams
export default ClassifiedDetailPage
