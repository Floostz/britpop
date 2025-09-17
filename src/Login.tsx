
import { Component, createSignal } from 'solid-js';
 import { signInWithPopup, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';
import styles from './Login.module.css';

interface LoginProps {
  onLogin: (user: { name: string; email: string; avatar: string }) => void;
}

const LoginFirebase: Component<LoginProps> = (props) => {
  const [email, setEmail] = createSignal('');
  const [password, setPassword] = createSignal('');
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal('');

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');
    
    try {
 
  const result = await signInWithPopup(auth, googleProvider);
const user = result.user;
      
      const userData = {
         name: user.displayName || 'Anonymous User',
        email: user.email || '',
        avatar: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || 'User')}&background=000000&color=ffffff`
      };
      
     props.onLogin(userData);
      
      // Mock implementation for demo
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate network delay
      
   
     
    } catch (error: any) {
      console.error('Google login failed:', error);
      setError(error.message || 'Google login failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEmailLogin = async (e: Event) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Real Firebase Email Auth
       const userCredential = await signInWithEmailAndPassword(auth, email(), password());
       const user = userCredential.user;
      
      const userData = {
        name: user.displayName || email().split('@')[0],
      email: user.email || '',
        avatar: user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(email().split('@')[0])}&background=000000&color=ffffff`
      };
      
    props.onLogin(userData);
      
      // Mock implementation for demo
      if (!email() || !password()) {
        throw new Error('Please fill in all fields');
      }
      
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
  
      
    } catch (error: any) {
      console.error('Email login failed:', error);
      setError(error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async () => {
    if (!email() || !password()) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');
    
    try {
      // Real Firebase Sign Up
      // const userCredential = await createUserWithEmailAndPassword(auth, email(), password());
      // const user = userCredential.user;
      
      // Mock implementation
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        name: email().split('@')[0],
        email: email(),
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(email().split('@')[0])}&background=000000&color=ffffff`
      };
      
      props.onLogin(mockUser);
      
    } catch (error: any) {
      console.error('Sign up failed:', error);
      setError(error.message || 'Sign up failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class={styles.loginScreen}>
      <div class={styles.loginCard}>
        <div class={styles.logoContainer}>
          <div class={styles.oasisLogo}></div>
        </div>
        <h1 class={styles.title}>Definitely Maybe</h1>
        <p class={styles.subtitle}>
          "You're gonna be the one that saves me" - Access the ultimate Britpop collection
        </p>
        
        {error() && (
          <div class={styles.errorMessage}>
            {error()}
          </div>
        )}
        
        <button 
          class={`${styles.googleBtn} ${isLoading() ? styles.loading : ''}`}
          onClick={handleGoogleLogin}
          disabled={isLoading()}
        >
          {isLoading() ? (
            <>
              <div class={styles.spinner}></div>
              Signing in...
            </>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" class={styles.googleIcon}>
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </>
          )}
        </button>

        <div class={styles.divider}>
          <span>or</span>
        </div>

        <form class={styles.form} onSubmit={handleEmailLogin}>
          <input 
            type="email" 
            placeholder="Email address" 
            class={styles.input}
            value={email()}
            onInput={(e) => setEmail(e.currentTarget.value)}
            disabled={isLoading()}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            class={styles.input}
            value={password()}
            onInput={(e) => setPassword(e.currentTarget.value)}
            disabled={isLoading()}
            required
          />
          <div class={styles.buttonGroup}>
            <button 
              type="submit" 
              class={`${styles.loginBtn} ${isLoading() ? styles.loading : ''}`}
              disabled={isLoading()}
            >
              {isLoading() ? 'Signing In...' : 'Sign In'}
            </button>
          
          </div>
        </form>

        <p class={styles.footer}>
          Protected by Firebase Authentication
        </p>
      </div>
    </div>
  );
};

export default LoginFirebase;