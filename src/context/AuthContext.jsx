// 






import { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../firebaseConfig";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

const auth = getAuth(app);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser && storedUser) {
        // Only set user if both Firebase and localStorage have user data
        setUser(currentUser);
      } else if (!currentUser) {
        // No Firebase user, clear state and localStorage
        setUser(null);
        localStorage.removeItem("user");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Login function
  const login = (userCredential) => {
    setUser(userCredential.user);
    localStorage.setItem("user", JSON.stringify(userCredential.user));
  };

  // Logout function
  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      localStorage.removeItem("user");
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};