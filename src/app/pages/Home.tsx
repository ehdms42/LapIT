import { Link } from 'react-router'
import { motion } from 'motion/react'
import { ArrowRight } from 'lucide-react'

const S = {
  label: (color: string) => ({
    fontSize: 11, fontWeight: 700, color, letterSpacing: '0.06em',
    textTransform: 'uppercase' as const,
  }),
}

const UNITS = [
  {
    unit: '01', title: '이온 결합', en: 'Ionic Bonding',
    desc: '금속과 비금속이 전자를 주고받아 형성되는 화학 결합',
    color: '#0066cc', light: '#e8f0fd', border: 'rgba(0,102,204,0.15)',
    steps: [
      { path: '/ionic-concept', label: '개념 학습', desc: '원리 · 전하 균형 · 특성' },
      { path: '/ionic-lab', label: '퍼즐 실습', desc: '이온 드래그 & 결합' },
    ],
  },
  {
    unit: '02', title: '공유 결합', en: 'Covalent Bonding',
    desc: '비금속 원자들이 전자쌍을 공유하여 형성되는 화학 결합',
    color: '#6600cc', light: '#f0e8fd', border: 'rgba(102,0,204,0.15)',
    steps: [
      { path: '/covalent-concept', label: '개념 학습', desc: '루이스 구조 · 결합 종류' },
      { path: '/covalent-lab', label: '구조 탐색', desc: '보어 모형 시각화' },
    ],
  },
  {
    unit: '03', title: '문제 풀이', en: 'Quiz',
    desc: '학습한 개념을 6문제로 확인하고 즉각적인 피드백을 받으세요',
    color: '#00875a', light: '#e6f6f0', border: 'rgba(0,135,90,0.15)',
    steps: [
      { path: '/quiz', label: '퀴즈 시작', desc: '6문제 · 선택형 · 해설 제공' },
    ],
  },
]

export default function Home() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {/* 히어로 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        style={{ marginBottom: 48 }}
      >
        <p style={{ ...S.label('#0066cc'), marginBottom: 14 }}>중학교 과학 · 화학 결합</p>
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 800,
          color: '#1d1d1f', lineHeight: 1.08, letterSpacing: '-0.04em',
          marginBottom: 16,
        }}>
          화학 결합을<br />직접 체험하세요.
        </h1>
        <p style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: '#6e6e73', lineHeight: 1.65, maxWidth: 480, marginBottom: 28 }}>
          이온 결합과 공유 결합의 원리를 이해하고,
          인터랙티브 실습으로 직접 분자를 만들어보세요.
        </p>
        <Link to="/ionic-concept" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#0066cc', color: '#fff', textDecoration: 'none',
          borderRadius: 980, padding: '12px 24px',
          fontSize: 14, fontWeight: 700, letterSpacing: '-0.01em',
          boxShadow: '0 4px 16px rgba(0,102,204,0.3)',
        }}>
          학습 시작 <ArrowRight style={{ width: 16, height: 16 }} />
        </Link>
      </motion.div>

      {/* 유닛 카드들 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {UNITS.map((unit, ui) => (
          <motion.div
            key={unit.unit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 + ui * 0.07, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: '#fff', borderRadius: 16,
              border: '1px solid rgba(0,0,0,0.06)',
              overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            }}
          >
            {/* 유닛 헤더 */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                background: unit.light, flexShrink: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontSize: 12, fontWeight: 800, color: unit.color }}>{unit.unit}</span>
              </div>
              <div>
                <p style={{ fontSize: 10, color: unit.color, fontWeight: 700,
                  letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>{unit.en}</p>
                <h3 style={{ fontSize: 16, fontWeight: 700, color: '#1d1d1f',
                  letterSpacing: '-0.02em', margin: 0 }}>{unit.title}</h3>
              </div>
            </div>

            {/* 스텝들 — 태블릿에서는 세로로 */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${unit.steps.length}, 1fr)`,
            }}
              className={unit.steps.length === 2 ? 'grid-cols-1 sm:grid-cols-2' : ''}
            >
              {unit.steps.map((step, si) => (
                <Link key={step.path} to={step.path}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '16px 20px', textDecoration: 'none',
                    borderRight: si < unit.steps.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                    borderTop: 'none',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, color: '#1d1d1f',
                      letterSpacing: '-0.015em', marginBottom: 3 }}>{step.label}</p>
                    <p style={{ fontSize: 12, color: '#86868b' }}>{step.desc}</p>
                  </div>
                  <div style={{
                    width: 26, height: 26, borderRadius: '50%',
                    background: unit.light, flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <ArrowRight style={{ width: 13, height: 13, color: unit.color }} />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}