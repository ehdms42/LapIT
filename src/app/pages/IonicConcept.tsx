import { Link } from 'react-router'
import { ArrowRight } from 'lucide-react'

const HL = ({ children, color = '#fef08a' }: { children: React.ReactNode; color?: string }) => (
  <mark style={{ background: color, padding: '1px 3px', borderRadius: 3, fontWeight: 700 }}>
    {children}
  </mark>
)

const Box = ({ color, bg, title, children }: { color: string; bg: string; title: string; children: React.ReactNode }) => (
  <div style={{ borderLeft: `4px solid ${color}`, background: bg, borderRadius: '0 12px 12px 0', padding: '14px 18px', margin: '16px 0' }}>
    <p style={{ fontSize: 11, fontWeight: 800, color, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 8 }}>{title}</p>
    {children}
  </div>
)

const Divider = () => <hr style={{ border: 'none', borderTop: '1px solid #f0f0f0', margin: '28px 0' }} />

const Section = ({ num, title, children }: { num: string; title: string; children: React.ReactNode }) => (
  <section style={{ marginBottom: 40 }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
      <span style={{ width: 32, height: 32, background: '#0066cc', color: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>{num}</span>
      <h2 style={{ fontSize: 'clamp(17px, 3vw, 22px)', fontWeight: 800, color: '#1d1d1f', letterSpacing: '-0.025em', margin: 0 }}>{title}</h2>
    </div>
    {children}
  </section>
)

export default function IonicConcept() {
  return (
    <div style={{ maxWidth: 720 }}>
      {/* 헤더 */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontSize: 11, fontWeight: 700, color: '#0066cc', letterSpacing: '0.07em', textTransform: 'uppercase', marginBottom: 10 }}>UNIT 01 · 개념 학습</p>
        <h1 style={{ fontSize: 'clamp(26px, 5vw, 38px)', fontWeight: 900, color: '#1d1d1f', letterSpacing: '-0.04em', lineHeight: 1.1, marginBottom: 12 }}>이온 결합</h1>
        <p style={{ fontSize: 'clamp(13px, 2vw, 16px)', color: '#6e6e73', lineHeight: 1.7, maxWidth: 520 }}>
          금속과 비금속이 전자를 주고받아 이온을 형성하고,<br />이온 사이의 인력으로 결합하는 방식입니다.
        </p>
        <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
          {['이온화', '전하 균형', '정전기적 인력', '이온 결정'].map(t => (
            <span key={t} style={{ fontSize: 11, fontWeight: 600, color: '#0066cc', background: '#e8f0fd', borderRadius: 100, padding: '4px 10px' }}>{t}</span>
          ))}
        </div>
      </div>

      <Section num="1" title="이온이란 무엇인가?">
        <p style={{ fontSize: 14, color: '#3a3a3a', lineHeight: 1.85, marginBottom: 16 }}>
          원자가 전자를 <HL>잃거나 얻으면</HL> 전하를 띤 입자가 되는데, 이를 <HL color="#bbf7d0">이온</HL>이라고 합니다.
        </p>
        {/* 태블릿에서 2열 → 1열 */}
        <div className="grid grid-cols-1 sm:grid-cols-2" style={{ gap: 10, marginBottom: 16 }}>
          <div style={{ background: '#eff6ff', borderRadius: 14, padding: '16px 18px' }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#0066cc', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>양이온 (+)</p>
            <p style={{ fontSize: 13, color: '#1e40af', lineHeight: 1.7, marginBottom: 10 }}>전자를 <strong>잃어</strong> 양전하를 띠는 이온. 주로 금속 원자.</p>
            <code style={{ fontSize: 15, fontWeight: 800, color: '#0066cc', fontFamily: 'monospace', background: '#fff', padding: '4px 10px', borderRadius: 8, display: 'block' }}>Na → Na⁺ + e⁻</code>
          </div>
          <div style={{ background: '#fff0f0', borderRadius: 14, padding: '16px 18px' }}>
            <p style={{ fontSize: 11, fontWeight: 800, color: '#dc2626', letterSpacing: '0.04em', textTransform: 'uppercase', marginBottom: 8 }}>음이온 (−)</p>
            <p style={{ fontSize: 13, color: '#991b1b', lineHeight: 1.7, marginBottom: 10 }}>전자를 <strong>얻어</strong> 음전하를 띠는 이온. 주로 비금속 원자.</p>
            <code style={{ fontSize: 15, fontWeight: 800, color: '#dc2626', fontFamily: 'monospace', background: '#fff', padding: '4px 10px', borderRadius: 8, display: 'block' }}>Cl + e⁻ → Cl⁻</code>
          </div>
        </div>
        <Box color="#0066cc" bg="#e8f0fd" title="핵심 포인트">
          <p style={{ fontSize: 13, color: '#1e40af', lineHeight: 1.7 }}>
            이온화 에너지가 낮은 <strong>금속</strong>은 전자를 쉽게 잃고, 전자 친화도가 높은 <strong>비금속</strong>은 전자를 쉽게 얻습니다.
          </p>
        </Box>
      </Section>

      <Divider />

      <Section num="2" title="이온 결합의 형성">
        <p style={{ fontSize: 14, color: '#3a3a3a', lineHeight: 1.85, marginBottom: 16 }}>
          <HL>양이온과 음이온</HL>이 서로 가까워지면, 반대 전하 사이의 <HL color="#bbf7d0">정전기적 인력(쿨롱 힘)</HL>으로 결합합니다.
        </p>
        <div style={{ background: '#f5f5f7', borderRadius: 14, padding: '18px 20px', marginBottom: 16 }}>
          <p style={{ fontSize: 12, color: '#86868b', marginBottom: 10, fontWeight: 600 }}>대표 예시: NaCl 형성 과정</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {[
              { step: '①', text: 'Na 원자 → 전자 1개 방출 → Na⁺ 생성', color: '#0066cc', bg: '#eff6ff' },
              { step: '②', text: 'Cl 원자 → 전자 1개 흡수 → Cl⁻ 생성', color: '#dc2626', bg: '#fff0f0' },
              { step: '③', text: 'Na⁺ + Cl⁻ → 정전기적 인력 → NaCl 결합', color: '#16a34a', bg: '#f0fdf4' },
            ].map(s => (
              <div key={s.step} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '10px 14px', borderRadius: 10, background: s.bg }}>
                <span style={{ fontSize: 14, fontWeight: 900, color: s.color, flexShrink: 0, width: 24 }}>{s.step}</span>
                <p style={{ fontSize: 13, fontWeight: 500, color: '#1d1d1f' }}>{s.text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 14, padding: '12px 0', textAlign: 'center' }}>
            <code style={{ fontSize: 'clamp(16px, 3vw, 22px)', fontWeight: 900, color: '#1d1d1f', fontFamily: 'monospace', letterSpacing: '0.05em' }}>Na⁺ + Cl⁻ → NaCl</code>
            <p style={{ fontSize: 12, color: '#86868b', marginTop: 6 }}>전하 합 = (+1) + (−1) = 0 → 전기적으로 중성</p>
          </div>
        </div>
      </Section>

      <Divider />

      <Section num="3" title="전하 균형의 법칙">
        <p style={{ fontSize: 14, color: '#3a3a3a', lineHeight: 1.85, marginBottom: 16 }}>
          이온 화합물이 안정하려면 <HL>양이온 전하 합 = 음이온 전하 합</HL>이어야 합니다.
        </p>
        {/* 표 — 태블릿에서 스크롤 */}
        <div style={{ borderRadius: 12, overflow: 'auto', border: '1px solid rgba(0,0,0,0.07)', marginBottom: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13, minWidth: 380 }}>
            <thead>
              <tr style={{ background: '#f5f5f7' }}>
                {['화합물', '양이온 (합)', '음이온 (합)', '균형'].map((h, i) => (
                  <th key={i} style={{ padding: '10px 14px', textAlign: i === 0 ? 'left' : 'center', fontWeight: 700, color: '#1d1d1f', borderBottom: '1px solid rgba(0,0,0,0.07)', whiteSpace: 'nowrap' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'NaCl',       cat: 'Na⁺ ×1 = +1',  ani: 'Cl⁻ ×1 = −1' },
                { name: 'MgCl₂',      cat: 'Mg²⁺ ×1 = +2', ani: 'Cl⁻ ×2 = −2' },
                { name: 'Al₂O₃',     cat: 'Al³⁺ ×2 = +6', ani: 'O²⁻ ×3 = −6' },
                { name: 'Ca₃(PO₄)₂', cat: 'Ca²⁺ ×3 = +6', ani: 'PO₄³⁻ ×2 = −6' },
                { name: 'Na₂SO₄',    cat: 'Na⁺ ×2 = +2',  ani: 'SO₄²⁻ ×1 = −2' },
              ].map((r, i) => (
                <tr key={i} style={{ background: i % 2 ? '#fafafa' : '#fff' }}>
                  <td style={{ padding: '10px 14px', fontWeight: 700, color: '#1d1d1f', fontFamily: 'monospace', borderBottom: '1px solid rgba(0,0,0,0.04)', whiteSpace: 'nowrap' }}>{r.name}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'center', color: '#0066cc', fontSize: 12, borderBottom: '1px solid rgba(0,0,0,0.04)', whiteSpace: 'nowrap' }}>{r.cat}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'center', color: '#dc2626', fontSize: 12, borderBottom: '1px solid rgba(0,0,0,0.04)', whiteSpace: 'nowrap' }}>{r.ani}</td>
                  <td style={{ padding: '10px 14px', textAlign: 'center', color: '#16a34a', fontWeight: 800, fontSize: 16, borderBottom: '1px solid rgba(0,0,0,0.04)' }}>✓</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Box color="#f59e0b" bg="#fffbeb" title="공식으로 기억하기">
          <p style={{ fontSize: 13, color: '#92400e', lineHeight: 1.7 }}>
            두 이온의 전하 비율 = 결합 개수의 역비 <br />
            예) Mg²⁺ + Cl⁻ → 전하비 2:1 → 개수비 1:2 → MgCl₂
          </p>
        </Box>
      </Section>

      <Divider />

      <Section num="4" title="이온 결합 물질의 특성">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {[
            { title: '높은 녹는점·끓는점', color: '#7c3aed', bg: '#f5f3ff', body: '이온 사이의 강한 정전기적 인력을 끊으려면 많은 에너지가 필요합니다. NaCl 녹는점은 801°C입니다.' },
            { title: '고체 상태: 전기 부도체', color: '#0066cc', bg: '#eff6ff', body: '결정 상태에서는 이온이 고정되어 움직일 수 없기 때문에 전기가 통하지 않습니다.' },
            { title: '수용액·용융 상태: 전기 도체', color: '#16a34a', bg: '#f0fdf4', body: '물에 녹거나 가열되면 이온이 자유롭게 이동할 수 있어 전기를 전도합니다.' },
            { title: '이온 결정 구조', color: '#dc2626', bg: '#fff0f0', body: '이온이 규칙적으로 배열된 단단한 결정. 충격을 받으면 같은 전하끼리 마주쳐 특정 방향으로 쪼개집니다.' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: 14, padding: '14px 16px', borderRadius: 12, background: item.bg }}>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: item.color, flexShrink: 0, marginTop: 8 }} />
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: '#1d1d1f', marginBottom: 4 }}>{item.title}</p>
                <p style={{ fontSize: 12, color: '#4b5563', lineHeight: 1.7 }}>{item.body}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Divider />

      <Section num="5" title="대표 이온 화합물">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { f: 'NaCl',   n: '염화나트륨 (소금)',  d: '식용 소금, 제설제, 삼투압 조절', c: '#f59e0b' },
            { f: 'NaOH',   n: '수산화나트륨',        d: '강염기, 비누 제조, 하수 처리',   c: '#10b981' },
            { f: 'CaSO₄',  n: '황산칼슘 (석고)',     d: '건축 자재, 두부 응고제, 깁스',   c: '#ef4444' },
            { f: 'CaCO₃',  n: '탄산칼슘 (석회석)',   d: '건축재, 제산제, 대리석·분필',    c: '#94a3b8' },
            { f: 'KNO₃',   n: '질산칼륨 (초석)',     d: '화약, 비료, 식품 방부제',        c: '#8b5cf6' },
          ].map((r, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '12px 16px', borderRadius: 12, background: '#fff', border: '1px solid rgba(0,0,0,0.06)', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
              <code style={{ fontSize: 15, fontWeight: 800, color: r.c, fontFamily: 'monospace', width: 90, flexShrink: 0 }}>{r.f}</code>
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: '#1d1d1f', marginBottom: 2 }}>{r.n}</p>
                <p style={{ fontSize: 11, color: '#86868b' }}>{r.d}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <div style={{ background: '#0066cc', borderRadius: 16, padding: '24px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 14, marginTop: 8 }}>
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: 'rgba(255,255,255,0.6)', marginBottom: 4 }}>개념 학습 완료</p>
          <p style={{ fontSize: 'clamp(15px, 3vw, 20px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.025em' }}>이제 직접 이온을 결합해보세요</p>
        </div>
        <Link to="/ionic-lab" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: '#fff', color: '#0066cc', textDecoration: 'none', borderRadius: 980, padding: '12px 22px', fontSize: 14, fontWeight: 700, flexShrink: 0 }}>
          실습 시작 <ArrowRight style={{ width: 15, height: 15 }} />
        </Link>
      </div>
    </div>
  )
}