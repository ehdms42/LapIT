import React from 'react'
import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

const HL = ({ children, color = '#fef08a' }: { children: React.ReactNode; color?: string }) => (
  <mark style={{ background: color, padding: '1px 3px', borderRadius: 3, fontWeight: 700 }}>{children}</mark>
)

const Box = ({ color, bg, title, children }: { color: string; bg: string; title: string; children: React.ReactNode }) => (
  <div style={{ borderLeft: `4px solid ${color}`, background: bg, borderRadius: '0 12px 12px 0', padding: '14px 18px', margin: '14px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>{title}</p>
    {children}
  </div>
)

const Divider = () => <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '28px 0' }} />

const Section = ({ num, title, children }: { num: string; title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 40 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      <span style={{ width: 32, height: 32, background: '#7248d6', color: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{num}</span>
      <h2 style={{ fontSize: 'clamp(17px, 3vw, 22px)', fontWeight: 800, color: '#1d1d1f', letterSpacing: '-0.025em', margin: 0 }}>{title}</h2>
    </div>
    {children}
  </section>
)

export default function CovalentConcept() {
  return (
    <div style={{ maxWidth: 720 }}>
      {/* 헤더 */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#7248d6', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>UNIT 02 · 개념 학습</p>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 900, color: '#1d1d1f', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 12 }}>공유 결합</h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 16px)', color: '#6e6e73', lineHeight: 1.7, maxWidth: 520 }}>
          비금속 원자들이 전자를 주고받지 않고 함께 공유하여<br />분자를 형성하는 화학 결합입니다.
        </p>
        <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
          {['공유 전자쌍', '비공유 전자쌍', '옥텟 규칙', '루이스 구조'].map(t => (
            <span key={t} style={{ fontSize: 11, fontWeight: 600, color: '#7248d6', background: '#f0e8fd', borderRadius: 100, padding: '4px 10px' }}>{t}</span>
          ))}
        </div>
      </div>

      <Section num="1" title="공유 결합이란?">
        <p style={{ fontSize: 14, color: '#3a3a3a', lineHeight: 1.85, marginBottom: 16 }}>
          공유 결합은 두 원자가 각자의 전자를 내놓아 <HL color="#e9d5ff">전자쌍</HL>을 만들고,
          이 전자쌍을 <HL>함께 사용</HL>하는 방식으로 형성됩니다.
          주로 <HL color="#bbf7d0">비금속 원소들</HL> 사이에서 발생합니다.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 10, marginBottom: 14 }}>
          <div style={{ background: '#eff6ff', borderRadius: 14, padding: '14px 16px' }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#0066cc', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>이온 결합</p>
            <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7 }}>전자를 <strong>주고받음</strong><br />금속 + 비금속</p>
          </div>
          <div style={{ background: '#f0e8fd', borderRadius: 14, padding: '14px 16px' }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#7248d6', marginBottom: 8, letterSpacing: '0.04em', textTransform: 'uppercase' }}>공유 결합</p>
            <p style={{ fontSize: 13, color: '#374151', lineHeight: 1.7 }}>전자를 <strong>함께 씀</strong><br />비금속 + 비금속</p>
          </div>
        </div>
        <Box color="#7248d6" bg="#f0e8fd" title="공유 전자쌍 vs 비공유 전자쌍">
          <p style={{ fontSize: 13, color: '#4c1d95', lineHeight: 1.7 }}>
            · <strong>공유 전자쌍</strong>: 두 원자가 함께 공유하는 전자쌍 (결합에 참여)<br />
            · <strong>비공유 전자쌍</strong>: 결합에 참여하지 않고 한 원자에만 속하는 전자쌍
          </p>
        </Box>
      </Section>

      <Divider />

      <Section num="2" title="루이스 전자 구조식">
        <p style={{ fontSize: 14, color: '#3a3a3a', lineHeight: 1.85, marginBottom: 16 }}>
          루이스 전자 구조식은 원자의 <HL>최외각 전자</HL>를 점(·)으로 나타내어,
          공유 결합과 비공유 전자쌍을 표현하는 방식입니다.
        </p>
        {/* 루이스 구조식 — 태블릿에서 2열 */}
        <div className="grid grid-cols-2 sm:grid-cols-3" style={{ gap: 8, marginBottom: 14 }}>
          {[
            { formula: 'H─H',    name: 'H₂',  info: '단일결합 · 공유1쌍',      color: '#6366f1' },
            { formula: 'O═O',    name: 'O₂',  info: '이중결합 · 공유2쌍',      color: '#ef4444' },
            { formula: 'N≡N',    name: 'N₂',  info: '삼중결합 · 공유3쌍',      color: '#3b82f6' },
            { formula: 'H─O─H', name: 'H₂O', info: '단일결합×2 · 비공유2쌍', color: '#0891b2' },
            { formula: 'O═C═O', name: 'CO₂', info: '이중결합×2 · 비공유4쌍', color: '#78716c' },
            { formula: 'H─N─H', name: 'NH₃', info: '단일결합×3 · 비공유1쌍', color: '#8b5cf6' },
          ].map(m => (
            <div key={m.name} style={{ padding: '12px 14px', borderRadius: 12, background: '#f5f5f7', textAlign: 'center' }}>
              <code style={{ fontSize: 'clamp(13px, 2vw, 16px)', fontWeight: 800, color: '#1d1d1f', fontFamily: 'monospace', display: 'block', marginBottom: 5 }}>{m.formula}</code>
              <span style={{ fontSize: 12, fontWeight: 700, color: m.color, display: 'block', marginBottom: 2 }}>{m.name}</span>
              <span style={{ fontSize: 10, color: '#86868b', lineHeight: 1.4, display: 'block' }}>{m.info}</span>
            </div>
          ))}
        </div>
        <Box color="#059669" bg="#f0fdf4" title="옥텟 규칙 (Octet Rule)">
          <p style={{ fontSize: 13, color: '#065f46', lineHeight: 1.7 }}>
            대부분의 원자는 최외각 전자가 <strong>8개</strong>(수소·헬륨은 2개)가 되도록 전자를 공유합니다.<br />
            예) O(6개) + 2H(각 1개) → O가 8개, H가 각 2개 달성 → H₂O
          </p>
        </Box>
      </Section>

      <Divider />

      <Section num="3" title="단일·이중·삼중 결합">
        <p style={{ fontSize: 14, color: '#3a3a3a', lineHeight: 1.85, marginBottom: 18 }}>
          공유하는 전자쌍의 수에 따라 결합의 종류가 달라집니다.
          <HL>전자쌍이 많을수록</HL> 결합이 강하고 결합 길이가 짧아집니다.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { sym: '─', type: '단일 결합', pairs: 1, e: 2, color: '#0066cc', bg: '#eff6ff', desc: '전자쌍 1개 공유. 가장 일반적인 결합.', ex: 'H₂, HCl, H₂O, CH₄' },
            { sym: '═', type: '이중 결합', pairs: 2, e: 4, color: '#7248d6', bg: '#f0e8fd', desc: '전자쌍 2개 공유. 단일보다 짧고 강한 결합.', ex: 'O₂, CO₂, C₂H₄' },
            { sym: '≡', type: '삼중 결합', pairs: 3, e: 6, color: '#0891b2', bg: '#ecfeff', desc: '전자쌍 3개 공유. 가장 짧고 강한 결합.', ex: 'N₂, C₂H₂' },
          ].map(b => (
            <div key={b.type} style={{ display: 'flex', gap: 16, padding: '16px 18px', borderRadius: 14, background: b.bg }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: b.color, fontFamily: 'monospace', flexShrink: 0, width: 32, textAlign: 'center', lineHeight: 1.2 }}>{b.sym}</div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: '#1d1d1f' }}>{b.type}</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: b.color, borderRadius: 100, padding: '2px 8px' }}>전자 {b.e}개</span>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', background: b.color + 'bb', borderRadius: 100, padding: '2px 8px' }}>전자쌍 {b.pairs}개</span>
                </div>
                <p style={{ fontSize: 12, color: '#6e6e73', lineHeight: 1.6, marginBottom: 6 }}>{b.desc}</p>
                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                  {b.ex.split(', ').map(ex => (
                    <code key={ex} style={{ fontSize: 11, fontWeight: 700, color: b.color, background: 'rgba(255,255,255,0.7)', borderRadius: 6, padding: '2px 8px', fontFamily: 'monospace' }}>{ex}</code>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      <Section num="4" title="이온 결합 vs 공유 결합">
        {/* 비교표 — 스크롤 가능 */}
        <div style={{ borderRadius: 12, overflow: 'auto', border: '1px solid rgba(0,0,0,0.07)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 380 }}>
            <thead>
              <tr style={{ background: '#f5f5f7' }}>
                {['구분', '이온 결합', '공유 결합'].map((h, i) => (
                  <th key={i} style={{ padding: '10px 14px', textAlign: i === 0 ? 'left' : 'center', fontWeight: 700, borderBottom: '1px solid rgba(0,0,0,0.07)', color: i === 1 ? '#0066cc' : i === 2 ? '#7248d6' : '#1d1d1f', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                ['형성 방식', '전자 주고받음', '전자쌍 공유'],
                ['참여 원소', '금속 + 비금속', '비금속 + 비금속'],
                ['결합 단위', '이온', '분자'],
                ['녹는점·끓는점', '높음', '대체로 낮음'],
                ['전기 전도성', '수용액에서 가능', '대부분 불가'],
                ['예시', 'NaCl, MgO', 'H₂O, CO₂'],
              ].map((row, i) => (
                <tr key={i} style={{ background: i % 2 ? '#fafafa' : '#fff' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1d1d1f', borderBottom: '1px solid rgba(0,0,0,0.04)', whiteSpace: 'nowrap' }}>{row[0]}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'center', color: '#0066cc', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>{row[1]}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'center', color: '#7248d6', borderBottom: '1px solid rgba(0,0,0,0.04)' }}>{row[2]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Divider />

      <Section num="5" title="대표 공유 결합 분자">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { f: 'H₂O',  n: '물',         d: '극성 분자, 수소 결합, 생명의 용매',  c: '#3b82f6' },
            { f: 'CO₂',  n: '이산화탄소', d: '비극성 직선형 분자, 온실 기체',      c: '#78716c' },
            { f: 'NH₃',  n: '암모니아',   d: '삼각뿔형, 질소 비료·냉매',           c: '#8b5cf6' },
            { f: 'CH₄',  n: '메테인',     d: '정사면체형, 천연가스 주성분',         c: '#374151' },
            { f: 'C₆H₆', n: '벤젠',       d: '방향족 화합물, 공명 구조',            c: '#dc2626' },
            { f: 'O₃',   n: '오존',       d: '삼각형 구조, 자외선 차단',            c: '#0891b2' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 12, background: '#fff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <code style={{ fontSize: 15, fontWeight: 800, color: r.c, fontFamily: 'monospace', width: 70, flexShrink: 0 }}>{r.f}</code>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1d1d1f', marginBottom: 2 }}>{r.n}</p>
                <p style={{ fontSize: 11, color: '#86868b' }}>{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <div style={{ background: '#7248d6', borderRadius: 16, padding: '24px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginTop: 8 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>개념 학습 완료</p>
          <p style={{ fontSize: 'clamp(15px, 3vw, 20px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em' }}>분자 구조를 직접 확인해보세요</p>
        </div>
        <Link to="/covalent-lab" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#7248d6', textDecoration: 'none', borderRadius: 980, padding: '12px 22px', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
          실습 시작 <ArrowRight style={{ width: 15, height: 15 }} />
        </Link>
      </div>
    </div>
  )
}