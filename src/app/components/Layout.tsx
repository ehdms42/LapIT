import { Outlet, Link, useLocation } from 'react-router'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

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
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#f5f5f7]">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-black/8">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">

          <Link to="/" className="flex items-center">
            <img src="/lapit-logo.png" alt="LapIT" className="h-10 w-auto object-contain" />
          </Link>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex gap-1">
            {NAV.map(({ path, label, exact }) => {
              const active = exact ? pathname === path : pathname.startsWith(path)
              return (
                <Link key={path} to={path}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    active ? 'text-blue-600 bg-blue-50' : 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </nav>

          {/* 모바일 햄버거 버튼 */}
          <button
            onClick={() => setMenuOpen(o => !o)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-gray-700 hover:bg-gray-100 transition-all"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* 모바일 드롭다운 메뉴 */}
        {menuOpen && (
          <div className="md:hidden border-t border-black/6 bg-white/96 px-4 py-2">
            {NAV.map(({ path, label, exact }) => {
              const active = exact ? pathname === path : pathname.startsWith(path)
              return (
                <Link key={path} to={path}
                  onClick={() => setMenuOpen(false)}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium mb-1 transition-all ${
                    active ? 'text-blue-600 bg-blue-50' : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {label}
                </Link>
              )
            })}
          </div>
        )}
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <Outlet />
      </main>
    </div>
  )
}