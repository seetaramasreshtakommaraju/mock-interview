import { create } from 'zustand';

export const useInterviewStore = create((set) => ({
    // Interview state
    currentRound: null,
    rounds: {
        coding: false,
        aptitude: false,
        technical: false,
        behavioral: false,
    },
    languages: [],
    technologies: [],
    sessionId: null,
    startTime: null,

    // Round-specific state
    codingQuestions: [],
    codingAnswers: {},
    codingScores: {},

    aptitudeQuestions: [],
    aptitudeAnswers: {},
    aptitudeScores: {},

    technicalQuestions: [],
    technicalAnswers: {},
    technicalScores: {},

    behavioralQuestions: [],
    behavioralAnswers: {},
    behavioralScores: {},

    // Actions
    setCurrentRound: (round) => set({ currentRound: round }),
    setRounds: (rounds) => set({ rounds }),
    setLanguages: (languages) => set({ languages }),
    setTechnologies: (technologies) => set({ technologies }),
    setSessionId: (id) => set({ sessionId: id }),
    setStartTime: (time) => set({ startTime: time }),

    // Coding actions
    setCodingQuestions: (questions) => set({ codingQuestions: questions }),
    setCodingAnswer: (questionId, answer) =>
        set((state) => ({
            codingAnswers: { ...state.codingAnswers, [questionId]: answer },
        })),
    setCodingScore: (questionId, score) =>
        set((state) => ({
            codingScores: { ...state.codingScores, [questionId]: score },
        })),

    // Aptitude actions
    setAptitudeQuestions: (questions) => set({ aptitudeQuestions: questions }),
    setAptitudeAnswer: (questionId, answer) =>
        set((state) => ({
            aptitudeAnswers: { ...state.aptitudeAnswers, [questionId]: answer },
        })),
    setAptitudeScore: (questionId, score) =>
        set((state) => ({
            aptitudeScores: { ...state.aptitudeScores, [questionId]: score },
        })),

    // Technical actions
    setTechnicalQuestions: (questions) => set({ technicalQuestions: questions }),
    setTechnicalAnswer: (questionId, answer) =>
        set((state) => ({
            technicalAnswers: { ...state.technicalAnswers, [questionId]: answer },
        })),
    setTechnicalScore: (questionId, score) =>
        set((state) => ({
            technicalScores: { ...state.technicalScores, [questionId]: score },
        })),

    // Behavioral actions
    setBehavioralQuestions: (questions) => set({ behavioralQuestions: questions }),
    setBehavioralAnswer: (questionId, answer) =>
        set((state) => ({
            behavioralAnswers: { ...state.behavioralAnswers, [questionId]: answer },
        })),
    setBehavioralScore: (questionId, score) =>
        set((state) => ({
            behavioralScores: { ...state.behavioralScores, [questionId]: score },
        })),

    // Reset store
    resetInterview: () => set({
        currentRound: null,
        rounds: { coding: false, aptitude: false, technical: false, behavioral: false },
        languages: [],
        technologies: [],
        sessionId: null,
        startTime: null,
        codingQuestions: [],
        codingAnswers: {},
        codingScores: {},
        aptitudeQuestions: [],
        aptitudeAnswers: {},
        aptitudeScores: {},
        technicalQuestions: [],
        technicalAnswers: {},
        technicalScores: {},
        behavioralQuestions: [],
        behavioralAnswers: {},
        behavioralScores: {},
    }),
}));
