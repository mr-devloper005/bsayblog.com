import { TaskListPage } from '@/components/tasks/task-list-page'
import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('image', {
    path: '/image',
    title: taskPageMetadata.image.title,
    description: taskPageMetadata.image.description,
  })

export async function ImagesTaskPage({
  searchParams,
  basePath = '/image',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  return <TaskListPage task="image" category={resolved.category} page={page} basePath={basePath} />
}

export default ImagesTaskPage
