import BackButton from '@/components/BackButton'
import PostEditForm from '@/components/posts/PostEditForm'
import posts from '@/data/posts'

interface PostEditPageProps {
  params: {
    id: string
  }
}

const PostEdit = ({ params: { id } }: PostEditPageProps) => {
  const post = posts.find((post) => post.id === id)

  return (
    <>
      <BackButton text="Back To Posts" link="/private/dashboard/posts" />
      <h3 className="text-2xl mb-4">Edit Post</h3>
      <PostEditForm post={post} />
    </>
  )
}

export default PostEdit
