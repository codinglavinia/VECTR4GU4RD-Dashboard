import './Sidebar.css';

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        {/* Logo removido para usar solo la marca de agua gigante */}
      </div>
      
      <nav className="sidebar-nav">
        <a href="#" className="nav-item active">
          <span className="nav-icon">🛡️</span>
        </a>
        <a href="#" className="nav-item">
          <span className="nav-icon">🌐</span>
        </a>
        <a href="#" className="nav-item">
          <span className="nav-icon">📊</span>
        </a>
        <a href="#" className="nav-item">
          <span className="nav-icon">⚙️</span>
        </a>
        <a href="#" className="nav-item">
          <span className="nav-icon">👥</span>
        </a>
      </nav>

      <div className="sidebar-bottom">
        <a href="#" className="nav-item">
          <span className="nav-icon">🔔</span>
        </a>
        <div className="user-profile">
          <img src="https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff" alt="Admin" />
        </div>
      </div>
    </aside>
  );
}
