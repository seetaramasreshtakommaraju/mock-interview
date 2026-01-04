'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiSkip, FiCheck } from 'react-icons/fi';
import { useInterviewStore } from '../store/interviewStore';
import { api } from '../utils/api';

export default function CodingRound() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('python');
    const [loading, setLoading] = useState(false);
    const [evaluation, setEvaluation] = useState(null);
    const [showResult, setShowResult] = useState(false);

    const {
        codingQuestions,
        setCodingQuestions,
        setCodingAnswer,
        setCodingScore,
        languages,
    } = useInterviewStore();

    useEffect(() => {
        if (codingQuestions.length === 0 && languages.length > 0) {
            generateQuestions();
        }
    }, []);

    const generateQuestions = async () => {
        setLoading(true);
        try {
            const response = await api.generateCodingQuestions(languages, ['General']);
            setCodingQuestions(response.questions);
        } catch (error) {
            alert('Failed to generate questions: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async () => {
        if (!code.trim()) {
            alert('Please enter your code');
            return;
        }

        setLoading(true);
        try {
            const response = await api.evaluateCoding(
                codingQuestions[currentQuestion],
                code,
                language
            );
            setEvaluation(response.evaluation);
            setCodingScore(currentQuestion, response.evaluation.score);
            setShowResult(true);
        } catch (error) {
            alert('Failed to evaluate code: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        setCodingAnswer(currentQuestion, code);
        if (currentQuestion < codingQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setCode('');
            setShowResult(false);
            setEvaluation(null);
        } else {
            alert('Coding round completed!');
        }
    };

    const handleSkip = () => {
        if (currentQuestion < codingQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setCode('');
            setShowResult(false);
            setEvaluation(null);
        } else {
            alert('Coding round completed!');
        }
    };

    if (loading && codingQuestions.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                    <p className="text-white text-lg">Generating coding questions...</p>
                </div>
            </div>
        );
    }

    if (codingQuestions.length === 0) {
        return null;
    }

    const question = codingQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / codingQuestions.length) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-8">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="max-w-7xl mx-auto"
            >
                {/* Progress Bar */}
                <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                        <h2 className="text-2xl font-bold text-white">
                            Coding Round: Question {currentQuestion + 1}/{codingQuestions.length}
                        </h2>
                        <span className="text-purple-400">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Question Panel */}
                    <div className="lg:col-span-1">
                        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700 h-full">
                            <h3 className="text-xl font-bold text-white mb-4">{question.title}</h3>
                            <p className="text-gray-300 mb-4">{question.description}</p>

                            {question.examples && (
                                <div className="mb-4">
                                    <h4 className="font-bold text-white mb-2">Examples:</h4>
                                    {question.examples.map((ex, idx) => (
                                        <div key={idx} className="bg-gray-900 p-3 rounded mb-2 text-sm text-gray-300">
                                            <p>Input: {ex.input}</p>
                                            <p>Output: {ex.output}</p>
                                        </div>
                                    ))}
                                </div>
                            )}

                            {question.constraints && (
                                <div>
                                    <h4 className="font-bold text-white mb-2">Constraints:</h4>
                                    <ul className="text-sm text-gray-300 space-y-1">
                                        {question.constraints.map((c, idx) => (
                                            <li key={idx}>• {c}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Code Editor */}
                    <div className="lg:col-span-2">
                        <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700">
                            {/* Language Selector */}
                            <div className="bg-gray-900 p-4 border-b border-gray-700 flex gap-2">
                                {['python', 'javascript', 'java', 'cpp'].map((lang) => (
                                    <button
                                        key={lang}
                                        onClick={() => setLanguage(lang)}
                                        className={`px-3 py-1 rounded font-semibold transition-all ${language === lang
                                                ? 'bg-purple-600 text-white'
                                                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                            }`}
                                    >
                                        {lang.toUpperCase()}
                                    </button>
                                ))}
                            </div>

                            {/* Code Editor */}
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="Write your code here..."
                                className="w-full h-96 bg-gray-900 text-gray-100 p-4 font-mono resize-none focus:outline-none"
                                disabled={showResult}
                            />

                            {/* Evaluation Result */}
                            {showResult && evaluation && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="bg-gradient-to-r from-blue-900 to-purple-900 p-6 border-t border-gray-700"
                                >
                                    <h4 className="text-xl font-bold text-white mb-4">Evaluation Result</h4>
                                    <div className="grid grid-cols-2 gap-4 mb-4">
                                        <div className="bg-gray-800 p-3 rounded">
                                            <p className="text-gray-400 text-sm">Score</p>
                                            <p className="text-3xl font-bold text-purple-400">{evaluation.score}</p>
                                        </div>
                                        <div className="bg-gray-800 p-3 rounded">
                                            <p className="text-gray-400 text-sm">Correctness</p>
                                            <p className="text-white">{evaluation.correctness}</p>
                                        </div>
                                    </div>
                                    <div className="bg-gray-800 p-3 rounded mb-4">
                                        <p className="text-gray-400 text-sm mb-2">Time Complexity</p>
                                        <p className="text-white">{evaluation.timeComplexity}</p>
                                    </div>
                                    <div className="bg-gray-800 p-3 rounded mb-4">
                                        <p className="text-gray-400 text-sm mb-2">Improvements</p>
                                        <ul className="text-gray-300 text-sm space-y-1">
                                            {evaluation.improvements?.map((imp, idx) => (
                                                <li key={idx}>• {imp}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>
                            )}

                            {/* Action Buttons */}
                            <div className="bg-gray-900 p-4 border-t border-gray-700 flex gap-3">
                                {!showResult ? (
                                    <>
                                        <button
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 disabled:opacity-50"
                                        >
                                            <FiCheck /> Submit
                                        </button>
                                        <button
                                            onClick={handleSkip}
                                            className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2"
                                        >
                                            <FiSkip /> Skip
                                        </button>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleNext}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-lg"
                                    >
                                        {currentQuestion < codingQuestions.length - 1 ? 'Next Question' : 'Finish Round'}
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
