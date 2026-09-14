// Firebase Authentication Module
// Handles candidate and admin authentication

import { auth, db } from './firebase-config.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.19.0/firebase-auth.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

/**
 * Register a new candidate
 * @param {Object} candidateData - Candidate information
 * @returns {Promise} Registration result
 */
export async function registerCandidate(candidateData) {
    try {
        // Create Firebase Authentication user
        const userCredential = await createUserWithEmailAndPassword(
            auth,
            candidateData.email,
            candidateData.password
        );

        const uid = userCredential.user.uid;

        // Generate unique registration number
        const registrationNumber = `REG${new Date().getFullYear()}${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;

        // Save candidate profile to database
        await set(ref(db, `candidates/${registrationNumber}`), {
            uid: uid,
            enrollmentNumber: registrationNumber,
            name: candidateData.name,
            email: candidateData.email,
            phone: candidateData.phone,
            photo: null,
            registrationDate: new Date().toISOString(),
            batch: null,
            examDate: null,
            examShift: null,
            status: 'registered',
            interviewStatus: 'pending',
            score: null
        });

        return {
            success: true,
            uid: uid,
            registrationNumber: registrationNumber,
            message: `Successfully registered with enrollment number: ${registrationNumber}`
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

/**
 * Candidate Login
 * @param {string} email - Candidate email
 * @param {string} password - Candidate password
 * @returns {Promise} Login result
 */
export async function loginCandidate(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return {
            success: true,
            uid: userCredential.user.uid,
            email: userCredential.user.email
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

/**
 * Get candidate profile by UID
 * @param {string} uid - User ID
 * @returns {Promise} Candidate data
 */
export async function getCandidateProfile(uid) {
    try {
        const snapshot = await get(ref(db, 'candidates'));
        let candidateData = null;

        snapshot.forEach((child) => {
            if (child.val().uid === uid) {
                candidateData = {
                    enrollmentNumber: child.key,
                    ...child.val()
                };
            }
        });

        return candidateData;
    } catch (error) {
        console.error('Error fetching candidate profile:', error);
        return null;
    }
}

/**
 * Admin Login
 * @param {string} email - Admin email
 * @param {string} password - Admin password
 * @returns {Promise} Login result
 */
export async function loginAdmin(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        
        // Verify if user is admin
        const adminRef = ref(db, `admins/${userCredential.user.uid}`);
        const snapshot = await get(adminRef);

        if (!snapshot.exists()) {
            await signOut(auth);
            return {
                success: false,
                message: 'You do not have admin access'
            };
        }

        return {
            success: true,
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            role: snapshot.val().role
        };
    } catch (error) {
        return {
            success: false,
            message: error.message
        };
    }
}

/**
 * Logout user
 * @returns {Promise} Logout result
 */
export async function logout() {
    try {
        await signOut(auth);
        return { success: true };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

/**
 * Monitor authentication state
 * @param {Function} callback - Function to call when auth state changes
 * @returns {Function} Unsubscribe function
 */
export function onAuthChange(callback) {
    return onAuthStateChanged(auth, callback);
}

/**
 * Check if user is logged in
 * @returns {Promise} Current user or null
 */
export function getCurrentUser() {
    return new Promise((resolve) => {
        onAuthStateChanged(auth, (user) => {
            resolve(user);
        });
    });
}
