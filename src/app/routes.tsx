import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import IonicConcept from './pages/IonicConcept'
import IonicBonding from './pages/IonicBonding'


export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/ionic-concept" element={<IonicConcept />} />
        <Route path="/ionic-lab" element={<IonicBonding />} />
        <Route path="/covalent-concept" element={<div>공유 개념</div>} />
        <Route path="/covalent-lab" element={<div>공유 실습</div>} />
        <Route path="/quiz" element={<div>퀴즈</div>} />
      </Route>
    </Routes>
  )
}