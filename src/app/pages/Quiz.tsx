import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react'

const card: React.CSSProperties = {
  background: '#fff', borderRadius: 16, border: '1px solid #e5e8eb',
  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
}

const Qs = [
  { id: 1, q: '이온 결합에 대한 설명으로 옳은 것은?',
    opts: ['전자를 공유하여 형성된다', '양이온과 음이온 사이의 정전기적 인력으로 형성된다', '금속 원자들 사이에서만 형성된다', '공유 결합보다 항상 약하다'],
    ans: 1, exp: '이온 결합은 전자를 잃은 양이온과 전자를 얻은 음이온 사이의 정전기적 인력(쿨롱 힘)으로 형성됩니다.', cat: '이온 결합' },
  { id: 2, q: 'NaCl(염화나트륨)을 만들기 위해 필요한 이온의 비율은?',
    opts: ['Na⁺ 1개, Cl⁻ 2개', 'Na⁺ 2개, Cl⁻ 1개', 'Na⁺ 1개, Cl⁻ 1개', 'Na⁺ 2개, Cl⁻ 2개'],
    ans: 2, exp: 'Na⁺의 전하는 +1이고 Cl⁻의 전하는 -1이므로, 1:1 비율로 결합하여 전기적으로 중성인 화합물을 만듭니다.', cat: '이온 결합' },
  { id: 3, q: 'MgO(산화마그네슘)을 형성하는 이온의 조합은?',
    opts: ['Mg⁺와 O⁻', 'Mg²⁺와 O²⁻', 'Mg³⁺와 O³⁻', 'Mg⁺와 O²⁻'],
    ans: 1, exp: '마그네슘은 2개의 전자를 잃어 Mg²⁺가 되고, 산소는 2개의 전자를 얻어 O²⁻가 됩니다.', cat: '이온 결합' },
  { id: 4, q: '공유 결합에 대한 설명으로 옳은 것은?',
    opts: ['이온 사이의 정전기적 인력으로 형성된다', '전자를 완전히 주고받아 형성된다', '원자들이 전자쌍을 공유하여 형성된다', '금속 원자들 사이에서만 형성된다'],
    ans: 2, exp: '공유 결합은 두 원자가 전자쌍을 공유함으로써 형성되는 화학 결합입니다.', cat: '공유 결합' },
  { id: 5, q: '물(H₂O) 분자에서 산소 원자는 몇 개의 수소 원자와 결합하는가?',
    opts: ['1개', '2개', '3개', '4개'],
    ans: 1, exp: '물 분자는 1개의 산소 원자가 2개의 수소 원자와 공유 결합을 형성하여 만들어집니다.', cat: '공유 결합' },
  { id: 6, q: '이중 결합을 형성하는 분자는?',
    opts: ['H₂', 'O₂', 'CH₄', 'H₂O'],
    ans: 1, exp: 'O₂(산소 분자)는 두 개의 산소 원자가 2쌍의 전자를 공유하는 이중 결합을 형성합니다.', cat: '공유 결합' },
]

const LABELS = ['①', '②', '③', '④']

