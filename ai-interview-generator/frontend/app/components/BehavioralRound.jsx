'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiSkip, FiMic, FiStopCircle } from 'react-icons/fi';
import { useInterviewStore } from '../store/interviewStore';
import { api } from '../utils/api';

export default function BehavioralRound() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [loading, setLoading] = useState(false);
    const [evaluation, setEvaluation] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [recordedAudio, setRecordedAudio] = useState(null);
    const mediaRecorderRef = useRef(null);
    const audioChunksRef = useRef([]);

    const {
        behavioralQuestions,
        setBehavioralQuestions,
        setBehavioralAnswer,
        setBehavioralScore,
    } = useInterviewStore();

    useEffect(() => {
        if (behavioralQuestions.length === 0) {
            generateQuestions();
        }
    }, []);

    const generateQuestions = async () => {
        setLoading(true);
        try {
            const response = await api.generateBehavioralQuestions();
            setBehavioralQuestions(response.questions);
        } catch (error) {
            alert('Failed to generate questions: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
                audioChunksRef.current.push(event.data);
            };

            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64 = reader.result.split(',')[1];
                    setRecordedAudio(base64);
                };
                reader.readAsDataURL(audioBlob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
        } catch (error) {
            alert('Failed to access microphone: ' + error.message);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
        }
    };

    const handleSubmit = async () => {
        if (!recordedAudio) {
            alert('Please record your answer');
            return;
        }

        setLoading(true);
        try {
            const response = await api.evaluateBehavioral(
                behavioralQuestions[currentQuestion],
                recordedAudio
            );
            setEvaluation(response.evaluation);
            setBehavioralScore(currentQuestion, response.evaluation.score);
            setShowResult(true);
        } catch (error) {
            alert('Failed to evaluate answer: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleNext = () => {
        setBehavioralAnswer(currentQuestion, recordedAudio);
        if (currentQuestion < behavioralQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setRecordedAudio(null);
            setShowResult(false);
            setEvaluation(null);
        } else {
            alert('Behavioral round completed!');
        }
    };

    const handleSkip = () => {
        if (currentQuestion < behavioralQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setRecordedAudio(null);
            setShowResult(false);
            setEvaluation(null);
        } else {
            alert('Behavioral round completed!');
        }
    };

    if (loading && behavioralQuestions.length === 0) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-slate-900 to-slate-800">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
                    <p className="text-white text-lg">Generating behavioral questions...</p>
                </div>
            </div>
        );
    }

    if (behavioralQuestions.length === 0) {
        return null;
    }

    const question = behavioralQuestions[currentQuestion];
    const progress = ((currentQuestion + 1) / behavioralQuestions.length) * 100;

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
                            Behavioral Round: Question {currentQuestion + 1}/{behavioralQuestions.length}
                        </h2>
                        <span className="text-pink-400">{progress.toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                        <div
                            className="bg-gradient-to-r from-pink-600 to-rose-600 h-2 rounded-full transition-all duration-300"
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
                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-white mb-4">{question.question}</h3>
                        <div className="bg-gray-900 p-4 rounded-lg">
                            <p className="text-gray-400 text-sm mb-2">Evaluation Criteria:</p>
                            <ul className="text-gray-300 space-y-1">
                                {question.evaluationCriteria?.map((criteria, idx) => (
                                    <li key={idx}>• {criteria}</li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Recording Section */}
                    <div className="mb-8">
                        <p className="text-gray-300 mb-4 font-semibold">Record Your Answer:</p>
                        <div className="bg-gray-900 p-6 rounded-lg border-2 border-dashed border-pink-600">
                            <div className="flex flex-col items-center gap-4">
                                {isRecording ? (
                                    <>
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1] }}
                                            transition={{ duration: 1, repeat: Infinity }}
                                            className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center"
                                        >
                                            <div className="w-12 h-12 bg-red-600 rounded-full"></div>
                                        </motion.div>
                                        <p className="text-white font-semibold">Recording...</p>
                                        <button
                                            onClick={stopRecording}
                                            className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-all"
                                        >
                                            <FiStopCircle /> Stop Recording
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        {recordedAudio ? (
                                            <>
                                                <p className="text-pink-400 font-semibold">✓ Answer recorded</p>
                                                <button
                                                    onClick={startRecording}
                                                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-all"
                                                >
                                                    <FiMic /> Re-record
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <FiMic className="text-4xl text-pink-400" />
                                                <p className="text-white font-semibold">Ready to record</p>
                                                <button
                                                    onClick={startRecording}
                                                    className="bg-pink-600 hover:bg-pink-700 text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 transition-all"
                                                >
                                                    <FiMic /> Start Recording
                                                </button>
                                            </>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Evaluation Result */}
                    {showResult && evaluation && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-pink-900 to-rose-900 p-6 rounded-lg mb-8"
                        >
                            <h4 className="text-lg font-bold text-white mb-4">Evaluation Result</h4>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-gray-800 p-3 rounded">
                                    <p className="text-gray-400 text-sm">Overall Score</p>
                                    <p className="text-3xl font-bold text-pink-400">{evaluation.score}</p>
                                </div>
                                <div className="bg-gray-800 p-3 rounded">
                                    <p className="text-gray-400 text-sm">Communication</p>
                                    <p className="text-2xl font-bold text-pink-400">{evaluation.communicationSkills}</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="bg-gray-800 p-3 rounded">
                                    <p className="text-gray-400 text-sm">Problem Solving</p>
                                    <p className="text-2xl font-bold text-pink-400">{evaluation.problemSolving}</p>
                                </div>
                                <div className="bg-gray-800 p-3 rounded">
                                    <p className="text-gray-400 text-sm">Teamwork</p>
                                    <p className="text-2xl font-bold text-pink-400">{evaluation.teamwork}</p>
                                </div>
                            </div>
                            {evaluation.strengths?.length > 0 && (
                                <div className="bg-gray-800 p-3 rounded mb-4">
                                    <p className="text-gray-400 text-sm mb-2">Strengths:</p>
                                    <ul className="text-gray-300 text-sm space-y-1">
                                        {evaluation.strengths.map((strength, idx) => (
                                            <li key={idx}>✓ {strength}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                            {evaluation.areasForImprovement?.length > 0 && (
                                <div className="bg-gray-800 p-3 rounded">
                                    <p className="text-gray-400 text-sm mb-2">Areas for Improvement:</p>
                                    <ul className="text-gray-300 text-sm space-y-1">
                                        {evaluation.areasForImprovement.map((area, idx) => (
                                            <li key={idx}>→ {area}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        {!showResult ? (
                            <>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading || !recordedAudio}
                                    className="flex-1 bg-pink-600 hover:bg-pink-700 text-white font-bold py-3 px-4 rounded-lg disabled:opacity-50 transition-all"
                                >
                                    Submit Answer
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
                                {currentQuestion < behavioralQuestions.length - 1 ? 'Next Question' : 'Finish Round'}
                            </button>
                        )}
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
}
