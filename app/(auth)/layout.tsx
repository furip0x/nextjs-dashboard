import ThemeToggle from '@/components/ThemeToggle'

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen flex items-center justify-center relative">
      {children}
      <div className="absolute right-10 bottom-10 z-10">
        <ThemeToggle />
      </div>
    </div>
  )
}
