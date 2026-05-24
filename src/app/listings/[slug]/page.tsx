import ListingDetailPage, {
  generateMetadata as generateListingMetadata,
  generateStaticParams as generateListingStaticParams,
} from '@/editable/pages/ListingDetailPage'

export const revalidate = 3
export const generateMetadata = generateListingMetadata
export const generateStaticParams = generateListingStaticParams
export default ListingDetailPage
