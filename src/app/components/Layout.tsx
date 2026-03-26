import { Outlet, Link, useLocation } from 'react-router'

const NAV = [
  { path: '/', label: '홈', exact: true },
  { path: '/ionic-concept', label: '이온 개념' },
  { path: '/ionic-lab', label: '이온 실습' },
  { path: '/covalent-concept', label: '공유 개념' },
  { path: '/covalent-lab', label: '공유 실습' },
  { path: '/quiz', label: '퀴즈' },
]

export default function Layout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/8">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          
          <Link to="/" className="flex items-center">
            <img src="/lapit-logo.svg" alt="LapIT" className="h-7 w-auto" />
          </Link>

          <nav className="flex gap-1">
            {NAV.map(({ path, label, exact }) => {
              const active = exact ? pathname === path : pathname.startsWith(path)
              return (
                <Link
                  key={path}
                  to={path}
                  className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'text-blue-600 bg-blue-50'
                      : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

        </div>
      </header>

      <main className="max-w-6xl mx-auto px-8 py-10">
        <Outlet />
      </main>
    </div>
  )
}