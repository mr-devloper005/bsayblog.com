import { TaskListPage } from '@/components/tasks/task-list-page'
import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('sbm', {
    path: '/sbm',
    title: taskPageMetadata.sbm.title,
    description: taskPageMetadata.sbm.description,
  })

export async function SocialBookmarkingTaskPage({
  searchParams,
  basePath = '/sbm',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  return <TaskListPage task="sbm" category={resolved.category} page={page} basePath={basePath} />
}

export default SocialBookmarkingTaskPage
