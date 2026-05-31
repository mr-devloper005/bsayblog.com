import { TaskListPage } from '@/components/tasks/task-list-page'
import { buildTaskMetadata } from '@/lib/seo'
import { taskPageMetadata } from '@/config/site.content'

export const revalidate = 3

export const generateMetadata = () =>
  buildTaskMetadata('profile', {
    path: '/profile',
    title: taskPageMetadata.profile.title,
    description: taskPageMetadata.profile.description,
  })

export async function ProfileTaskPage({
  searchParams,
  basePath = '/profile',
}: {
  searchParams?: Promise<{ category?: string; page?: string }>
  basePath?: string
}) {
  const resolved = (await searchParams) || {}
  const page = Math.max(1, Math.floor(Number(resolved.page) || 1))
  return <TaskListPage task="profile" category={resolved.category} page={page} basePath={basePath} />
}

export default ProfileTaskPage
