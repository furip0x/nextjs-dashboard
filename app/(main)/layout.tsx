import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col flex-shrink-0 min-h-screen">
      <Navbar />
      <div className="flex flex-1">
        <div className="relative flex-none hidden md:block bg-secondary">
          <div className="sticky top-0 left-0">
            <Sidebar />
          </div>
        </div>
        <div className="flex-1 p-5 overflow-y-auto">{children}</div>
      </div>
    </div>
  )
}
