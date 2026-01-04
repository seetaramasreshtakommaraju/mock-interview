'use client';

import { useState, useEffect } from 'react';
import { useInterviewStore } from './store/interviewStore';
import RoundSelector from './components/RoundSelector';
import CodingRound from './components/CodingRound';
import AptitudeRound from './components/AptitudeRound';
import TechnicalRound from './components/TechnicalRound';
import BehavioralRound from './components/BehavioralRound';

export default function Home() {
    const { currentRound } = useInterviewStore();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    if (!currentRound) {
        return <RoundSelector />;
    }

    switch (currentRound) {
        case 'coding':
            return <CodingRound />;
        case 'aptitude':
            return <AptitudeRound />;
        case 'technical':
            return <TechnicalRound />;
        case 'behavioral':
            return <BehavioralRound />;
        default:
            return <RoundSelector />;
    }
}
