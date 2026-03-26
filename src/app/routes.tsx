import { Routes, Route } from 'react-router'
import Layout from './components/Layout'

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<div>홈</div>} />
        <Route path="/ionic-concept" element={<div>이온 개념</div>} />
        <Route path="/ionic-lab" element={<div>이온 실습</div>} />
        <Route path="/covalent-concept" element={<div>공유 개념</div>} />
        <Route path="/covalent-lab" element={<div>공유 실습</div>} />
        <Route path="/quiz" element={<div>퀴즈</div>} />
      </Route>
    </Routes>
  )
}