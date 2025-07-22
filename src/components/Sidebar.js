import React from 'react';

function Sidebar({ user, logout, onShowHome, onShowAddProduct, onShowOrderProduct, onShowOrders, cartCount }) {
  return (
    <aside style={styles.sidebar}>
      <div>
        <h2
          style={styles.brand}
          onClick={onShowHome}
          onMouseEnter={e => e.currentTarget.style.color = '#FFB732'}
          onMouseLeave={e => e.currentTarget.style.color = '#FFA500'}
        >
          🛒 SuperKart
        </h2>
        <p style={styles.greeting}>Hello, {user?.name || 'User'}</p>

        <div style={styles.navContainer}>
          <ul style={styles.navList}>
            <li style={styles.navItem} onClick={onShowHome} title="Home">🏠 Home</li>
            <li style={styles.navItem} onClick={onShowAddProduct} title="Add Product">➕ Add Product</li>
            <li style={styles.navItem} onClick={onShowOrderProduct} title="Shop">🛍️ Shop</li>
            <li style={styles.navItem} onClick={onShowOrders} title="Orders">📦 Orders</li>
          </ul>
        </div>
      </div>
      <button style={styles.logoutBtn} onClick={logout}>Logout</button>
    </aside>
  );
}

const styles = {
  sidebar: {
    width: '260px',
    height: '100vh',
    backgroundColor: 'rgba(26, 32, 44, 0.85)',
    color: '#eee',
    padding: '1.5rem 1.2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    position: 'fixed',
    top: 0,
    left: 0,
    boxShadow: '2px 0 8px rgba(0,0,0,0.3)',
    backdropFilter: 'blur(6px)',
  },
  brand: {
    color: '#FFA500',
    cursor: 'pointer',
    userSelect: 'none',
    fontWeight: '700',
    fontSize: '1.8rem',
    marginBottom: '0.6rem',
    transition: 'color 0.3s ease',
  },
  greeting: {
    marginBottom: '1.5rem',
    fontWeight: '500',
    fontSize: '1.05rem',
  },
  navContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    padding: '1rem',
    borderRadius: '12px',
  },
  navList: {
    listStyle: 'none',
    paddingLeft: 0,
    margin: 0,
  },
  navItem: {
    marginBottom: '1rem',
    cursor: 'pointer',
    color: '#63b3ed',
    fontWeight: '600',
    fontSize: '1.1rem',
    userSelect: 'none',
    padding: '0.5rem 0.8rem',
    borderRadius: '8px',
    transition: 'background-color 0.2s, color 0.2s',
  },
  logoutBtn: {
    backgroundColor: '#e53e3e',
    border: 'none',
    color: 'white',
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.9rem',
    alignSelf: 'center',
    width: '100%',
    transition: 'background-color 0.3s ease',
  },
};

export default Sidebar;
