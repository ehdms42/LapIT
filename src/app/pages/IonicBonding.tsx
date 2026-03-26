import { useState, useRef, useCallback } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { RotateCcw, CheckCircle, XCircle, Info } from 'lucide-react'

// ── 이온 데이터 ────────────────────────────────────────────────
interface Ion {
  id: string; symbol: string; name: string;
  charge: number; type: "cation" | "anion";
  color: string; bg: string; border: string;
}

const IONS: Ion[] = [
  { id:"h",   symbol:"H⁺",    name:"수소",      charge:1,  type:"cation", color:"#1d4ed8", bg:"#dbeafe", border:"#93c5fd" },
  { id:"na",  symbol:"Na⁺",   name:"나트륨",    charge:1,  type:"cation", color:"#1d4ed8", bg:"#dbeafe", border:"#93c5fd" },
  { id:"k",   symbol:"K⁺",    name:"칼륨",      charge:1,  type:"cation", color:"#1d4ed8", bg:"#dbeafe", border:"#93c5fd" },
  { id:"li",  symbol:"Li⁺",   name:"리튬",      charge:1,  type:"cation", color:"#1d4ed8", bg:"#dbeafe", border:"#93c5fd" },
  { id:"ag",  symbol:"Ag⁺",   name:"은",        charge:1,  type:"cation", color:"#374151", bg:"#f3f4f6", border:"#d1d5db" },
  { id:"mg",  symbol:"Mg²⁺",  name:"마그네슘",  charge:2,  type:"cation", color:"#1e40af", bg:"#bfdbfe", border:"#60a5fa" },
  { id:"ca",  symbol:"Ca²⁺",  name:"칼슘",      charge:2,  type:"cation", color:"#1e40af", bg:"#bfdbfe", border:"#60a5fa" },
  { id:"ba",  symbol:"Ba²⁺",  name:"바륨",      charge:2,  type:"cation", color:"#1e40af", bg:"#bfdbfe", border:"#60a5fa" },
  { id:"zn",  symbol:"Zn²⁺",  name:"아연",      charge:2,  type:"cation", color:"#0c4a6e", bg:"#e0f2fe", border:"#7dd3fc" },
  { id:"cu",  symbol:"Cu²⁺",  name:"구리",      charge:2,  type:"cation", color:"#0c4a6e", bg:"#e0f2fe", border:"#7dd3fc" },
  { id:"fe2", symbol:"Fe²⁺",  name:"철(II)",    charge:2,  type:"cation", color:"#78350f", bg:"#fef3c7", border:"#fcd34d" },
  { id:"al",  symbol:"Al³⁺",  name:"알루미늄",  charge:3,  type:"cation", color:"#1e3a8a", bg:"#93c5fd", border:"#3b82f6" },
  { id:"fe3", symbol:"Fe³⁺",  name:"철(III)",   charge:3,  type:"cation", color:"#7c2d12", bg:"#fde8d0", border:"#fb923c" },
  { id:"cl",  symbol:"Cl⁻",   name:"염화",      charge:-1, type:"anion",  color:"#991b1b", bg:"#fee2e2", border:"#fca5a5" },
  { id:"f",   symbol:"F⁻",    name:"플루오린화",charge:-1, type:"anion",  color:"#9d174d", bg:"#fce7f3", border:"#f9a8d4" },
  { id:"br",  symbol:"Br⁻",   name:"브롬화",    charge:-1, type:"anion",  color:"#78350f", bg:"#fef3c7", border:"#fcd34d" },
  { id:"oh",  symbol:"OH⁻",   name:"수산화",    charge:-1, type:"anion",  color:"#065f46", bg:"#d1fae5", border:"#6ee7b7" },
  { id:"no3", symbol:"NO₃⁻",  name:"질산",      charge:-1, type:"anion",  color:"#7f1d1d", bg:"#fee2e2", border:"#fca5a5" },
  { id:"o",   symbol:"O²⁻",   name:"산화",      charge:-2, type:"anion",  color:"#7f1d1d", bg:"#fecaca", border:"#f87171" },
  { id:"s",   symbol:"S²⁻",   name:"황화",      charge:-2, type:"anion",  color:"#713f12", bg:"#fef9c3", border:"#fde047" },
  { id:"so4", symbol:"SO₄²⁻", name:"황산",      charge:-2, type:"anion",  color:"#7f1d1d", bg:"#fecaca", border:"#f87171" },
  { id:"co3", symbol:"CO₃²⁻", name:"탄산",      charge:-2, type:"anion",  color:"#581c87", bg:"#f3e8ff", border:"#c4b5fd" },
  { id:"po4", symbol:"PO₄³⁻", name:"인산",      charge:-3, type:"anion",  color:"#14532d", bg:"#dcfce7", border:"#86efac" },
];

// ── 퍼즐 치수 (수학적으로 완벽한 비례) ────────────────────────
// 핵심: pieceH(n) = n × UNIT_H
// H⁺(1) × 2개 = SO₄²⁻(2) × 1개 = 176px → 완벽히 맞물림
// notch는 각 UNIT_H 구간(0~88, 88~176, ...)의 정중앙에 배치
const BW = 96;       // 블록 기본 너비
const ND = 20;       // notch 깊이
const NOTCH_H = 22;  // notch 세로 높이
const UNIT_H = 88;   // 전하 1단위 높이 (모든 블록 높이의 기준)
const SNAP = 90;     // snap 발동 거리(px)

