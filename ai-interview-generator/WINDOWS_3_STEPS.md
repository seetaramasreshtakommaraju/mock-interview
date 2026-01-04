# Windows: 3 Steps to Run (Frontend Only)

## Step 1️⃣ - Open the Project Folder

1. Open **File Explorer**
2. Navigate to your project folder:
   ```
   C:\Users\DELL\OneDrive\Documents\New folder\ai-interview-generator
   ```

## Step 2️⃣ - Click the Run File

Look for this file in the project folder:
```
start-frontend.bat
```

✅ **Double-click it**

Two things should happen:
- A black command window appears
- npm packages start installing

⏳ **Wait 30 seconds** for these messages:
```
> next@14.0.0 dev
> next dev
```

## Step 3️⃣ - Open Your Browser

Once you see the server running message, automatically:
- **Chrome, Edge, or Firefox opens automatically** OR
- **Manually go to**: `http://localhost:3000`

🎉 **You're in!**

---

## What You'll See

### First Screen: Interview Setup
- Select interview rounds (Coding, Aptitude, Technical, Behavioral)
- Select programming languages
- Select technologies
- Click "Start Interview"

### Interview Rounds

**Coding Round**
- 5 questions
- Write code in editor
- Click "Submit" for instant feedback

**Aptitude Round**
- 10 math questions
- Click answer option
- Get score immediately

**Technical Round**
- 5 technical questions
- Type your answer or skip
- Get instant feedback

**Behavioral Round**
- 3 soft skills questions
- Type your answer
- Get scored on response quality

---

## If Something Goes Wrong

### The command window closes immediately
- Right-click `start-frontend.bat`
- Select "Edit with Notepad"
- At the very end, add this line:
  ```
  pause
  ```
- Save and try again

### "npm is not recognized"
- You need to install Node.js
- Download from: https://nodejs.org
- Click the big green button to download
- Install it
- Restart your computer
- Try Step 2 again

### Port 3000 already in use
- Option A: Close other applications
- Option B: Use a different port:
  ```
  npm run dev -- -p 3001
  ```
  Then open: `http://localhost:3001`

### Browser doesn't open automatically
- Manually go to: `http://localhost:3000`
- Ctrl+C in command window to stop
- Then: `npm run dev`

---

## Manual Method (If Batch File Doesn't Work)

1. **Open Command Prompt**
   - Press: `Win + R`
   - Type: `cmd`
   - Press: Enter

2. **Navigate to frontend**
   ```bash
   cd C:\Users\DELL\OneDrive\Documents\New folder\ai-interview-generator\frontend
   ```

3. **Install and run**
   ```bash
   npm install
   npm run dev
   ```

4. **Open browser to**
   ```
   http://localhost:3000
   ```

---

## That's It! 🎉

You now have a fully working AI interview generator with no backend needed!

All questions and evaluations are completely working in your browser.

**Start practicing now!**
