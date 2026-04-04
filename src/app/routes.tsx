import { Routes, Route } from 'react-router'
import Layout from './components/Layout'
import Home from './pages/Home'
import IonicConcept from './pages/IonicConcept'
import IonicBonding from './pages/IonicBonding'
import CovalentConcept from './pages/CovalentConcept'
import CovalentBonding from './pages/CovalentBonding'
import Quiz from './pages/Quiz'


export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/ionic-concept" element={<IonicConcept />} />
        <Route path="/ionic-lab" element={<IonicBonding />} />
        <Route path="/covalent-concept" element={<CovalentConcept />} />
        <Route path="/covalent-lab" element={<CovalentBonding />} />
        <Route path="/quiz" element={<Quiz />} />
      </Route>
    </Routes>
  )
}