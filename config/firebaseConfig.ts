import { initializeApp, cert, ServiceAccount } from "firebase-admin/app";
import { getFirestore, Firestore } from "firebase-admin/firestore";
// Replace with your actual service account file name
import serviceAccount from "../demo3-180ea-firebase-adminsdk-fbsvc-248cdff4ce.json";

// Initialize the Firebase app with the service account credentials
initializeApp({
    credential: cert(serviceAccount as ServiceAccount),
});

// Get a reference to the Firestore service
const db: Firestore = getFirestore();

export { db };