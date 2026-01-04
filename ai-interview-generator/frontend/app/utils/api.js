// Mock question data
const mockCodingQuestions = [
    {
        id: 1,
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.",
        examples: [
            { input: "nums = [2,7,11,15], target = 9", output: "[0,1]" },
            { input: "nums = [3,2,4], target = 6", output: "[1,2]" }
        ],
        constraints: "2 <= nums.length <= 104\n-109 <= nums[i] <= 109",
        difficulty: "Easy"
    },
    {
        id: 2,
        title: "Reverse String",
        description: "Write a function that reverses a string. The input string is given as an array of characters.",
        examples: [
            { input: "s = ['h','e','l','l','o']", output: "['o','l','l','e','h']" }
        ],
        constraints: "1 <= s.length <= 105",
        difficulty: "Easy"
    },
    {
        id: 3,
        title: "Longest Substring Without Repeating Characters",
        description: "Given a string s, find the length of the longest substring without repeating characters.",
        examples: [
            { input: "s = 'abcabcbb'", output: "3" },
            { input: "s = 'bbbbb'", output: "1" }
        ],
        constraints: "0 <= s.length <= 5 * 104",
        difficulty: "Medium"
    },
    {
        id: 4,
        title: "Binary Search",
        description: "Given a sorted array of integers and a target value, return the index of the target if found, else return -1.",
        examples: [
            { input: "nums = [-1,0,3,5,9,12], target = 9", output: "4" }
        ],
        constraints: "1 <= nums.length <= 104",
        difficulty: "Medium"
    },
    {
        id: 5,
        title: "Merge Two Sorted Lists",
        description: "You are given the heads of two sorted linked lists. Merge them into one sorted list.",
        examples: [
            { input: "list1 = [1,2,4], list2 = [1,3,4]", output: "[1,1,2,3,4,4]" }
        ],
        constraints: "The number of nodes in both lists is in the range [0, 50]",
        difficulty: "Medium"
    }
];

const mockAptitudeQuestions = [
    {
        id: 1,
        question: "What is 15% of 200?",
        options: ["25", "30", "35", "40"],
        correctOption: 1,
        explanation: "15% of 200 = 0.15 × 200 = 30"
    },
    {
        id: 2,
        question: "If a train travels at 60 km/h, how long will it take to cover 150 km?",
        options: ["2 hours", "2.5 hours", "3 hours", "3.5 hours"],
        correctOption: 1,
        explanation: "Time = Distance / Speed = 150 / 60 = 2.5 hours"
    },
    {
        id: 3,
        question: "What is the square root of 256?",
        options: ["14", "15", "16", "17"],
        correctOption: 2,
        explanation: "√256 = 16, as 16 × 16 = 256"
    },
    {
        id: 4,
        question: "If 3 books cost $45, what is the cost of 7 books?",
        options: ["$95", "$100", "$105", "$110"],
        correctOption: 2,
        explanation: "Cost per book = 45/3 = $15. Cost of 7 books = 15 × 7 = $105"
    },
    {
        id: 5,
        question: "What is 0.5 × 0.5?",
        options: ["0.20", "0.25", "0.30", "0.35"],
        correctOption: 1,
        explanation: "0.5 × 0.5 = 0.25"
    },
    {
        id: 6,
        question: "Find the missing number: 2, 4, 6, 8, __",
        options: ["9", "10", "11", "12"],
        correctOption: 1,
        explanation: "This is an arithmetic sequence with a common difference of 2. Next number is 8 + 2 = 10"
    },
    {
        id: 7,
        question: "If A > B and B > C, then which is true?",
        options: ["C > A", "A > C", "B > A", "A = C"],
        correctOption: 1,
        explanation: "By transitivity, if A > B and B > C, then A > C"
    },
    {
        id: 8,
        question: "What is 25% of 400?",
        options: ["75", "100", "125", "150"],
        correctOption: 1,
        explanation: "25% of 400 = 0.25 × 400 = 100"
    },
    {
        id: 9,
        question: "If a rectangle has length 10 and width 5, what is its area?",
        options: ["15", "30", "50", "100"],
        correctOption: 2,
        explanation: "Area = length × width = 10 × 5 = 50"
    },
    {
        id: 10,
        question: "What is the average of 10, 20, 30, 40?",
        options: ["20", "25", "30", "35"],
        correctOption: 2,
        explanation: "Average = (10 + 20 + 30 + 40) / 4 = 100 / 4 = 25"
    }
];

