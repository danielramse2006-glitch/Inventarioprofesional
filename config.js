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

export function checkAuth(action = null) {
    const userJson = sessionStorage.getItem("currentUser");
    if (!userJson) { window.location.href = "login.html"; return; }
    
    const user = JSON.parse(userJson);
    if (user.usuario === 'admin') return user;

    if (action && !user.permisos[action]) {
        alert("No tienes permiso para esta acción.");
        window.location.href = "index.html";
        return null;
    }
    return user;
}