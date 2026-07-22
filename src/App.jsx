import { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import Todo from './components/Todo/Todo'
import CryptoTracker from './components/CryptoTracker/CryptoTracker'
import CarsShowcase from './components/CarsShowcase/CarsShowcase'
import UserProfiles from './components/UserProfiles/UserProfiles'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('home')

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <CryptoTracker />
      case 'cars':
        return <CarsShowcase />
      case 'services':
        return <UserProfiles />
      case 'todo':
        return <Todo/>
      default:
        return <CryptoTracker />
    }
  }

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

export default App
