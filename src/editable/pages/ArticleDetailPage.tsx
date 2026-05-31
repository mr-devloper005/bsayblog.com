import { buildPostMetadata, buildTaskMetadata } from '@/lib/seo'
import { fetchTaskPostBySlug } from '@/lib/task-data'
import { EditableArticleDetailShell } from '@/editable/sections/ArticleSections'

export const revalidate = 3

export async function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = await fetchTaskPostBySlug('article', resolvedParams.slug)
  return post ? await buildPostMetadata('article', post) : await buildTaskMetadata('article')
}

export default async function ArticleDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params
  const post = await fetchTaskPostBySlug('article', resolvedParams.slug)
  return <EditableArticleDetailShell slug={resolvedParams.slug} post={post} />
}
