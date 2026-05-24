import { buildTaskMetadata } from '@/lib/seo'
import { fetchPaginatedTaskPosts } from '@/lib/task-data'
import { taskPageMetadata } from '@/config/site.content'
import { normalizeCategory } from '@/lib/categories'
import { EditableArticleArchive } from '@/editable/sections/ArticleSections'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('article', {
    path: '/article',
    title: taskPageMetadata.article.title,
    description: taskPageMetadata.article.description,
  })

export async function ArticleTaskPage({
  searchParams,
  basePath = '/article',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  const category = resolved.category ? normalizeCategory(resolved.category) : 'all'
  const { posts, pagination } = await fetchPaginatedTaskPosts('article', { page, limit: 18, category })
  return <EditableArticleArchive posts={posts} pagination={pagination} category={category} basePath={basePath} />
}

export default ArticleTaskPage
