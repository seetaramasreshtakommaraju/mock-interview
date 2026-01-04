'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBrain, FaVideo, FaMicrophone } from 'react-icons/fa';
import { useInterviewStore } from '../store/interviewStore';
import { api } from '../utils/api';

export default function RoundSelector() {
    const [selectedRounds, setSelectedRounds] = useState({
        coding: false,
        aptitude: false,
        technical: false,
        behavioral: false,
    });
    const [languages, setLanguages] = useState([]);
    const [technologies, setTechnologies] = useState([]);
    const [loading, setLoading] = useState(false);

    const { setCurrentRound, setRounds, setLanguages: storeLanguages, setTechnologies: storeTechnologies } = useInterviewStore();

    const rounds = [
        { id: 'coding', title: 'Coding Round', icon: FaCode, description: '5 LeetCode-style questions' },
        { id: 'aptitude', title: 'Aptitude Round', icon: FaBrain, description: '10 multiple-choice questions' },
        { id: 'technical', title: 'Technical Round', icon: FaVideo, description: '5 video-based questions' },
        { id: 'behavioral', title: 'Behavioral Round', icon: FaMicrophone, description: '3 behavioral questions' },
    ];

    const commonLanguages = ['Python', 'JavaScript', 'Java', 'C++', 'Go', 'Rust'];
    const commonTechnologies = ['React', 'Node.js', 'SQL', 'MongoDB', 'AWS', 'Docker', 'Kubernetes', 'GraphQL'];

    const toggleRound = (roundId) => {
        setSelectedRounds(prev => ({
            ...prev,
            [roundId]: !prev[roundId]
        }));
    };

    const toggleLanguage = (lang) => {
        setLanguages(prev =>
            prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
        );
    };

    const toggleTechnology = (tech) => {
        setTechnologies(prev =>
            prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]
        );
    };

    const handleStartInterview = async () => {
        if (!Object.values(selectedRounds).some(v => v)) {
            alert('Please select at least one round');
            return;
        }
        if (languages.length === 0) {
            alert('Please select at least one programming language');
            return;
        }
        if (technologies.length === 0) {
            alert('Please select at least one technology');
            return;
        }

        setLoading(true);
        try {
            const response = await api.startInterview({
                languages,
                technologies,
                rounds: selectedRounds,
            });

            storeLanguages(languages);
            storeTechnologies(technologies);
            setRounds(selectedRounds);

            // Start with first selected round
            const firstRound = Object.entries(selectedRounds).find(([_, selected]) => selected)?.[0];
            setCurrentRound(firstRound);
        } catch (error) {
            alert('Failed to start interview: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-6xl mx-auto"
            >
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-4">
                        AI Mock Interview Generator
                    </h1>
                    <p className="text-lg text-gray-300">
                        Select your interview rounds and technical skills to begin
                    </p>
                </div>

                {/* Rounds Selection */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Select Interview Rounds</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {rounds.map(({ id, title, icon: Icon, description }) => (
                            <motion.button
                                key={id}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => toggleRound(id)}
                                className={`p-6 rounded-xl border-2 transition-all ${selectedRounds[id]
                                        ? 'border-purple-500 bg-purple-500/10'
                                        : 'border-gray-600 bg-gray-800/30'
                                    }`}
                            >
                                <Icon className="text-3xl mb-3 mx-auto" />
                                <h3 className="font-bold text-white">{title}</h3>
                                <p className="text-sm text-gray-400 mt-2">{description}</p>
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Languages Selection */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Select Programming Languages</h2>
                    <div className="flex flex-wrap gap-3">
                        {commonLanguages.map((lang) => (
                            <motion.button
                                key={lang}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => toggleLanguage(lang)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all ${languages.includes(lang)
                                        ? 'bg-blue-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                {lang}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Technologies Selection */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6">Select Technologies</h2>
                    <div className="flex flex-wrap gap-3">
                        {commonTechnologies.map((tech) => (
                            <motion.button
                                key={tech}
                                whileHover={{ scale: 1.05 }}
                                onClick={() => toggleTechnology(tech)}
                                className={`px-4 py-2 rounded-lg font-semibold transition-all ${technologies.includes(tech)
                                        ? 'bg-pink-600 text-white'
                                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                    }`}
                            >
                                {tech}
                            </motion.button>
                        ))}
                    </div>
                </div>

                {/* Start Button */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleStartInterview}
                    disabled={loading}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold text-lg rounded-xl hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all"
                >
                    {loading ? 'Starting Interview...' : 'Start Interview'}
                </motion.button>
            </motion.div>
        </div>
    );
}
