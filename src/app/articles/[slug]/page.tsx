import ArticleDetailPage, {
  generateMetadata as generateArticleMetadata,
  generateStaticParams as generateArticleStaticParams,
} from '@/editable/pages/ArticleDetailPage'

export const revalidate = 3
export const generateMetadata = generateArticleMetadata
export const generateStaticParams = generateArticleStaticParams
export default ArticleDetailPage
