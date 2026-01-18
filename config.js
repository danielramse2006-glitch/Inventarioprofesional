import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCtIagFFJBFRjvg5usXTm575YqOeeDE1G0",
    authDomain: "mi-inventario-51f82.firebaseapp.com",
    projectId: "mi-inventario-51f82",
    storageBucket: "mi-inventario-51f82.firebasestorage.app",
    messagingSenderId: "79417755416",
    appId: "1:79417755416:web:e1bbab46cda2bdbb5da56d"
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