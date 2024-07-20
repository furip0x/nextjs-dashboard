import BackButton from '@/components/BackButton'
import PostsPagination from '@/components/posts/PostsPagination'
import PostTable from '@/components/posts/PostTable'
import posts from '@/data/posts'
import React from 'react'

const PostsPage = () => {
  return (
    <>
      <BackButton text="Go Back" link="/private/dashboard" />
      <PostTable posts={posts} />
      <PostsPagination />
    </>
  )
}

export default PostsPage
