import SocialBookmarkingDetailPage, { generateMetadata as generateSbmMetadata, generateStaticParams as generateSbmStaticParams } from '@/editable/pages/SocialBookmarkingDetailPage'

export const revalidate = 3
export const generateMetadata = generateSbmMetadata
export const generateStaticParams = generateSbmStaticParams
export default SocialBookmarkingDetailPage
