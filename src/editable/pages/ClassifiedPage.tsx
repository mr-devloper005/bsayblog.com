import { TaskListPage } from '@/components/tasks/task-list-page'
import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('classified', {
    path: '/classified',
    title: taskPageMetadata.classified.title,
    description: taskPageMetadata.classified.description,
  })

export async function ClassifiedTaskPage({
  searchParams,
  basePath = '/classified',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  return <TaskListPage task="classified" category={resolved.category} page={page} basePath={basePath} />
}

export default ClassifiedTaskPage
