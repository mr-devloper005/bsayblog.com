import ProfileDetailPage, { generateMetadata as generateProfileMetadata, generateStaticParams as generateProfileStaticParams } from '@/editable/pages/ProfileDetailPage'

export const revalidate = 3
export const generateMetadata = generateProfileMetadata
export const generateStaticParams = generateProfileStaticParams
export default ProfileDetailPage
