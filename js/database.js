// Firebase Database Operations Module
// CRUD operations for all database entities

import { db } from './firebase-config.js';
import { ref, set, get, update, remove, query, orderByChild, equalTo, push } from "https://www.gstatic.com/firebasejs/12.19.0/firebase-database.js";

// ===================== CANDIDATES =====================

/**
 * Update candidate profile
 * @param {string} enrollmentNumber - Candidate enrollment number
 * @param {Object} updates - Fields to update
 * @returns {Promise} Update result
 */
export async function updateCandidateProfile(enrollmentNumber, updates) {
    try {
        await update(ref(db, `candidates/${enrollmentNumber}`), updates);
        return { success: true, message: 'Profile updated successfully' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

/**
 * Get all candidates
 * @returns {Promise} List of candidates
 */
export async function getAllCandidates() {
    try {
        const snapshot = await get(ref(db, 'candidates'));
        const candidates = [];
        snapshot.forEach((child) => {
            candidates.push({
                enrollmentNumber: child.key,
                ...child.val()
            });
        });
        return candidates;
    } catch (error) {
        console.error('Error fetching candidates:', error);
        return [];
    }
}

/**
 * Get candidates by batch
 * @param {string} batch - Batch name
 * @returns {Promise} Candidates in batch
 */
export async function getCandidatesByBatch(batch) {
    try {
        const candidates = await getAllCandidates();
        return candidates.filter(c => c.batch === batch);
    } catch (error) {
        console.error('Error fetching batch candidates:', error);
        return [];
    }
}

// ===================== BATCHES =====================

/**
 * Create a new batch
 * @param {Object} batchData - Batch information
 * @returns {Promise} Creation result
 */
export async function createBatch(batchData) {
    try {
        const batchId = `BATCH${new Date().getTime()}`;
        await set(ref(db, `batches/${batchId}`), {
            batchId: batchId,
            name: batchData.name,
            examDate: batchData.examDate,
            examTime: batchData.examTime,
            shift: batchData.shift,
            capacity: batchData.capacity,
            centerCode: batchData.centerCode,
            createdAt: new Date().toISOString(),
            status: 'active'
        });
        return { success: true, batchId: batchId };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

/**
 * Get all batches
 * @returns {Promise} List of batches
 */
export async function getAllBatches() {
    try {
        const snapshot = await get(ref(db, 'batches'));
        const batches = [];
        snapshot.forEach((child) => {
            batches.push({
                ...child.val()
            });
        });
        return batches;
    } catch (error) {
        console.error('Error fetching batches:', error);
        return [];
    }
}

/**
 * Allocate candidate to batch
 * @param {string} enrollmentNumber - Candidate enrollment
 * @param {string} batchId - Batch ID
 * @returns {Promise} Allocation result
 */
export async function allocateCandidateToBatch(enrollmentNumber, batchId) {
    try {
        await update(ref(db, `candidates/${enrollmentNumber}`), {
            batch: batchId
        });
        return { success: true, message: 'Candidate allocated to batch' };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// ===================== EXAMS =====================

/**
 * Get exam by ID
 * @param {string} examId - Exam ID
 * @returns {Promise} Exam data
 */
export async function getExam(examId) {
    try {
        const snapshot = await get(ref(db, `exams/${examId}`));
        return snapshot.val();
    } catch (error) {
        console.error('Error fetching exam:', error);
        return null;
    }
}

/**
 * Get all questions for exam
 * @param {string} examId - Exam ID
 * @returns {Promise} Questions list
 */
export async function getExamQuestions(examId) {
    try {
        const snapshot = await get(ref(db, `questions`));
        const questions = [];
        snapshot.forEach((child) => {
            if (child.val().examId === examId) {
                questions.push({
                    questionId: child.key,
                    ...child.val()
                });
            }
        });
        return questions;
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
}

/**
 * Submit exam answers
 * @param {string} enrollmentNumber - Candidate enrollment
 * @param {string} examId - Exam ID
 * @param {Object} answers - Candidate answers
 * @returns {Promise} Submission result
 */
export async function submitExamAnswers(enrollmentNumber, examId, answers) {
    try {
        const resultId = `RESULT${new Date().getTime()}`;
        await set(ref(db, `results/${resultId}`), {
            resultId: resultId,
            enrollmentNumber: enrollmentNumber,
            examId: examId,
            answers: answers,
            submittedAt: new Date().toISOString(),
            status: 'submitted',
            score: null,
            evaluated: false
        });
        return { success: true, resultId: resultId };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

// ===================== RESULTS =====================

/**
 * Get candidate results
 * @param {string} enrollmentNumber - Candidate enrollment
 * @returns {Promise} Results list
 */
export async function getCandidateResults(enrollmentNumber) {
    try {
        const snapshot = await get(ref(db, 'results'));
        const results = [];
        snapshot.forEach((child) => {
            if (child.val().enrollmentNumber === enrollmentNumber) {
                results.push({
                    ...child.val()
                });
            }
        });
        return results;
    } catch (error) {
        console.error('Error fetching results:', error);
        return [];
    }
}

// ===================== INTERVIEWS =====================

/**
 * Schedule interview
 * @param {string} enrollmentNumber - Candidate enrollment
 * @param {Object} scheduleData - Interview schedule details
 * @returns {Promise} Scheduling result
 */
export async function scheduleInterview(enrollmentNumber, scheduleData) {
    try {
        const interviewId = `INTERVIEW${new Date().getTime()}`;
        await set(ref(db, `interviews/${interviewId}`), {
            interviewId: interviewId,
            enrollmentNumber: enrollmentNumber,
            date: scheduleData.date,
            time: scheduleData.time,
            round: scheduleData.round,
            panel: scheduleData.panel,
            status: 'scheduled',
            createdAt: new Date().toISOString()
        });
        
        // Update candidate interview status
        await update(ref(db, `candidates/${enrollmentNumber}`), {
            interviewStatus: 'scheduled'
        });

        return { success: true, interviewId: interviewId };
    } catch (error) {
        return { success: false, message: error.message };
    }
}

/**
 * Get candidate interview
 * @param {string} enrollmentNumber - Candidate enrollment
 * @returns {Promise} Interview data
 */
export async function getCandidateInterview(enrollmentNumber) {
    try {
        const snapshot = await get(ref(db, 'interviews'));
        let interview = null;
        snapshot.forEach((child) => {
            if (child.val().enrollmentNumber === enrollmentNumber) {
                interview = child.val();
            }
        });
        return interview;
    } catch (error) {
        console.error('Error fetching interview:', error);
        return null;
    }
}