const pieceH = (n: number) => n * UNIT_H;

// 양이온: 오른쪽에 사각 홈. i번째 구간 중앙 = (i+0.5)*UNIT_H
function catPath(n: number, H: number) {
  let p = `M0 0 L${BW} 0`;
  for (let i = 0; i < n; i++) {
    const cy = (i + 0.5) * UNIT_H;
    const y0 = cy - NOTCH_H / 2, y1 = cy + NOTCH_H / 2;
    p += ` L${BW} ${y0} L${BW-ND} ${y0} L${BW-ND} ${y1} L${BW} ${y1}`;
  }
  return p + ` L${BW} ${H} L0 ${H} Z`;
}

// 음이온: 왼쪽에 사각 돌출. 양이온 홈과 정확히 동일한 위치/치수
function aniPath(n: number, H: number) {
  let p = `M${ND} 0`;
  for (let i = 0; i < n; i++) {
    const cy = (i + 0.5) * UNIT_H;
    const y0 = cy - NOTCH_H / 2, y1 = cy + NOTCH_H / 2;
    p += ` L${ND} ${y0} L0 ${y0} L0 ${y1} L${ND} ${y1}`;
  }
  return p + ` L${ND} ${H} L${ND+BW} ${H} L${ND+BW} 0 Z`;
}

function PuzzlePiece({ ion, scale = 1, snapped = false }: { ion: Ion; scale?: number; snapped?: boolean }) {
  const n = Math.abs(ion.charge);
  const H = pieceH(n);
  const isCat = ion.type === "cation";
  const W = isCat ? BW : BW + ND;
  const path = isCat ? catPath(n, H) : aniPath(n, H);
  const tx = isCat ? BW / 2 : ND + BW / 2;
  const fs = scale > 0.75 ? Math.min(16, 11 + n * 1.5) : Math.min(13, 9 + n);

  return (
    <svg width={W * scale} height={H * scale} viewBox={`0 0 ${W} ${H}`}
      style={{ overflow: "visible", display: "block",
        filter: snapped
          ? `drop-shadow(0 0 6px ${ion.color}40) drop-shadow(0 2px 8px rgba(0,0,0,0.1))`
          : "drop-shadow(0 2px 10px rgba(0,0,0,0.12))" }}>
      <path d={path} fill={ion.bg} stroke={ion.border} strokeWidth="2.5" strokeLinejoin="miter" />
      <text x={tx} y={H / 2 + fs * 0.38} textAnchor="middle"
        fontSize={fs} fontWeight="800" fill={ion.color}
        style={{ fontFamily: "'Pretendard', -apple-system, sans-serif" }}>{ion.symbol}</text>
    </svg>
  );
}

function PaletteItem({ ion, onDragStart }: { ion: Ion; onDragStart: (ion: Ion, e: React.PointerEvent) => void }) {
  return (
    <div
      onPointerDown={e => { e.preventDefault(); onDragStart(ion, e); }}
      style={{
        display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
        padding: "12px 8px", borderRadius: 14,
        border: `1.5px solid ${ion.border}60`,
        background: ion.bg + "70",
        cursor: "grab", userSelect: "none",
        transition: "transform 0.12s ease, box-shadow 0.12s ease",
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "translateY(-2px)";
        el.style.boxShadow = `0 6px 18px ${ion.color}20`;
        el.style.background = ion.bg;
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.transform = "";
        el.style.boxShadow = "";
        el.style.background = ion.bg + "70";
      }}
    >
      <PuzzlePiece ion={ion} scale={0.6} />
      <span style={{ fontSize: 10, fontWeight: 700, color: ion.color, textAlign: "center" }}>{ion.name}</span>
    </div>
  );
}

