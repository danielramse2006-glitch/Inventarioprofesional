import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCAIGUn8pMk-1YqNNTZUIhHUnKXe8mCz1U",
  authDomain: "inventario-1bc15.firebaseapp.com",
  projectId: "inventario-1bc15",
  storageBucket: "inventario-1bc15.firebasestorage.app",
  messagingSenderId: "1052136059240",
  appId: "1:1052136059240:web:f4be7d9f87adbba98966dd",
  measurementId: "G-V4BS5HT1VX"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// Función de seguridad: Verifica sesión y permisos
export function checkAuth(permisoRequerido = null) {
    const sesion = sessionStorage.getItem("currentUser");
    if (!sesion) {
        window.location.href = "login.html";
        return null;
    }
    const user = JSON.parse(sesion);

    // El admin maestro pasa siempre
    if (user.usuario === 'admin') return user;

    // Validación de permisos específicos
    if (permisoRequerido && (!user.permisos || !user.permisos[permisoRequerido])) {
        alert("Acceso Denegado: No tienes permiso para esta sección.");
        window.location.href = "index.html";
        return null;
    }
    return user;

}
