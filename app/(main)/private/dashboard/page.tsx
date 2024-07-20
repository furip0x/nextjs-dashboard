import AnalyticsChart from '@/components/dashboard/AnalyticsChart'
import DashboardCard from '@/components/dashboard/DashboardCard'
import PostTable from '@/components/posts/PostTable'
import data from '@/data/analytics'
import posts from '@/data/posts'
import { Folder, MessageCircle, Newspaper, User } from 'lucide-react'
import {} from 'next/navigation'

const Dashboard = async () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 mb-5 w-full">
        <DashboardCard title="Posts" count={100} icon={Newspaper} />
        <DashboardCard title="Categories" count={12} icon={Folder} />
        <DashboardCard title="Users" count={750} icon={User} />
        <DashboardCard title="Comments" count={1200} icon={MessageCircle} />
      </div>
      <AnalyticsChart chartData={data} />
      <PostTable title="Latest Posts" posts={posts} limit={5} />
    </>
  )
}

export default Dashboard