// ── 화합물 DB ─────────────────────────────────────────────────
const COMPOUND_DB: Record<string, { formula: string; name: string; color: string; props: string[] }> = {
  "h-1+cl-1":   { formula:"HCl",    name:"염산",              color:"#0ea5e9", props:["강산 (완전 이온화)","위산의 주성분","금속과 반응 → 수소 기체 발생"] },
  "na-1+cl-1":  { formula:"NaCl",   name:"염화나트륨 (소금)", color:"#f59e0b", props:["중성 염 (pH≈7)","식용 소금의 주성분","용융점 801°C"] },
  "na-1+oh-1":  { formula:"NaOH",   name:"수산화나트륨",      color:"#10b981", props:["강염기","비누 제조(비누화 반응)","강한 부식성"] },
  "h-1+f-1":    { formula:"HF",     name:"불화수소산",        color:"#8b5cf6", props:["약산 (pKa≈3.2)","유리를 녹이는 유일한 산","독성 강함"] },
  "h-1+oh-1":   { formula:"H₂O",    name:"물",               color:"#3b82f6", props:["중성 (pH 7)","강한 수소 결합 → 높은 비열","생명 유지에 필수"] },
  "h-2+so4-2":  { formula:"H₂SO₄", name:"황산",              color:"#dc2626", props:["강산 (pKa₁≈−3)","납 배터리 전해질","탈수성 강함"] },
  "na-2+so4-2": { formula:"Na₂SO₄",name:"황산나트륨",        color:"#0891b2", props:["세탁 세제 충전제","유리 제조 원료","건조제로 사용"] },
  "ca-2+o-2":   { formula:"CaO",    name:"산화칼슘 (생석회)", color:"#78716c", props:["물과 반응 → 강한 발열","시멘트의 주성분","용융점 2613°C"] },
  "mg-2+o-2":   { formula:"MgO",    name:"산화마그네슘",      color:"#737373", props:["내화재 (용융점 2852°C)","제산제 성분","마그네슘 결핍 보충제"] },
  "ca-2+co3-2": { formula:"CaCO₃", name:"탄산칼슘",          color:"#94a3b8", props:["석회석·대리석·분필의 주성분","제산제","산과 반응 → CO₂ 발생"] },
  "na-2+co3-2": { formula:"Na₂CO₃",name:"탄산나트륨 (소다회)",color:"#a78bfa",props:["약한 염기 (pH≈11)","유리 제조 원료","세탁 소다"] },
  "mg-2+cl-2":  { formula:"MgCl₂", name:"염화마그네슘",      color:"#14b8a6", props:["도로 제설제","두부 응고제 (간수)","흡습성 강함"] },
  "ca-2+cl-2":  { formula:"CaCl₂", name:"염화칼슘",          color:"#f97316", props:["강력한 제습제","식품 첨가물 (E509)","콘크리트 경화 촉진제"] },
  "al-3+cl-3":  { formula:"AlCl₃", name:"염화알루미늄",      color:"#7c3aed", props:["루이스 산 촉매","물에 강산성","땀 냄새 제거제 성분"] },
  "k-1+cl-1":   { formula:"KCl",   name:"염화칼륨",          color:"#ec4899", props:["칼리 비료의 주원료","전해질 보충제","용융점 776°C"] },
  "k-1+oh-1":   { formula:"KOH",   name:"수산화칼륨",        color:"#84cc16", props:["강염기","알칼리 배터리 전해질","CO₂ 흡수제"] },
  "h-1+no3-1":  { formula:"HNO₃",  name:"질산",              color:"#ef4444", props:["강산","비료·화약 제조 원료","단백질과 반응 → 노란색"] },
  "na-1+f-1":   { formula:"NaF",   name:"불화나트륨",        color:"#6366f1", props:["치약·수돗물 불소 처리","독성 주의","용융점 993°C"] },
  "na-1+no3-1": { formula:"NaNO₃", name:"질산나트륨",        color:"#f87171", props:["질소 비료","식품 방부제 (E251)","화약 제조 원료"] },
  "ca-3+po4-3": { formula:"Ca₃(PO₄)₂",name:"인산칼슘",      color:"#22c55e", props:["뼈·치아의 주요 무기 성분","비료 원료","식품 완충제"] },
  "h-3+po4-3":  { formula:"H₃PO₄",name:"인산",              color:"#84cc16", props:["중간 강도 산","비료·세제 원료","콜라의 신맛 성분"] },
  "al-3+o-3":   { formula:"Al₂O₃",name:"알루미나",           color:"#92400e", props:["루비·사파이어의 주성분","용융점 2072°C","내마모성 코팅 재료"] },
};

function getDbKey(cats: CanvasIon[], anis: CanvasIon[]): string {
  if (!cats.length || !anis.length) return "";
  return `${cats[0].ion.id}-${Math.abs(cats[0].ion.charge) * cats.length}+${anis[0].ion.id}-${Math.abs(anis[0].ion.charge) * anis.length}`;
}

