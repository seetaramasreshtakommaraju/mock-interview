'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSkip, FiCheck } from 'react-icons/fi';
import { useInterviewStore } from '../store/interviewStore';
import { api } from '../utils/api';

export default function AptitudeRound() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [loading, setLoading] = useState(false);
    const [evaluation, setEvaluation] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const {
        aptitudeQuestions,
        setAptitudeQuestions,
        setAptitudeAnswer,
        setAptitudeScore,
    } = useInterviewStore();

    useEffect(() => {
        if (aptitudeQuestions.length === 0) {
            generateQuestions();
        }
    }, []);

    const generateQuestions = async () => {
        setLoading(true);
        try {
            const response = await api.generateAptitudeQuestions();
            setAptitudeQuestions(response.questions);
        } catch (error) {
            alert('Failed to generate questions: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (selectedAnswer === null) {
            alert('Please select an answer');
            return;
        }

        setLoading(true);
        try {
            const response = await api.evaluateAptitude(
                aptitudeQuestions[currentQuestion],
                selectedAnswer
            );
            setEvaluation(response.evaluation);
            setAptitudeScore(currentQuestion, response.evaluation.score);
            setShowResult(true);
        } catch (error) {
            alert('Failed to evaluate answer: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        setAptitudeAnswer(currentQuestion, selectedAnswer);
        if (currentQuestion < aptitudeQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            setEvaluation(null);
        } else {
            alert('Aptitude round completed!');
        }
    };

    const handleSkip = () => {
        if (currentQuestion < aptitudeQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setShowResult(false);
            setEvaluation(null);
        } else {
            alert('Aptitude round completed!');
        }
    };

    if (loading && aptitudeQuestions.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-white text-lg">Generating aptitude questions...</p>
                </div>
            </div>
        );
    }

    if (aptitudeQuestions.length === 0) {
        return null;
    }

    const question = aptitudeQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / aptitudeQuestions.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-4xl mx-auto"
            >
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-2xl font-bold text-white">
                            Aptitude Round: Question {currentQuestion + 1}/{aptitudeQuestions.length}
                        </h2>
                        <span className="text-blue-400">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                {/* Question Card */}
                <motion.div
                    key={currentQuestion}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gray-800 rounded-xl p-8 border border-gray-700 mb-8"
                >
                    <h3 className="text-2xl font-bold text-white mb-6">{question.question}</h3>

                    {/* Options */}
                    <div className="space-y-3 mb-8">
                        {question.options.map((option, idx) => (
                            <motion.button
                                key={idx}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => !showResult && setSelectedAnswer(idx)}
                                disabled={showResult}
                                className={`w-full p-4 text-left rounded-lg font-semibold transition-all ${selectedAnswer === idx
                                        ? 'bg-blue-600 text-white border-2 border-blue-500'
                                        : 'bg-gray-700 text-gray-200 border-2 border-transparent hover:bg-gray-600'
                                    } ${showResult && idx === question.correctAnswer ? 'bg-green-600 text-white' : ''}
                ${showResult && selectedAnswer === idx && idx !== question.correctAnswer ? 'bg-red-600 text-white' : ''}`}
                            >
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-6 h-6 rounded-full flex items-center justify-center border-2 ${selectedAnswer === idx ? 'border-white' : 'border-gray-400'
                                            }`}
                                    >
                                        {String.fromCharCode(65 + idx)}
                                    </div>
                                    {option}
                                </div>
                            </motion.button>
                        ))}
                    </div>

                    {/* Evaluation Result */}
                    {showResult && evaluation && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 rounded-lg mb-8"
                        >
                            <h4 className="text-lg font-bold text-white mb-3">
                                {evaluation.isCorrect ? '✓ Correct!' : '✗ Incorrect'}
                            </h4>
                            <p className="text-gray-200 mb-3">
                                <span className="font-semibold">Explanation:</span> {evaluation.explanation}
                            </p>
                            <div className="bg-gray-800 p-3 rounded">
                                <p className="text-gray-400 text-sm">Score</p>
                                <p className="text-3xl font-bold text-blue-400">{evaluation.score}</p>
                            </div>
                        </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        {!showResult ? (
                            <>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading || selectedAnswer === null}
                                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50 transition-all"
                                >
                                    <FiCheck /> Submit Answer
                                </button>
                                <button
                                    onClick={handleSkip}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-all"
                                >
                                    <FiSkip /> Skip
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={handleNext}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded-lg transition-all"
                            >
                                {currentQuestion < aptitudeQuestions.length - 1 ? 'Next Question' : 'Finish Round'}
                            </button>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
