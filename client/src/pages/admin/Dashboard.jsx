import { useNavigate } from 'react-router-dom'
import { supabase } from '../../lib/supabaseClient'

function Dashboard() {
  const navigate = useNavigate()

  async function handleLogout() {
    await supabase.auth.signOut()
    navigate('/admin/login')
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>Dashboard Admin</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  )
}

export default Dashboard