function CompoundResult({ cats, anis }: { cats: CanvasIon[]; anis: CanvasIon[] }) {
  const key = getDbKey(cats, anis);
  const data = COMPOUND_DB[key];
  const color = data?.color ?? "#3b82f6";
  const autoFormula = () => {
    const cm = new Map<string,number>(), am = new Map<string,number>();
    cats.forEach(c=>{const s=c.ion.symbol.replace(/[⁺⁻²³⁴]/g,"");cm.set(s,(cm.get(s)||0)+1);});
    anis.forEach(a=>{const s=a.ion.symbol.replace(/[⁺⁻²³⁴]/g,"");am.set(s,(am.get(s)||0)+1);});
    return [...cm.entries()].map(([s,n])=>`${s}${n>1?n:""}`).join("")
         + [...am.entries()].map(([s,n])=>`${s}${n>1?n:""}`).join("");
  };
  const formula = data?.formula ?? autoFormula();
  const name    = data?.name    ?? "이온 화합물";
  const props   = data?.props   ?? ["이온 결합 물질","높은 용융점 (강한 정전기적 인력)","수용액에서 이온화하여 전기 전도"];

  return (
    <motion.div initial={{ opacity:0, y:10, scale:0.97 }} animate={{ opacity:1, y:0, scale:1 }} exit={{ opacity:0 }}
      style={{ background:"#fff", borderRadius:20, border:`1.5px solid ${color}25`, overflow:"hidden",
        boxShadow:`0 4px 24px ${color}15, 0 2px 8px rgba(0,0,0,0.06)` }}>
      <div style={{ padding:"18px 24px", borderBottom:"1px solid rgba(0,0,0,0.05)",
        background:color+"0a", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
        <div>
          <p style={{ fontSize:11, fontWeight:700, color, letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:4 }}>합성된 화합물</p>
          <p style={{ fontSize:28, fontWeight:800, color:"#1d1d1f", fontFamily:"monospace" }}>{formula}</p>
        </div>
        <span style={{ fontSize:13, fontWeight:700, color:"#fff", background:color, borderRadius:100, padding:"6px 16px" }}>{name}</span>
      </div>
      <div style={{ padding:"16px 24px" }}>
        <p style={{ fontSize:11, fontWeight:700, color:"#86868b", letterSpacing:"0.06em", textTransform:"uppercase", marginBottom:10 }}>주요 특성</p>
        {props.map((p,i)=>(
          <div key={i} style={{ display:"flex", gap:10, marginBottom:8 }}>
            <div style={{ width:5, height:5, borderRadius:"50%", background:color, flexShrink:0, marginTop:7 }}/>
            <p style={{ fontSize:14, color:"#3a3a3a", lineHeight:1.65 }}>{p}</p>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function getImbalanceReason(totPos: number, totNeg: number, cats: CanvasIon[], anis: CanvasIon[]): string {
  if (!cats.length && !anis.length) return "캔버스에 이온을 추가해주세요.";
  if (!cats.length) return "양이온(+)을 추가해주세요.";
  if (!anis.length) return "음이온(−)을 추가해주세요.";
  const diff = Math.abs(totPos - totNeg);
  if (totPos > totNeg) return `양이온 전하 합(+${totPos})이 음이온 합(−${totNeg})보다 ${diff} 큽니다. 음이온을 더 추가하거나 양이온을 줄이세요.`;
  return `음이온 전하 합(−${totNeg})이 양이온 합(+${totPos})보다 ${diff} 큽니다. 양이온을 더 추가하거나 음이온을 줄이세요.`;
}

// ── 캔버스 이온 ───────────────────────────────────────────────
interface CanvasIon {
  uid: string; ion: Ion; x: number; y: number;
  // 세로 스택 링크 (양이온끼리)
  stackAbove: string | null;  // 위에 있는 양이온 uid
  stackBelow: string | null;  // 아래에 있는 양이온 uid
  // 가로 결합 링크
  bondedAnions: string[];     // 이 양이온에 결합된 음이온 uid 목록
  bondedTo: string | null;    // 이 음이온이 결합된 양이온 uid
}

// 특정 양이온이 속한 세로 스택 전체를 반환 (위→아래 순서)
function getStack(uid: string, items: CanvasIon[]): CanvasIon[] {
  const map = new Map(items.map(it => [it.uid, it]));
  // 스택 맨 위로 올라가기
  let top = map.get(uid)!;
  while (top.stackAbove) {
    const above = map.get(top.stackAbove);
    if (!above) break;
    top = above;
  }
  // 위→아래로 수집
  const result: CanvasIon[] = [];
  let cur: CanvasIon | undefined = top;
  while (cur) {
    result.push(cur);
    cur = cur.stackBelow ? map.get(cur.stackBelow) : undefined;
  }
  return result;
}

// 스택의 총 높이 & top Y
function stackBounds(stack: CanvasIon[]) {
  const topY = stack[0].y;
  const totalH = stack.reduce((s, it) => s + pieceH(Math.abs(it.ion.charge)), 0);
  return { topY, totalH, bottomY: topY + totalH };
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────
export default function IonicBonding() {
  const [tab, setTab] = useState<"cation"|"anion">("cation");
  const [items, setItems] = useState<CanvasIon[]>([]);
  const [feedback, setFeedback] = useState<{ok:boolean;msg:string;detail?:string}|null>(null);
  const uidRef = useRef(0);
  const canvasRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{uid:string|null;ion:Ion|null;ghostEl:HTMLDivElement|null;offsetX:number;offsetY:number;fromPalette:boolean}>
    ({uid:null,ion:null,ghostEl:null,offsetX:0,offsetY:0,fromPalette:false});
  const mkUid = () => `u${uidRef.current++}`;

  const onPaletteDragStart = useCallback((ion: Ion, e: React.PointerEvent) => {
    e.preventDefault();
    const ghost = document.createElement("div");
    ghost.style.cssText = `position:fixed;pointer-events:none;z-index:9999;left:${e.clientX-46}px;top:${e.clientY-28}px;opacity:0.9;`;
    ghost.innerHTML = `<div style="font-size:14px;font-weight:800;color:${ion.color};background:${ion.bg};border:2px solid ${ion.border};border-radius:9px;padding:5px 14px;box-shadow:0 4px 14px rgba(0,0,0,0.15);">${ion.symbol}</div>`;
    document.body.appendChild(ghost);
    drag.current = {uid:null,ion,ghostEl:ghost,offsetX:46,offsetY:28,fromPalette:true};
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, []);

  const onCanvasDragStart = useCallback((e: React.PointerEvent, uid: string) => {
    e.preventDefault(); e.stopPropagation();
    const item = items.find(i => i.uid === uid);
    if (!item) return;
    const rect = canvasRef.current!.getBoundingClientRect();
    drag.current = {uid,ion:item.ion,ghostEl:null,
      offsetX:e.clientX-rect.left-item.x,offsetY:e.clientY-rect.top-item.y,fromPalette:false};
    // snap 해제
    setItems(prev => prev.map(it => {
      if (it.uid === uid) return {...it, stackAbove:null, stackBelow:null, bondedTo:null};
      return {
        ...it,
        stackAbove: it.stackAbove === uid ? null : it.stackAbove,
        stackBelow: it.stackBelow === uid ? null : it.stackBelow,
        bondedAnions: it.bondedAnions.filter(a => a !== uid),
        bondedTo: it.bondedTo === uid ? null : it.bondedTo,
      };
    }));
    setFeedback(null);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }, [items]);

  const onMove = useCallback((e: PointerEvent) => {
    const d = drag.current;
    if (!d.ion) return;
    if (d.ghostEl) { d.ghostEl.style.left=`${e.clientX-d.offsetX}px`; d.ghostEl.style.top=`${e.clientY-d.offsetY}px`; }
    if (!d.fromPalette && d.uid) {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      setItems(prev => prev.map(it => it.uid===d.uid ? {...it, x:e.clientX-rect.left-d.offsetX, y:e.clientY-rect.top-d.offsetY} : it));
    }
  }, []);

  const onUp = useCallback((e: PointerEvent) => {
    const d = drag.current;
    if (!d.ion) return;
    d.ghostEl?.remove();
    const canvas = canvasRef.current;
    if (!canvas) { cleanup(); return; }
    const rect = canvas.getBoundingClientRect();
    if (e.clientX<rect.left||e.clientX>rect.right||e.clientY<rect.top||e.clientY>rect.bottom) {
      if (d.fromPalette) { cleanup(); return; }
    }
    const dropX = e.clientX-rect.left-d.offsetX;
    const dropY = e.clientY-rect.top-d.offsetY;

    setItems(prev => {
      let next = [...prev];
      let dUid = d.uid;

      if (d.fromPalette) {
        const nu = mkUid();
        next = [...next, {uid:nu, ion:d.ion!, x:dropX, y:dropY,
          stackAbove:null, stackBelow:null, bondedAnions:[], bondedTo:null}];
        dUid = nu;
      } else {
        next = next.map(it => it.uid===dUid ? {...it, x:dropX, y:dropY} : it);
      }

      const dropped = next.find(it=>it.uid===dUid)!;
      const isCat = dropped.ion.type==="cation";
      const drH = pieceH(Math.abs(dropped.ion.charge));

      let bestDist = SNAP, bestUid: string|null = null;
      let mode: "horiCatAnion"|"horiAniCat"|"stackBelow"|"stackAbove" = "horiCatAnion";

      for (const other of next) {
        if (other.uid===dUid) continue;

        const otH = pieceH(Math.abs(other.ion.charge));
        const otIsCat = other.ion.type==="cation";

        if (isCat && !otIsCat) {
          // 양이온 드래그 → 음이온에 붙이기
          // 음이온이 이미 다른 양이온에 결합되어 있으면 스킵
          if (other.bondedTo) continue;
          // snap point: 드래그중 양이온 오른쪽 면 vs 음이온 왼쪽 면
          const dx = (dropped.x+BW) - (other.x+ND);
          const dy = (dropped.y+drH/2) - (other.y+otH/2);
          const dist = Math.hypot(dx, dy);
          if (dist<bestDist) { bestDist=dist; bestUid=other.uid; mode="horiCatAnion"; }
        } else if (!isCat && otIsCat) {
          // 음이온 드래그 → 양이온에 붙이기
          // snap point: 드래그중 음이온 왼쪽 면 vs 양이온 스택 오른쪽 면
          const stack = getStack(other.uid, next);
          const {topY, totalH} = stackBounds(stack);
          const dx = (dropped.x+ND) - (other.x+BW);
          const dy = (dropped.y+drH/2) - (topY+totalH/2);
          const dist = Math.hypot(dx, dy);
          if (dist<bestDist) { bestDist=dist; bestUid=other.uid; mode="horiAniCat"; }
        } else if (isCat && otIsCat) {
          // 양이온끼리 세로 스택
          // 아래에 붙이기: 드래그중 블록 top ≈ other 블록 bottom
          const distB = Math.hypot(dropped.x-other.x, dropped.y-(other.y+otH));
          // 위에 붙이기: 드래그중 블록 bottom ≈ other 블록 top
          const distA = Math.hypot(dropped.x-other.x, (dropped.y+drH)-other.y);
          if (distB<bestDist) { bestDist=distB; bestUid=other.uid; mode="stackBelow"; }
          if (distA<bestDist) { bestDist=distA; bestUid=other.uid; mode="stackAbove"; }
        }
      }

      if (!bestUid) return next;
      const partner = next.find(it=>it.uid===bestUid)!;
      const partH = pieceH(Math.abs(partner.ion.charge));

      if (mode==="horiCatAnion") {
        // 양이온(드래그) → 음이온(partner) 결합
        // 양이온 그룹 스택 기준으로 음이온 정렬
        const stack = getStack(dUid!, next);
        const {topY, totalH} = stackBounds(stack);
        const aniH = partH;
        // 음이온 y: 양이온 스택 top과 음이온 top을 맞춤
        // (UNIT_H 단위로 notch가 배치돼 있으므로 top만 맞추면 완벽히 일치)
        const aniSlot = partner.bondedAnions.length; // 이 음이온의 슬롯 번호
        const aniX = dropped.x + BW - ND + aniSlot * BW;
        // aniY: stackTopY + (슬롯번호 × UNIT_H)
        // 이렇게 해야 Mg²⁺(2홈) + Br⁻ × 2개가 각 홈에 정확히 들어감
        const aniY = topY + aniSlot * UNIT_H;
        next = next.map(it => {
          if (it.uid===dUid) return {...it, bondedAnions:[...it.bondedAnions, bestUid!]};
          if (it.uid===bestUid) return {...it, x:aniX, y:aniY, bondedTo:dUid};
          return it;
        });
      } else if (mode==="horiAniCat") {
        // 음이온(드래그) → 양이온(partner) 결합
        const stack = getStack(bestUid, next);
        const {topY, totalH} = stackBounds(stack);
        const aniH = drH;
        const existingCount = partner.bondedAnions.length;
        const aniX = partner.x + BW - ND + existingCount * BW;
        // 음이온 y: 양이온 스택 top + (슬롯번호 × UNIT_H)
        const aniY = topY + existingCount * UNIT_H;
        next = next.map(it => {
          if (it.uid===bestUid) return {...it, bondedAnions:[...it.bondedAnions, dUid!]};
          if (it.uid===dUid) return {...it, x:aniX, y:aniY, bondedTo:bestUid};
          return it;
        });
      } else if (mode==="stackBelow") {
        // dropped 아래에 partner가 붙음 (dropped.y + drH = partner.y)
        // → dropped는 위, partner는 아래
        // 실제로는 partner 아래에 dropped를 붙이는 게 맞음
        // mode="stackBelow": dropped가 partner 바로 아래로 이동
        const newY = partner.y + partH;
        next = next.map(it => {
          if (it.uid===dUid) return {...it, x:partner.x, y:newY, stackAbove:bestUid};
          if (it.uid===bestUid) return {...it, stackBelow:dUid};
          return it;
        });
        // 이미 붙어 있는 음이온들도 재정렬
        const updatedStack = getStack(bestUid, next.map(it=>it.uid===dUid?{...it,x:partner.x,y:newY,stackAbove:bestUid}:it.uid===bestUid?{...it,stackBelow:dUid}:it));
        const {topY:newTopY, totalH:newTotalH} = stackBounds(updatedStack);
        const allCatUids = updatedStack.map(c=>c.uid);
        // 음이온들 재정렬
        next = next.map(it => {
          if (it.bondedTo && allCatUids.includes(it.bondedTo)) {
            const catItem = next.find(c=>c.uid===it.bondedTo)!;
            const aniH2 = pieceH(Math.abs(it.ion.charge));
            const idx = catItem.bondedAnions.indexOf(it.uid);
            return {...it, x:partner.x+BW-ND+idx*BW, y:newTopY+idx*UNIT_H};
          }
          return it;
        });
      } else {
        // stackAbove: dropped가 partner 바로 위로 이동
        const newY = partner.y - drH;
        next = next.map(it => {
          if (it.uid===dUid) return {...it, x:partner.x, y:newY, stackBelow:bestUid};
          if (it.uid===bestUid) return {...it, stackAbove:dUid};
          return it;
        });
        const updatedStack = getStack(dUid!, next.map(it=>it.uid===dUid?{...it,x:partner.x,y:newY,stackBelow:bestUid}:it.uid===bestUid?{...it,stackAbove:dUid}:it));
        const {topY:newTopY, totalH:newTotalH} = stackBounds(updatedStack);
        const allCatUids = updatedStack.map(c=>c.uid);
        next = next.map(it => {
          if (it.bondedTo && allCatUids.includes(it.bondedTo)) {
            const catItem = next.find(c=>c.uid===it.bondedTo)!;
            const aniH2 = pieceH(Math.abs(it.ion.charge));
            const idx = catItem.bondedAnions.indexOf(it.uid);
            return {...it, x:partner.x+BW-ND+idx*BW, y:newTopY+idx*UNIT_H};
          }
          return it;
        });
      }

      return next;
    });
    cleanup();
  }, []);

  function cleanup() {
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerup", onUp);
    drag.current = {uid:null,ion:null,ghostEl:null,offsetX:0,offsetY:0,fromPalette:false};
  }

  const remove = (uid: string) => {
    setItems(prev => prev.filter(it=>it.uid!==uid).map(it=>({
      ...it,
      stackAbove: it.stackAbove===uid ? null : it.stackAbove,
      stackBelow: it.stackBelow===uid ? null : it.stackBelow,
      bondedAnions: it.bondedAnions.filter(a=>a!==uid),
      bondedTo: it.bondedTo===uid ? null : it.bondedTo,
    })));
    setFeedback(null);
  };

  const reset = () => { setItems([]); setFeedback(null); };

  const cations = items.filter(i=>i.ion.type==="cation");
  const anions  = items.filter(i=>i.ion.type==="anion");
  const totPos  = cations.reduce((s,c)=>s+c.ion.charge,0);
  const totNeg  = anions.reduce((s,a)=>s+Math.abs(a.ion.charge),0);
  const balanced = cations.length>0 && anions.length>0 && totPos===totNeg;

  const check = () => {
    if (balanced) {
      setFeedback({ok:true, msg:"전하 균형 달성",
        detail:`양이온 합계 +${totPos}, 음이온 합계 −${totNeg} → 전기적으로 중성인 화합물 완성`});
    } else {
      setFeedback({ok:false, msg:"전하 균형이 맞지 않습니다",
        detail: getImbalanceReason(totPos, totNeg, cations, anions)});
    }
  };

  const catList = IONS.filter(i=>i.type==="cation");
  const aniList = IONS.filter(i=>i.type==="anion");

  const C: React.CSSProperties = {background:"#fff",borderRadius:20,border:"1px solid rgba(0,0,0,0.07)",boxShadow:"0 2px 12px rgba(0,0,0,0.06)"};

  return (
    <div style={{display:"flex",flexDirection:"column",gap:24}}>
      <div>
        <p style={{fontSize:11,fontWeight:700,color:"#86868b",letterSpacing:"0.07em",textTransform:"uppercase",marginBottom:6}}>UNIT 01 — 실습</p>
        <h1 style={{fontSize:32,fontWeight:800,color:"#1d1d1f",letterSpacing:"-0.03em",marginBottom:8}}>이온 결합</h1>
        <p style={{fontSize:15,color:"#86868b",lineHeight:1.6}}>
          팔레트에서 이온을 <strong style={{color:"#1d1d1f"}}>드래그해서 캔버스로</strong> 가져오세요.
          양이온을 세로로 쌓은 뒤 음이온을 가까이 놓으면 자동으로 결합됩니다.
        </p>
      </div>

      <div style={{display:"grid",gap:20}} className="lg:grid-cols-[280px_1fr]">
        {/* 팔레트 */}
        <div style={{...C,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          <div style={{display:"flex",borderBottom:"1px solid rgba(0,0,0,0.06)"}}>
            {(["cation","anion"] as const).map(t=>(
              <button key={t} onClick={()=>setTab(t)} style={{
                flex:1,padding:"12px 0",fontSize:13,fontWeight:700,border:"none",cursor:"pointer",
                borderBottom:tab===t?`2px solid ${t==="cation"?"#0066cc":"#dc2626"}`:"2px solid transparent",
                background:tab===t?(t==="cation"?"#f0f6ff":"#fff5f5"):"#fff",
                color:tab===t?(t==="cation"?"#0066cc":"#dc2626"):"#86868b",
                transition:"all 0.15s",letterSpacing:"-0.01em",
              }}>{t==="cation"?"양이온 (+)":"음이온 (−)"}</button>
            ))}
          </div>
          <div style={{padding:"8px 14px",fontSize:11,fontWeight:600,
            background:tab==="cation"?"#f0f6ff":"#fff5f5",
            color:tab==="cation"?"#0066cc":"#dc2626",
            borderBottom:"1px solid rgba(0,0,0,0.06)"}}>
            {tab==="cation"?"오른쪽 홈에 음이온이 끼워집니다":"왼쪽 돌출부가 양이온 홈에 끼워집니다"}
          </div>
          <div style={{overflowY:"auto",flex:1,padding:10,maxHeight:"calc(100vh - 260px)"}}>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
              {(tab==="cation"?catList:aniList).map(ion=>(
                <PaletteItem key={ion.id} ion={ion} onDragStart={onPaletteDragStart}/>
              ))}
            </div>
          </div>
        </div>

        {/* 오른쪽 */}
        <div style={{display:"flex",flexDirection:"column",gap:14}}>
          {/* 전하 상태 바 */}
          <div style={{...C,padding:"16px 22px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
            <div style={{display:"flex",alignItems:"center",gap:20}}>
              {[
                {label:"양이온 합",val:`+${totPos}`,color:"#0066cc"},
                {sym:"+"},
                {label:"음이온 합",val:`−${totNeg}`,color:"#dc2626"},
                {sym:"="},
                {label:"전하 합",val:balanced?"0":String(totPos-totNeg),color:balanced?"#16a34a":"#1d1d1f"},
              ].map((item:any,i)=>item.sym?(
                <span key={i} style={{color:"#d1d5db",fontSize:20,fontWeight:300}}>{item.sym}</span>
              ):(
                <div key={i}>
                  <p style={{fontSize:10,color:"#86868b",marginBottom:3,fontWeight:600}}>{item.label}</p>
                  <p style={{fontSize:24,fontWeight:800,color:item.color,lineHeight:1,letterSpacing:"-0.03em"}}>{item.val}</p>
                </div>
              ))}
            </div>
            <div style={{display:"flex",gap:8}}>
              <button onClick={check} style={{display:"inline-flex",alignItems:"center",gap:7,padding:"10px 20px",borderRadius:980,border:"none",cursor:"pointer",fontSize:14,fontWeight:700,background:"#0066cc",color:"#fff",letterSpacing:"-0.01em"}}>
                <CheckCircle style={{width:15,height:15}}/> 확인
              </button>
              <button onClick={reset} style={{display:"inline-flex",alignItems:"center",gap:7,padding:"10px 20px",borderRadius:980,border:"none",cursor:"pointer",fontSize:14,fontWeight:700,background:"#f5f5f7",color:"#1d1d1f",letterSpacing:"-0.01em"}}>
                <RotateCcw style={{width:15,height:15}}/> 초기화
              </button>
            </div>
          </div>

          {/* 피드백 */}
          <AnimatePresence>
            {feedback&&(
              <motion.div initial={{opacity:0,y:-6}} animate={{opacity:1,y:0}} exit={{opacity:0}}
                style={{borderRadius:14,padding:"14px 18px",display:"flex",alignItems:"flex-start",gap:12,
                  background:feedback.ok?"#f0fdf4":"#fff5f5",
                  border:`1px solid ${feedback.ok?"#bbf7d0":"#fecaca"}`}}>
                {feedback.ok?<CheckCircle style={{width:18,height:18,color:"#16a34a",flexShrink:0,marginTop:1}}/>
                            :<XCircle style={{width:18,height:18,color:"#ef4444",flexShrink:0,marginTop:1}}/>}
                <div>
                  <p style={{fontSize:14,fontWeight:700,color:feedback.ok?"#15803d":"#b91c1c",letterSpacing:"-0.01em"}}>{feedback.msg}</p>
                  {feedback.detail&&<p style={{fontSize:13,color:feedback.ok?"#166534":"#991b1b",marginTop:4,lineHeight:1.6}}>{feedback.detail}</p>}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* 캔버스 */}
          <div style={{...C,overflow:"hidden",
            border:balanced?"1.5px solid #86efac":"1.5px dashed rgba(0,0,0,0.1)",
            boxShadow:balanced?"0 0 0 4px #dcfce7, 0 2px 12px rgba(0,0,0,0.06)":"0 2px 12px rgba(0,0,0,0.06)"}}>
            <div style={{padding:"11px 18px",borderBottom:"1px solid rgba(0,0,0,0.05)",
              display:"flex",alignItems:"center",justifyContent:"space-between",background:"#fafafa"}}>
              <span style={{fontSize:11,fontWeight:700,color:"#86868b",letterSpacing:"0.06em",textTransform:"uppercase"}}>결합 캔버스</span>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                {balanced&&<span style={{fontSize:11,fontWeight:700,color:"#16a34a",background:"#f0fdf4",border:"1px solid #bbf7d0",borderRadius:100,padding:"3px 10px"}}>균형 달성</span>}
                <span style={{fontSize:11,color:"#c9cdd2",fontWeight:500}}>{items.length}개</span>
              </div>
            </div>
            <div ref={canvasRef} style={{position:"relative",minHeight:420,background:items.length===0?"#fafafa":"#fff",userSelect:"none"}}>
              {items.length===0&&(
                <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:8}}>
                  <p style={{fontSize:15,fontWeight:600,color:"#c9cdd2"}}>이온을 드래그해서 가져오세요</p>
                  <p style={{fontSize:13,color:"#d1d5db"}}>가까이 놓으면 자동으로 결합됩니다</p>
                </div>
              )}
              {items.map(inst=>{
                const isCat = inst.ion.type==="cation";
                const isSnapped = inst.bondedTo!==null || inst.stackAbove!==null || inst.stackBelow!==null || inst.bondedAnions.length>0;
                return (
                  <div key={inst.uid}
                    onPointerDown={e=>onCanvasDragStart(e,inst.uid)}
                    className="group"
                    style={{position:"absolute",left:inst.x,top:inst.y,cursor:"grab",
                      zIndex:isSnapped?4:8,
                      transition:(inst.bondedTo||inst.stackAbove||inst.stackBelow)
                        ?"left 0.16s cubic-bezier(.34,1.5,.64,1),top 0.16s cubic-bezier(.34,1.5,.64,1)":"none"}}>
                    <button
                      onPointerDown={e=>e.stopPropagation()} onClick={()=>remove(inst.uid)}
                      className="group-hover:!flex"
                      style={{position:"absolute",top:-9,right:-9,width:22,height:22,borderRadius:"50%",
                        background:"#1d1d1f",border:"none",cursor:"pointer",color:"#fff",fontSize:13,fontWeight:700,
                        display:"none",alignItems:"center",justifyContent:"center",zIndex:30,lineHeight:1,
                        boxShadow:"0 2px 8px rgba(0,0,0,0.2)"}}>×</button>
                    <PuzzlePiece ion={inst.ion} scale={1.05} snapped={isSnapped}/>
                    <div style={{textAlign:"center",marginTop:5}}>
                      <span style={{fontSize:10,fontWeight:700,color:inst.ion.color}}>{inst.ion.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 화합물 결과 */}
          <AnimatePresence>
            {balanced&&<CompoundResult key="result" cats={cations} anis={anions}/>}
          </AnimatePresence>

          {/* 알아두기 */}
          <div style={{...C,padding:"16px 22px"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:12}}>
              <Info style={{width:15,height:15,color:"#0066cc",flexShrink:0}}/>
              <span style={{fontSize:14,fontWeight:700,color:"#1d1d1f"}}>알아두기</span>
            </div>
            {["이온 결합은 양이온(+)과 음이온(−) 사이의 정전기적 인력으로 형성됩니다.",
              "전하의 총합이 0이 되어야 안정적인 화합물이 만들어집니다.",
              "양이온을 세로로 쌓은 뒤 음이온을 가져오면 정확히 맞물립니다.",
              "예: Na⁺ + Cl⁻ → NaCl,  H⁺×2 + SO₄²⁻ → H₂SO₄"
            ].map((s,i)=>(
              <div key={i} style={{display:"flex",gap:8,marginBottom:7}}>
                <span style={{color:"#0066cc",flexShrink:0}}>·</span>
                <p style={{fontSize:13,color:"#6b7685",lineHeight:1.65}}>{s}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
