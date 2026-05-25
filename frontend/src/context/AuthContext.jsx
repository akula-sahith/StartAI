// frontend/src/context/AuthContext.jsx

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  onAuthStateChanged,
  signOut,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth } from "../services/firebase";

const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();

export function AuthProvider({ children }) {

  const [user, setUser] = useState(null);

  const [loading, setLoading] = useState(true);

  // Track auth state
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {

        setUser(currentUser);

        setLoading(false);
      }
    );

    return () => unsubscribe();

  }, []);

  // Email Signup with display name
  const signup = async (email, password, displayName) => {

    const result = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Set display name on the Firebase user profile
    if (displayName) {
      await updateProfile(result.user, {
        displayName: displayName,
      });
    }

    return result;
  };

  // Email Login
  const login = (email, password) => {

    return signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  };

  // Google Login
  const googleLogin = () => {

    return signInWithPopup(
      auth,
      googleProvider
    );
  };

  // Logout
  const logout = () => {

    return signOut(auth);
  };

  // Get fresh Firebase ID token
  const getToken = async () => {
    if (user) {
      return await user.getIdToken();
    }
    return null;
  };

  const value = {

    user,

    loading,

    signup,

    login,

    googleLogin,

    logout,

    getToken,
  };

  return (

    <AuthContext.Provider value={value}>

      {!loading && children}

    </AuthContext.Provider>
  );
}

export function useAuth() {

  return useContext(AuthContext);
}