export default function Quiz() {
  const [cur, setCur] = useState(0)
  const [sel, setSel] = useState<number | null>(null)
  const [shown, setShown] = useState(false)
  const [score, setScore] = useState(0)
  const [answersCorrect, setAnswersCorrect] = useState<boolean[]>(new Array(Qs.length).fill(false))
  const [done, setDone] = useState(false)
  const q = Qs[cur]

  const submit = () => {
    if (sel === null) return
    setShown(true)
    const isCorrect = sel === q.ans
    setAnswersCorrect(prev => {
      const updated = [...prev]
      updated[cur] = isCorrect
      return updated
    })
    if (isCorrect) setScore(s => s + 1)
  }

  const next = () => {
    if (cur < Qs.length - 1) { setCur(c => c + 1); setSel(null); setShown(false) }
    else setDone(true)
  }

  const reset = () => { setCur(0); setSel(null); setShown(false); setScore(0); setAnswersCorrect(new Array(Qs.length).fill(false)); setDone(false) }

  if (done) {
    const pct = Math.round((score / Qs.length) * 100)
    const grade = pct >= 80
      ? { label: '우수', color: '#166534', bg: '#f0fdf4', border: '#bbf7d0' }
      : pct >= 60
        ? { label: '보통', color: '#92400e', bg: '#fffbeb', border: '#fde68a' }
        : { label: '미흡', color: '#991b1b', bg: '#fff5f5', border: '#fecaca' }

    return (
      <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }}
        style={{ maxWidth: 480, margin: '0 auto' }}>
        <div style={{ ...card, overflow: 'hidden' }}>
          <div style={{ height: 4, background: grade.color === '#166534' ? '#22c55e' : grade.color === '#92400e' ? '#f59e0b' : '#ef4444' }} />
          <div style={{ padding: 'clamp(24px, 5vw, 36px) clamp(20px, 5vw, 32px)', textAlign: 'center' }}>
            <p style={{ fontSize: 12, color: '#8b95a1', marginBottom: 4 }}>퀴즈 완료</p>
            <h2 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 800, color: '#191f28', marginBottom: 20 }}>결과 확인</h2>
            <div style={{ padding: '20px', borderRadius: 16, marginBottom: 18,
              background: grade.bg, border: `2px solid ${grade.border}` }}>
              <p style={{ fontSize: 'clamp(36px, 8vw, 48px)', fontWeight: 900, color: grade.color, lineHeight: 1 }}>
                {pct}<span style={{ fontSize: 'clamp(18px, 4vw, 24px)' }}>점</span>
              </p>
              <p style={{ fontSize: 13, color: '#6b7685', marginTop: 8 }}>
                {Qs.length}문제 중 {score}문제 정답 · 등급: <strong style={{ color: grade.color }}>{grade.label}</strong>
              </p>
            </div>
            <div style={{ display: 'flex', gap: 6, justifyContent: 'center', marginBottom: 20, flexWrap: 'wrap' }}>
              {Qs.map((_, i) => (
                <div key={i} style={{ width: 30, height: 30, borderRadius: 8, display: 'flex',
                  alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700,
                  background: answersCorrect[i] ? '#f0fdf4' : '#fff5f5',
                  color: answersCorrect[i] ? '#16a34a' : '#dc2626',
                  border: `1.5px solid ${answersCorrect[i] ? '#bbf7d0' : '#fecaca'}` }}
                  role="img"
                  aria-label={answersCorrect[i] ? `Question ${i + 1} correct` : `Question ${i + 1} incorrect`}>
                  {answersCorrect[i] ? '✓' : '✕'}
                </div>
              ))}
            </div>
            {pct < 80 && (
              <p style={{ fontSize: 12, color: '#6b7685', background: '#f7f8fa',
                borderRadius: 10, padding: '10px 14px', marginBottom: 18 }}>
                이온 결합과 공유 결합 개념 페이지를 다시 복습해보세요.
              </p>
            )}
            <button onClick={reset} style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#3182f6', color: '#fff', border: 'none', cursor: 'pointer',
              borderRadius: 12, padding: '12px 24px', fontSize: 14, fontWeight: 700, width: '100%', justifyContent: 'center',
            }}>
              <RotateCcw style={{ width: 15, height: 15 }} /> 다시 풀기
            </button>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}>
      <div>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#8b95a1', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 4 }}>UNIT 03 — 퀴즈</p>
        <h1 style={{ fontSize: 'clamp(18px, 4vw, 24px)', fontWeight: 800, color: '#191f28' }}>문제 풀이</h1>
      </div>

      {/* 진도 바 */}
      <div style={{ ...card, padding: '12px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#191f28' }}>문제 {cur + 1} / {Qs.length}</span>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#3182f6' }}>정답 {score}개</span>
        </div>
        <div style={{ background: '#f2f4f6', borderRadius: 100, height: 6, overflow: 'hidden' }}>
          <motion.div animate={{ width: Qs.length === 0 ? '0%' : `${Math.min(Math.max(((cur + 1) / Qs.length) * 100, 0), 100)}%` }} transition={{ duration: 0.3 }}
            style={{ height: '100%', background: '#3182f6', borderRadius: 100 }} />
        </div>
        <div style={{ display: 'flex', gap: 4, marginTop: 8 }}>
          {Qs.map((_, i) => (
            <div key={i} style={{ flex: 1, height: 4, borderRadius: 100,
              background: i < cur ? '#3182f6' : i === cur ? '#93c5fd' : '#e5e8eb',
              transition: 'background 0.2s' }} />
          ))}
        </div>
      </div>

      {/* 문제 카드 */}
      <AnimatePresence mode="wait">
        <motion.div key={cur} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.2 }}
          style={{ ...card, overflow: 'hidden' }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid #f2f4f6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10, flexWrap: 'wrap' }}>
              <span style={{ fontSize: 10, fontWeight: 700, padding: '2px 10px', borderRadius: 100,
                color: q.cat === '이온 결합' ? '#1d4ed8' : '#7248d6',
                background: q.cat === '이온 결합' ? '#eff6ff' : '#f5f0ff' }}>{q.cat}</span>
              <span style={{ fontSize: 11, color: '#8b95a1' }}>문제 {cur + 1}</span>
            </div>
            <p style={{ fontSize: 'clamp(13px, 2.5vw, 15px)', fontWeight: 700, color: '#191f28', lineHeight: 1.6 }}>{q.q}</p>
          </div>

          <div style={{ padding: '14px 18px', display: 'flex', flexDirection: 'column', gap: 8 }}>
            {q.opts.map((opt, i) => {
              const isSel = sel === i
              const isCorr = i === q.ans
              let bg = '#fafbfc', border = '#e5e8eb', color = '#374151'
              if (shown) {
                if (isCorr) { bg = '#f0fdf4'; border = '#86efac'; color = '#166534' }
                else if (isSel) { bg = '#fff5f5'; border = '#fca5a5'; color = '#991b1b' }
              } else if (isSel) { bg = '#eff6ff'; border = '#3182f6'; color = '#1d4ed8' }

              return (
                <button key={i} onClick={() => !shown && setSel(i)} disabled={shown} style={{
                  display: 'flex', alignItems: 'center', gap: 10, padding: '11px 14px',
                  borderRadius: 10, border: `2px solid ${border}`, background: bg,
                  cursor: shown ? 'default' : 'pointer', textAlign: 'left', width: '100%',
                  transition: 'all 0.12s',
                }}>
                  <span style={{ fontSize: 14, fontWeight: 800, color, flexShrink: 0, width: 20 }}>{LABELS[i]}</span>
                  <span style={{ fontSize: 'clamp(12px, 2vw, 13px)', fontWeight: 500, color, flex: 1, lineHeight: 1.5 }}>{opt}</span>
                  {shown && isCorr && <CheckCircle style={{ width: 15, height: 15, color: '#16a34a', flexShrink: 0 }} />}
                  {shown && !isCorr && isSel && <XCircle style={{ width: 15, height: 15, color: '#ef4444', flexShrink: 0 }} />}
                </button>
              )
            })}
          </div>

          <div style={{ padding: '0 18px 16px' }}>
            {!shown ? (
              <button onClick={submit} disabled={sel === null} style={{
                width: '100%', padding: '12px', borderRadius: 12, border: 'none',
                cursor: sel !== null ? 'pointer' : 'not-allowed',
                background: sel !== null ? '#3182f6' : '#f2f4f6',
                color: sel !== null ? '#fff' : '#8b95a1',
                fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center',
                justifyContent: 'center', gap: 8, transition: 'all 0.12s',
              }}>
                <CheckCircle style={{ width: 15, height: 15 }} /> 정답 확인
              </button>
            ) : (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ padding: '12px 14px', borderRadius: 10,
                  background: sel === q.ans ? '#f0fdf4' : '#fffbeb',
                  border: `1px solid ${sel === q.ans ? '#bbf7d0' : '#fde68a'}` }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#374151', marginBottom: 5 }}>해설</p>
                  <p style={{ fontSize: 12, color: '#4b5563', lineHeight: 1.7 }}>{q.exp}</p>
                </div>
                <button onClick={next} style={{
                  width: '100%', padding: '12px', borderRadius: 12, border: 'none',
                  cursor: 'pointer', background: '#3182f6', color: '#fff',
                  fontSize: 14, fontWeight: 700, display: 'flex', alignItems: 'center',
                  justifyContent: 'center', gap: 8,
                }}>
                  {cur < Qs.length - 1
                    ? <>다음 문제 <ArrowRight style={{ width: 15, height: 15 }} /></>
                    : <>결과 보기 <ArrowRight style={{ width: 15, height: 15 }} /></>}
                </button>
              </motion.div>
            )}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* 학습 안내 */}
      <div style={{ padding: '12px 16px', borderRadius: 12, background: '#eff6ff', border: '1px solid #bfdbfe' }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#1d4ed8', marginBottom: 5 }}>학습 안내</p>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {['각 문제를 신중하게 읽고 핵심 개념을 파악하세요.',
            '틀린 문제는 해설을 통해 개념을 다시 확인하세요.',
            '이온·공유 결합 개념 페이지를 복습하면 도움이 됩니다.'].map((t, i) => (
            <li key={i} style={{ fontSize: 12, color: '#1e40af', display: 'flex', gap: 7 }}>
              <span style={{ flexShrink: 0 }}>·</span><span>{t}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}