const mockTechnicalQuestions = [
    {
        id: 1,
        question: "Explain the difference between SQL and NoSQL databases and when you would use each.",
        keyPoints: ["SQL: Structured, ACID, relational", "NoSQL: Flexible schema, scalable", "Use SQL for transactions, NoSQL for big data"]
    },
    {
        id: 2,
        question: "What are microservices and what are the advantages of using them?",
        keyPoints: ["Independent services", "Scalability", "Fault isolation", "Technology diversity", "Easier deployment"]
    },
    {
        id: 3,
        question: "Explain the concept of REST API and how it works.",
        keyPoints: ["Representational State Transfer", "HTTP methods (GET, POST, PUT, DELETE)", "Stateless communication", "Resource-based"]
    },
    {
        id: 4,
        question: "What is Docker and how does it differ from Virtual Machines?",
        keyPoints: ["Containerization", "Lightweight", "Faster startup", "Less resource overhead than VMs", "Isolation"]
    },
    {
        id: 5,
        question: "Explain the concept of caching and its importance in web applications.",
        keyPoints: ["Stores frequently accessed data", "Improves performance", "Reduces database load", "Types: in-memory, browser, HTTP caching"]
    }
];

const mockBehavioralQuestions = [
    {
        id: 1,
        question: "Tell me about a time when you had to solve a difficult problem. How did you approach it?"
    },
    {
        id: 2,
        question: "Describe a situation where you had to work with someone you didn't get along with. How did you handle it?"
    },
    {
        id: 3,
        question: "Tell me about your biggest failure and what you learned from it."
    }
];

// Mock evaluation responses
const generateMockEvaluation = (type, code, language) => {
    const hasCode = code && code.trim().length > 10;
    const score = hasCode ? Math.floor(Math.random() * 40) + 60 : Math.floor(Math.random() * 30) + 20;

    return {
        score: score,
        feedback: hasCode
            ? `Your ${language} solution demonstrates understanding of the problem. Consider optimizing for time complexity.`
            : "Your solution needs more work. Make sure to handle edge cases.",
        timeComplexity: hasCode ? "O(n)" : "Not analyzed",
        spaceComplexity: hasCode ? "O(1)" : "Not analyzed",
        suggestions: [
            "Add error handling",
            "Improve code comments",
            "Consider edge cases"
        ]
    };
};

const generateMockCodingQuestions = (languages, technologies) => {
    // Shuffle and return random subset
    return {
        questions: mockCodingQuestions.map(q => ({
            ...q,
            language: languages[0] || 'python'
        }))
    };
};

const generateMockAptitudeQuestions = () => {
    return {
        questions: mockAptitudeQuestions
    };
};

const generateMockTechnicalQuestions = (technologies) => {
    return {
        questions: mockTechnicalQuestions
    };
};

const generateMockBehavioralQuestions = () => {
    return {
        questions: mockBehavioralQuestions
    };
};

// Simple text-based answer evaluation
const evaluateAnswer = (answer, type) => {
    const answerLength = answer ? answer.trim().length : 0;
    const hasKeywords = answer && (
        answer.toLowerCase().includes('algorithm') ||
        answer.toLowerCase().includes('approach') ||
        answer.toLowerCase().includes('solution') ||
        answer.toLowerCase().includes('error') ||
        answer.toLowerCase().includes('handling')
    );

    let score = Math.floor(answerLength / 10);
    if (hasKeywords) score += 20;
    score = Math.min(100, score);

    return {
        score: Math.max(30, score),
        feedback: answer && answer.length > 20
            ? "Good effort! Your answer shows understanding. Keep practicing to refine your approach."
            : "Your answer is too brief. Provide more detail and structure your response.",
        strengths: ["Communication", "Clarity"],
        improvements: ["Detail", "Technical depth"]
    };
};

// Export mock API
export const api = {
    // Interview endpoints - return mock data
    startInterview: (config) =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve({ sessionId: 'mock-' + Date.now() });
            }, 500);
        }),

    generateCodingQuestions: (languages, technologies) =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(generateMockCodingQuestions(languages, technologies));
            }, 800);
        }),

    generateAptitudeQuestions: () =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(generateMockAptitudeQuestions());
            }, 600);
        }),

    generateTechnicalQuestions: (technologies) =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(generateMockTechnicalQuestions(technologies));
            }, 600);
        }),

    generateBehavioralQuestions: () =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(generateMockBehavioralQuestions());
            }, 600);
        }),

    // Evaluation endpoints - return mock evaluations
    evaluateCoding: (question, code, language) =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(generateMockEvaluation('coding', code, language));
            }, 1000);
        }),

    evaluateAptitude: (question, selectedOption) =>
        new Promise(resolve => {
            setTimeout(() => {
                const isCorrect = selectedOption === question.correctOption;
                resolve({
                    score: isCorrect ? 100 : 0,
                    isCorrect: isCorrect,
                    correctOption: question.correctOption,
                    explanation: question.explanation
                });
            }, 500);
        }),

    evaluateTechnical: (question, audioData) =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve(evaluateAnswer("Mock transcribed answer about " + question.question, 'technical'));
            }, 2000);
        }),

    evaluateBehavioral: (question, audioData) =>
        new Promise(resolve => {
            setTimeout(() => {
                resolve({
                    score: Math.floor(Math.random() * 40) + 60,
                    feedback: "Good response. Work on being more concise and structured.",
                    communication: Math.floor(Math.random() * 30) + 70,
                    teamwork: Math.floor(Math.random() * 30) + 70,
                    problemSolving: Math.floor(Math.random() * 30) + 70
                });
            }, 2000);
        }),
};
