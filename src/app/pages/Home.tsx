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
      { path: '/ionic', label: '퍼즐 실습', desc: '이온 드래그 & 결합' },
    ],
  },
  {
    unit: '02', title: '공유 결합', en: 'Covalent Bonding',
    desc: '비금속 원자들이 전자쌍을 공유하여 형성되는 화학 결합',
    color: '#6600cc', light: '#f0e8fd', border: 'rgba(102,0,204,0.15)',
    steps: [
      { path: '/covalent-concept', label: '개념 학습', desc: '루이스 구조 · 결합 종류' },
      { path: '/covalent', label: '구조 탐색', desc: '보어 모형 시각화' },
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
        style={{ marginBottom: 64 }}
      >
        <p style={{ ...S.label('#0066cc'), marginBottom: 16 }}>중학교 과학 · 화학 결합</p>
        <h1 style={{
          fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800,
          color: '#1d1d1f', lineHeight: 1.08, letterSpacing: '-0.04em',
          marginBottom: 20,
        }}>
          화학 결합을<br />직접 체험하세요.
        </h1>
        <p style={{ fontSize: 17, color: '#6e6e73', lineHeight: 1.65, maxWidth: 480, marginBottom: 32 }}>
          이온 결합과 공유 결합의 원리를 이해하고,
          인터랙티브 실습으로 <br />직접 분자를 만들어보세요.
        </p>
        <Link to="/ionic-concept" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: '#0066cc', color: '#fff', textDecoration: 'none',
          borderRadius: 980, padding: '14px 28px',
          fontSize: 15, fontWeight: 700, letterSpacing: '-0.01em',
          boxShadow: '0 4px 16px rgba(0,102,204,0.3)',
          transition: 'all 0.2s ease',
        }}>
          학습 시작 <ArrowRight style={{ width: 16, height: 16 }} />
        </Link>
      </motion.div>

      {/* 유닛 카드들 */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {UNITS.map((unit, ui) => (
          <motion.div
            key={unit.unit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 + ui * 0.07, ease: [0.4, 0, 0.2, 1] }}
            style={{
              background: '#fff', borderRadius: 20,
              border: '1px solid rgba(0,0,0,0.06)',
              overflow: 'hidden',
              boxShadow: '0 2px 16px rgba(0,0,0,0.06)',
            }}
          >
            <div style={{
              padding: '20px 28px',
              borderBottom: '1px solid rgba(0,0,0,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 10,
                  background: unit.light,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ fontSize: 12, fontWeight: 800, color: unit.color }}>{unit.unit}</span>
                </div>
                <div>
                  <p style={{ fontSize: 10, color: unit.color, fontWeight: 700,
                    letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 2 }}>{unit.en}</p>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: '#1d1d1f',
                    letterSpacing: '-0.02em', margin: 0 }}>{unit.title}</h3>
                </div>
              </div>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${unit.steps.length}, 1fr)`,
            }}>
              {unit.steps.map((step, si) => (
                <Link key={step.path} to={step.path}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '20px 28px', textDecoration: 'none',
                    borderRight: si < unit.steps.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                    transition: 'background 0.15s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#fafafa')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, color: '#1d1d1f',
                      letterSpacing: '-0.015em', marginBottom: 4 }}>{step.label}</p>
                    <p style={{ fontSize: 13, color: '#86868b' }}>{step.desc}</p>
                  </div>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%',
                    background: unit.light,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <ArrowRight style={{ width: 14, height: 14, color: unit.color }} />
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* 권장 학습 순서 */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 0.45, duration: 0.4 }}
        style={{
          marginTop: 32, padding: '20px 28px',
          background: '#1d1d1f', borderRadius: 16,
        }}
      >
        <p style={{ fontSize: 11, fontWeight: 700, color: '#48484a',
          letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 12 }}>권장 학습 순서</p>
        <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 8 }}>
          {[
            { t: '이온 개념', c: '#64a0ff' }, { t: '→', c: '#3a3a3c' },
            { t: '이온 실습', c: '#64a0ff' }, { t: '→', c: '#3a3a3c' },
            { t: '공유 개념', c: '#bf9fff' }, { t: '→', c: '#3a3a3c' },
            { t: '공유 실습', c: '#bf9fff' }, { t: '→', c: '#3a3a3c' },
            { t: '퀴즈', c: '#6ee7b7' },
          ].map((item, i) => (
            <span key={i} style={{ fontSize: 13, fontWeight: item.t === '→' ? 400 : 600, color: item.c }}>{item.t}</span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}