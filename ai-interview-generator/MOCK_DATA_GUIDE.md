# Mock Data Guide

## Where Is The Mock Data?

**File**: `frontend/app/utils/api.js`

This file contains:
- 5 mock coding questions
- 10 mock aptitude questions  
- 5 mock technical questions
- 3 mock behavioral questions
- Mock evaluation functions for each round

## Coding Questions (5 Total)

### Question 1: Two Sum
**Difficulty**: Easy
**Topics**: Array, Hash Table
**Example**: 
- Input: `nums = [2,7,11,15], target = 9`
- Output: `[0,1]`

### Question 2: Reverse String
**Difficulty**: Easy
**Topics**: String, Two Pointers
**Example**:
- Input: `s = ['h','e','l','l','o']`
- Output: `['o','l','l','e','h']`

### Question 3: Longest Substring Without Repeating Characters
**Difficulty**: Medium
**Topics**: String, Sliding Window, Hash Table
**Example**:
- Input: `s = 'abcabcbb'`
- Output: `3`

### Question 4: Binary Search
**Difficulty**: Medium
**Topics**: Array, Binary Search
**Example**:
- Input: `nums = [-1,0,3,5,9,12], target = 9`
- Output: `4`

### Question 5: Merge Two Sorted Lists
**Difficulty**: Medium
**Topics**: Linked List, Recursion, Two Pointers
**Example**:
- Input: `list1 = [1,2,4], list2 = [1,3,4]`
- Output: `[1,1,2,3,4,4]`

---

## Aptitude Questions (10 Total)

### Question 1: Percentage
- What is 15% of 200? → Answer: 30

### Question 2: Time & Distance
- Train travels 60 km/h, covers 150 km, time needed? → Answer: 2.5 hours

### Question 3: Square Root
- Square root of 256? → Answer: 16

### Question 4: Proportions
- 3 books cost $45, cost of 7 books? → Answer: $105

### Question 5: Decimal Multiplication
- 0.5 × 0.5 = ? → Answer: 0.25

### Question 6: Number Pattern
- 2, 4, 6, 8, __ ? → Answer: 10

### Question 7: Logic
- If A > B and B > C, then? → Answer: A > C

### Question 8: Another Percentage
- 25% of 400? → Answer: 100

### Question 9: Area Calculation
- Rectangle: length 10, width 5, area? → Answer: 50

### Question 10: Average
- Average of 10, 20, 30, 40? → Answer: 25

---

## Technical Questions (5 Total)

### Question 1: Databases
"Explain the difference between SQL and NoSQL databases"
- **Key Points Expected**:
  - SQL: Structured, ACID, relational
  - NoSQL: Flexible schema, scalable
  - When to use each

### Question 2: Architecture
"What are microservices and advantages?"
- **Key Points Expected**:
  - Independent services
  - Scalability
  - Fault isolation
  - Technology diversity
  - Easier deployment

### Question 3: APIs
"Explain REST API and how it works"
- **Key Points Expected**:
  - Representational State Transfer
  - HTTP methods (GET, POST, PUT, DELETE)
  - Stateless communication
  - Resource-based architecture

### Question 4: Containers
"What is Docker and differs from VMs?"
- **Key Points Expected**:
  - Containerization
  - Lightweight
  - Faster startup
  - Less resource overhead
  - Isolation

### Question 5: Performance
"Explain caching and its importance"
- **Key Points Expected**:
  - Stores frequently accessed data
  - Improves performance
  - Reduces database load
  - Types: in-memory, browser, HTTP

---

## Behavioral Questions (3 Total)

### Question 1: Problem Solving
"Tell me about a time when you had to solve a difficult problem. How did you approach it?"
- **Scoring**: Based on answer length and depth
- **Metrics**: Communication, Problem-solving approach

### Question 2: Collaboration
"Describe a situation where you had to work with someone you didn't get along with. How did you handle it?"
- **Scoring**: Based on conflict resolution shown
- **Metrics**: Teamwork, Communication

### Question 3: Learning
"Tell me about your biggest failure and what you learned from it."
- **Scoring**: Based on self-awareness and growth
- **Metrics**: Learning attitude, Resilience

---

## How Scoring Works

### Coding Round
```javascript
Score Calculation:
- Base score for non-empty code: 20-100 (random)
- Bonus for longer, more detailed code: +20-40
- Final: 20-100 range
```

**Feedback Includes**:
- Overall score
- Time complexity analysis
- Space complexity analysis
- Suggestions for improvement

### Aptitude Round
```javascript
Score Calculation:
- Correct answer: 100 points
- Wrong answer: 0 points
```

**Feedback Includes**:
- Correct/Incorrect indicator
- Correct option highlighted
- Explanation of answer

### Technical Round
```javascript
Score Calculation:
- Base score: 30 (minimum)
- +20 for including technical keywords
- +Score based on answer length (0-50)
- Final: 30-100 range
```

**Feedback Includes**:
- Overall score
- Quality feedback
- Strengths identified
- Areas for improvement

### Behavioral Round
```javascript
Score Calculation:
- Random base: 60-100
- Metrics (60-100 each):
  - Communication score
  - Teamwork score
  - Problem-solving score
```

**Feedback Includes**:
- Overall score
- Individual metrics
- Feedback comment
- Breakdown of skills

---

## How Evaluation Works

### Step 1: Question Generation
User selects rounds → API returns mock questions instantly

### Step 2: User Answers
User types code, selects MCQ option, or types response

### Step 3: Evaluation
System runs local evaluation function → Returns mock score

### Step 4: Feedback
User sees score, feedback, and suggestions

**All processing happens in browser. No external calls.**

---

## Customizing Mock Data

To change questions, edit `frontend/app/utils/api.js`:

```javascript
// Find this section:
const mockCodingQuestions = [
    {
        id: 1,
        title: "Your Question Title",
        description: "Your question description",
        examples: [...],
        constraints: "...",
        difficulty: "Easy"
    },
    // Add more questions...
]
```

Same structure for:
- `mockAptitudeQuestions`
- `mockTechnicalQuestions`
- `mockBehavioralQuestions`

---

## Why Mock Data?

✅ **Works Offline**
- No internet required
- No API keys needed
- Instant questions

✅ **For Practice**
- Perfect for learning UI flow
- Test interview process
- Practice answers locally

✅ **No Cost**
- Free to use
- No API charges
- No backend server needed

✅ **Simple**
- No complex setup
- No configuration
- Just run and use

---

## Real vs Mock

| Feature | Real (Backend) | Mock (Frontend) |
|---------|---|---|
| AI Evaluation | ✅ Uses OpenAI | ❌ Simulated |
| Real Questions | ✅ Generated by AI | ❌ Hardcoded |
| Data Storage | ✅ Saved to database | ❌ Lost on refresh |
| Internet Required | ✅ Yes | ❌ No |
| Cost | ✅ Paid API | ❌ Free |
| Setup | ✅ Complex | ❌ Simple |
| Speed | ❌ Slower | ✅ Instant |

---

## Future Enhancements

Want to add real AI evaluation?
1. Keep the frontend code as is
2. Add backend API server
3. Update `api.js` to call real API instead of mock
4. Add OpenAI API key to `.env`

The frontend code won't need to change!

---

**Questions?** The mock data is designed to be self-contained and work completely offline!
