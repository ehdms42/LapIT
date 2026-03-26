// ── 이온 타입 정의 ────────────────────────────────────────────
export interface Ion {
  id: string
  symbol: string
  name: string
  charge: number
  type: 'cation' | 'anion'
  color: string
  bg: string
  border: string
}

// ── 이온 데이터 ───────────────────────────────────────────────
// charge: 양이온은 양수, 음이온은 음수
export const IONS: Ion[] = [
  // 1가 양이온
  { id: 'h',   symbol: 'H⁺',   name: '수소',      charge: 1,  type: 'cation', color: '#1d4ed8', bg: '#dbeafe', border: '#93c5fd' },
  { id: 'na',  symbol: 'Na⁺',  name: '나트륨',    charge: 1,  type: 'cation', color: '#1d4ed8', bg: '#dbeafe', border: '#93c5fd' },
  { id: 'k',   symbol: 'K⁺',   name: '칼륨',      charge: 1,  type: 'cation', color: '#1d4ed8', bg: '#dbeafe', border: '#93c5fd' },
  { id: 'li',  symbol: 'Li⁺',  name: '리튬',      charge: 1,  type: 'cation', color: '#1d4ed8', bg: '#dbeafe', border: '#93c5fd' },
  { id: 'ag',  symbol: 'Ag⁺',  name: '은',        charge: 1,  type: 'cation', color: '#374151', bg: '#f3f4f6', border: '#d1d5db' },
  // 2가 양이온
  { id: 'mg',  symbol: 'Mg²⁺', name: '마그네슘',  charge: 2,  type: 'cation', color: '#1e40af', bg: '#bfdbfe', border: '#60a5fa' },
  { id: 'ca',  symbol: 'Ca²⁺', name: '칼슘',      charge: 2,  type: 'cation', color: '#1e40af', bg: '#bfdbfe', border: '#60a5fa' },
  { id: 'ba',  symbol: 'Ba²⁺', name: '바륨',      charge: 2,  type: 'cation', color: '#1e40af', bg: '#bfdbfe', border: '#60a5fa' },
  { id: 'zn',  symbol: 'Zn²⁺', name: '아연',      charge: 2,  type: 'cation', color: '#0c4a6e', bg: '#e0f2fe', border: '#7dd3fc' },
  { id: 'cu',  symbol: 'Cu²⁺', name: '구리',      charge: 2,  type: 'cation', color: '#0c4a6e', bg: '#e0f2fe', border: '#7dd3fc' },
  { id: 'fe2', symbol: 'Fe²⁺', name: '철(II)',    charge: 2,  type: 'cation', color: '#78350f', bg: '#fef3c7', border: '#fcd34d' },
  // 3가 양이온
  { id: 'al',  symbol: 'Al³⁺', name: '알루미늄',  charge: 3,  type: 'cation', color: '#1e3a8a', bg: '#93c5fd', border: '#3b82f6' },
  { id: 'fe3', symbol: 'Fe³⁺', name: '철(III)',   charge: 3,  type: 'cation', color: '#7c2d12', bg: '#fde8d0', border: '#fb923c' },
  // 1가 음이온
  { id: 'cl',  symbol: 'Cl⁻',   name: '염화',      charge: -1, type: 'anion', color: '#991b1b', bg: '#fee2e2', border: '#fca5a5' },
  { id: 'f',   symbol: 'F⁻',    name: '플루오린화', charge: -1, type: 'anion', color: '#9d174d', bg: '#fce7f3', border: '#f9a8d4' },
  { id: 'br',  symbol: 'Br⁻',   name: '브롬화',    charge: -1, type: 'anion', color: '#78350f', bg: '#fef3c7', border: '#fcd34d' },
  { id: 'oh',  symbol: 'OH⁻',   name: '수산화',    charge: -1, type: 'anion', color: '#065f46', bg: '#d1fae5', border: '#6ee7b7' },
  { id: 'no3', symbol: 'NO₃⁻',  name: '질산',      charge: -1, type: 'anion', color: '#7f1d1d', bg: '#fee2e2', border: '#fca5a5' },
  // 2가 음이온
  { id: 'o',   symbol: 'O²⁻',   name: '산화',      charge: -2, type: 'anion', color: '#7f1d1d', bg: '#fecaca', border: '#f87171' },
  { id: 's',   symbol: 'S²⁻',   name: '황화',      charge: -2, type: 'anion', color: '#713f12', bg: '#fef9c3', border: '#fde047' },
  { id: 'so4', symbol: 'SO₄²⁻', name: '황산',      charge: -2, type: 'anion', color: '#7f1d1d', bg: '#fecaca', border: '#f87171' },
  { id: 'co3', symbol: 'CO₃²⁻', name: '탄산',      charge: -2, type: 'anion', color: '#581c87', bg: '#f3e8ff', border: '#c4b5fd' },
  // 3가 음이온
  { id: 'po4', symbol: 'PO₄³⁻', name: '인산',      charge: -3, type: 'anion', color: '#14532d', bg: '#dcfce7', border: '#86efac' },
]