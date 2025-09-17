import { Component, createSignal } from 'solid-js';
import Login from './Login';
import Home from './home';
import styles from './App.module.css';

interface User {
  name: string;
  email: string;
  avatar: string;
}

const App: Component = () => {
  const [isLoggedIn, setIsLoggedIn] = createSignal(false);
  const [user, setUser] = createSignal<User | null>(null);

  const handleLogin = (userData: User) => {
    setUser(userData);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <div class={styles.app}>
      {!isLoggedIn() ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Home user={user()!} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default App;