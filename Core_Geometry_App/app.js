(function () {
    const state = {
        playlist: [],            // The array of topics to cover
        currentTopicIdx: 0,      // Index in the playlist
        currentSlideIdx: 0,      // Index within the current topic's question set
        currentQuestions: [],    // Reference to active set

        // Session Accumulators
        allQuestions: [],        // Flattened list for final calculation/review
        userAnswers: [],         // Global index mapped

        currentModule: null,     // 'guided', 'independent', etc.
        isExamMode: false,
        isHardMode: false,

        timeRemaining: 900,
        timeRemaining: 900,
        timerInterval: null,
        reviewIndex: 0,

        // UNIQUE SESSION ID (Generated per page load) to group concurrent student data
        sessionId: 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9)
    };

    const dom = {
        startScreen: document.getElementById('startScreen'),
        introScreen: document.getElementById('introScreen'),
        quiz: document.getElementById('quiz'),
        endScreen: document.getElementById('endScreen'),
        reviewScreen: document.getElementById('reviewScreen'),

        introTitle: document.querySelector('#introScreen h2'),
        introCards: document.getElementById('playlistIntro'),
        startPracticeBtn: document.getElementById('startPracticeBtn'),
        introBackBtn: document.getElementById('introBackBtn'),

        examModeToggle: document.getElementById('examModeToggle'),
        hardModeToggle: document.getElementById('hardModeToggle'),

        activeTimer: document.getElementById('timerDisplay'),
        progressText: document.getElementById('progress'),
        difficultyBadge: document.getElementById('difficultyBadge') || { textContent: '' },
        questionText: document.getElementById('questionText'),
        optionsGrid: document.getElementById('optionsGrid'),

        feedbackArea: document.getElementById('feedbackArea'),
        feedbackStatus: document.getElementById('feedbackStatus'),
        explanationText: document.getElementById('explanationText'),

        prevBtn: document.getElementById('prevSlideBtn'),
        nextBtn: document.getElementById('nextSlideBtn'),

        scoreDisplay: document.getElementById('endScreenScore'),
        reviewBtn: document.getElementById('reviewBtn'),
        returnMenuBtn: document.getElementById('returnMenuBtn'),
        endTitle: document.getElementById('endScreenTitle'),

        reviewBackBtn: document.getElementById('reviewBackBtn'),
        reviewQuestionText: document.getElementById('reviewQuestionText'),
        reviewOptions: document.getElementById('reviewOptions'),
        reviewFeedbackStatus: document.getElementById('reviewFeedbackStatus'),
        reviewExplanationText: document.getElementById('reviewExplanationText'),
        reviewPrevBtn: document.getElementById('reviewPrevBtn'),
        reviewNextBtn: document.getElementById('reviewNextBtn'),
        reviewProgress: document.getElementById('reviewProgress'),
        globalHomeBtn: document.getElementById('globalHomeBtn')
    };

    // --- SCORE TRACKING UTILITIES ---
    function saveProgress(isFinal = false) {
        // Calculate current score based on all questions answered so far
        let score = 0;
        let answeredCount = 0;
        let detailedScores = []; // Array to hold 1/0 for each question

        // We look at allQuestions (previously answered topics) + currentQuestions (currently active topic)
        const combinedQuestions = [...state.allQuestions, ...state.currentQuestions];

        combinedQuestions.forEach((q, idx) => {
            const userA = state.userAnswers[idx];
            if (userA !== undefined && userA !== null) {
                answeredCount++;
                let earnedPoints = 0;

                if (q.type === 'grid-in') {
                    if (checkGridIn(userA || "", q.answer)) {
                        score++;
                        earnedPoints = 1;
                    }
                } else {
                    if (userA === q.correctIndex) {
                        score++;
                        earnedPoints = 1;
                    }
                }

                // Strip KaTeX/HTML to make it perfectly readable in Sheets
                const cleanQuestion = q.question.replace(/<[^>]*>?/gm, '').replace(/\\\(/g, '').replace(/\\\)/g, '').replace(/\$/g, '').substring(0, 40) + "...";
                detailedScores.push(`Q${idx + 1}: ${cleanQuestion} (${earnedPoints}/1)`);
            }
        });

        // Don't save if nothing has been answered yet
        if (answeredCount === 0) return;

        const appName = "Core_Geometry_App";
        // If final, list all topics they covered
        const fullTopicContext = `Core Geometry | ${sectionName}`;

        const totalPossible = combinedQuestions.length; // Or state.playlist total if we pre-calculate

        // --- OPTION 3: Local Storage ---
        const storageKey = `edutrack_score_${appName}_${fullTopicContext}`;

        let previousHighScore = localStorage.getItem(storageKey);
        const currentPercentage = score / totalPossible;

        const highScoreDisplay = document.getElementById('highScoreDisplay');
        if (previousHighScore) {
            const parsedScore = JSON.parse(previousHighScore);
            const prevPercentage = parsedScore.score / parsedScore.maxScore;

            if (isFinal && currentPercentage > prevPercentage) {
                if (highScoreDisplay) highScoreDisplay.textContent = `🏆 New Personal Best! (Previous: ${parsedScore.score}/${parsedScore.maxScore})`;
                localStorage.setItem(storageKey, JSON.stringify({ score: score, maxScore: totalPossible }));
            } else if (isFinal) {
                if (highScoreDisplay) highScoreDisplay.textContent = `Your Personal Best: ${parsedScore.score}/${parsedScore.maxScore}`;
            }
            // If not final but we are saving progress, we still update if it's strictly better
            else if (currentPercentage > prevPercentage) {
                localStorage.setItem(storageKey, JSON.stringify({ score: score, maxScore: totalPossible }));
            }
        } else {
            if (isFinal && highScoreDisplay) highScoreDisplay.textContent = `🏆 First attempt recorded!`;
            localStorage.setItem(storageKey, JSON.stringify({ score: score, maxScore: totalPossible }));
        }

        // --- OPTION 2: Google Sheets Tracking ---
        const studentNameInput = document.getElementById('studentName');
        const studentName = (studentNameInput && studentNameInput.value.trim()) ? studentNameInput.value.trim() : "Unknown Student";

        const dbStatus = document.getElementById('dbSyncStatus');
        if (isFinal && dbStatus) {
            dbStatus.style.display = 'block';
            dbStatus.textContent = "Saving final score to database...";
            dbStatus.style.color = "var(--primary)";
        }

        const scriptURL = "https://script.google.com/macros/s/AKfycbxCEkQ_QepW7MWzClK28h32T-StNMdeGsqMISPVx76dn-Md7349LJA4Ir22LunJ6sQbkg/exec";

        const payload = {
            studentName: studentName,
            appName: appName,
            topicName: fullTopicContext + (isFinal ? " (Complete)" : " (In Progress)"),
            score: score,
            maxScore: totalPossible,
            detailedScores: detailedScores.join(" | "), // Ex: Q1: Eq... (1/1) | Q2: 4x... (0/1)
            sessionId: state.sessionId, // Groups all questions from this single session
            timestamp: new Date().toISOString() // Logs exact time of this specific answer
        };

        fetch(scriptURL, {
            method: 'POST',
            body: JSON.stringify(payload)
        })
            .then(response => {
                if (isFinal && dbStatus) {
                    dbStatus.textContent = "✅ Score successfully saved to database!";
                    dbStatus.style.color = "var(--success)";
                }
                console.log(`Score (${score}/${totalPossible}) logged to Sheets!`, response);
            })
            .catch(error => {
                if (isFinal && dbStatus) {
                    dbStatus.textContent = "⚠️ Could not save to database (Check connection).";
                    dbStatus.style.color = "var(--danger)";
                }
                console.error('Error logging score!', error.message);
            });
    }

    // UTILITIES
    function formatTime(seconds) {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    }

    function triggerMath(element) {
        if (window.renderMathInElement) {
            window.renderMathInElement(element || document.body, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '$', right: '$', display: false }
                ],
                throwOnError: false
            });
        }
    }

    // CORE ENGINE
    function init() {
        document.querySelectorAll('.module-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const nameInput = document.getElementById('studentName');
                if (!nameInput.value.trim()) {
                    e.preventDefault();
                    nameInput.style.border = "2px solid var(--danger)";
                    nameInput.placeholder = "⚠️ REQUIRED: Enter your name";
                    nameInput.focus();

                    // Remove the red border once they start typing
                    nameInput.addEventListener('input', function removeWarning() {
                        nameInput.style.border = "";
                        nameInput.placeholder = "E.g., Tracy";
                        nameInput.removeEventListener('input', removeWarning);
                    });

                    return; // Stop execution, name missing
                }

                startPlaylist(btn.dataset.module);
            });
        });

        dom.nextBtn.addEventListener('click', handleNext);
        dom.prevBtn.addEventListener('click', () => {
            if (state.currentSlideIdx > 0) {
                state.currentSlideIdx--;
                renderSlide();
            }
        });

        dom.returnMenuBtn.addEventListener('click', () => location.reload());

        if (dom.globalHomeBtn) {
            dom.globalHomeBtn.addEventListener('click', () => {
                location.reload();
            });
        }
        dom.introBackBtn.addEventListener('click', () => {
            if (state.currentTopicIdx === 0) {
                dom.introScreen.hidden = true;
                dom.startScreen.hidden = false;
            } else {
                // Return to transition logic if we were mid-playlist? 
                // For simplicity, just reload or return to start.
                location.reload();
            }
        });

        dom.startPracticeBtn.addEventListener('click', () => {
            dom.introScreen.hidden = true;
            beginQuizExecution();
        });

        dom.reviewBtn.addEventListener('click', startReview);

        dom.reviewBackBtn.addEventListener('click', () => {
            dom.reviewScreen.hidden = true;
            dom.endScreen.hidden = false;
        });

        dom.reviewNextBtn.addEventListener('click', () => {
            if (state.reviewIndex < state.allQuestions.length - 1) {
                state.reviewIndex++;
                renderReviewSlide();
            }
        });

        dom.reviewPrevBtn.addEventListener('click', () => {
            if (state.reviewIndex > 0) {
                state.reviewIndex--;
                renderReviewSlide();
            }
        });

        const copyBtn = document.getElementById('copyBtn');
        if (copyBtn) copyBtn.addEventListener('click', handleCopyWork);
    }

    function handleCopyWork() {
        const nameInput = document.getElementById('studentName').value.trim();
        const name = nameInput ? nameInput : "Student";
        const date = new Date().toLocaleDateString();

        let score = 0;
        state.allQuestions.forEach((q, idx) => {
            if (q.type === 'grid-in') {
                if (checkGridIn(state.userAnswers[idx] || "", q.answer)) score++;
            } else {
                if (state.userAnswers[idx] === q.correctIndex) score++;
            }
        });

        let outputText = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n📝 SAT PLAYLIST REPORT\nStudent: ${name}\nDate: ${date}\nFinal Score: ${score} / ${state.allQuestions.length}\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

        state.allQuestions.forEach((q, idx) => {
            const userA = state.userAnswers[idx];
            let isCorrect = false;
            if (q.type === 'grid-in') {
                isCorrect = checkGridIn(userA || "", q.answer);
            } else {
                isCorrect = userA === q.correctIndex;
            }

            // Strip KaTeX/HTML for raw text copy
            const cleanQuestion = q.question.replace(/<[^>]*>?/gm, '').replace(/\\\(/g, '').replace(/\\\)/g, '').replace(/\$/g, '');
            outputText += `Q${idx + 1}: ${cleanQuestion}\n`;

            if (userA === undefined || userA === null) {
                outputText += `  Status: ⚠️ UNANSWERED\n\n`;
            } else {
                const userChoice = q.type === 'grid-in' ? userA : ['A', 'B', 'C', 'D'][userA];
                outputText += `  Selected: ${userChoice}\n`;
                outputText += `  Status: ${isCorrect ? '✅ Correct' : '❌ Incorrect'}\n\n`;
            }
        });

        outputText += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\nEnd of Report\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`;

        // Clipboard logic
        if (navigator.clipboard && window.isSecureContext) {
            navigator.clipboard.writeText(outputText).then(() => {
                const msgEl = document.getElementById('submitMsg');
                if (msgEl) {
                    msgEl.innerText = "✅ Copied to clipboard!";
                    msgEl.classList.add("msg-success");
                    setTimeout(() => { msgEl.innerText = ''; }, 3000);
                }
            });
        }
    }

    function startPlaylist(moduleKey) {
        state.isExamMode = dom.examModeToggle.checked;
        state.isHardMode = dom.hardModeToggle.checked;
        state.currentModule = moduleKey;

        // 1. Prepare the playlist
        state.playlist = window.PLAYLIST || [];
        state.currentTopicIdx = 0;
        state.allQuestions = [];
        state.userAnswers = [];

        if (state.playlist.length === 0) {
            alert("Payload empty. Ensure questions.js is loaded.");
            return;
        }

        // 2. Hide Start
        dom.startScreen.hidden = true;

        // 3. Start Topic 1
        loadTopic(0);
    }

    function loadTopic(index) {
        state.currentTopicIdx = index;
        const topic = state.playlist[index];
        const moduleKey = state.currentModule;

        // Determine the questions for this topic
        // (Hard Mode is currently handled inside the payload via distribution, 
        //  but we can add logic here if we had different keys).
        state.currentQuestions = topic.questions[moduleKey] || [];
        state.currentSlideIdx = 0;

        // Render the Concept Intro dynamically
        dom.introTitle.textContent = `Concept: ${topic.title}`;
        dom.introCards.innerHTML = `
            <div class="concept-card">
                <div class="card-title">Winning Strategy</div>
                <p>${topic.introText}</p>
            </div>
        `;

        dom.introScreen.hidden = false;
        triggerMath(dom.introScreen);
    }

    function beginQuizExecution() {
        dom.quiz.hidden = false;

        // If it's the very first topic, start global timer if in Exam mode
        if (state.currentTopicIdx === 0 && state.isExamMode) {
            startTimer();
            dom.activeTimer.hidden = false;
        }

        renderSlide();
    }

    function startTimer() {
        state.timeRemaining = 1200; // 20 mins for a multi-topic session
        dom.activeTimer.textContent = formatTime(state.timeRemaining);
        state.timerInterval = setInterval(() => {
            state.timeRemaining--;
            dom.activeTimer.textContent = formatTime(state.timeRemaining);
            if (state.timeRemaining <= 60) dom.activeTimer.classList.add('timer-danger');
            if (state.timeRemaining <= 0) finishPlaylist();
        }, 1000);
    }

    function renderSlide() {
        const q = state.currentQuestions[state.currentSlideIdx];

        // Progress tracking
        const topicName = state.playlist[state.currentTopicIdx].title;
        dom.progressText.textContent = `${topicName} | Slide ${state.currentSlideIdx + 1} of ${state.currentQuestions.length}`;

        // Update Difficulty Badge
        if (dom.difficultyBadge && q.difficulty) {
            dom.difficultyBadge.innerText = q.difficulty;
            dom.difficultyBadge.className = `difficulty-badge diff-${q.difficulty.toLowerCase()}`;
        }

        // Question markup
        dom.questionText.innerHTML = q.question;
        dom.optionsGrid.innerHTML = '';
        dom.feedbackArea.hidden = true;

        if (q.type === 'grid-in') {
            const container = document.createElement('div');
            container.className = 'grid-in-container';
            container.innerHTML = `
                <input type="text" id="grid-in-input" placeholder="Type answer..." class="grid-in-input">
                <button id="grid-in-submit" class="grid-in-submit primary-btn">Submit Answer</button>
            `;
            dom.optionsGrid.appendChild(container);

            const input = container.querySelector('#grid-in-input');
            const submit = container.querySelector('#grid-in-submit');

            // Find if already answered in global tracker
            const globalIdx = state.allQuestions.length + state.currentSlideIdx;
            if (state.userAnswers[globalIdx] !== undefined) {
                input.value = state.userAnswers[globalIdx];
                input.disabled = true;
                submit.disabled = true;
                if (!state.isExamMode && state.currentModule !== 'homework') {
                    const isCorrect = checkGridIn(input.value, q.answer);
                    showFeedback(isCorrect);
                }
            }

            submit.addEventListener('click', () => {
                const val = input.value.trim();
                if (!val) return;
                state.userAnswers[globalIdx] = val;
                input.disabled = true;
                submit.disabled = true;

                // Save progress immediately
                saveProgress(false);

                if (!state.isExamMode && state.currentModule !== 'homework') {
                    showFeedback(checkGridIn(val, q.answer));
                }
            });
        } else {
            const letters = ['A', 'B', 'C', 'D'];
            letters.forEach((letter, idx) => {
                const btn = document.createElement('button');
                btn.className = 'option-btn';
                btn.innerHTML = `<span class="opt-letter">${letter}</span>`;

                const globalIdx = state.allQuestions.length + state.currentSlideIdx;
                if (state.userAnswers[globalIdx] === idx) {
                    btn.classList.add('selected');
                    if (!state.isExamMode && state.currentModule !== 'homework') {
                        const isCorrect = idx === q.correctIndex;
                        btn.classList.add(isCorrect ? 'correct' : 'wrong');
                        showFeedback(isCorrect);
                        disableOptions();
                    }
                }

                btn.addEventListener('click', () => {
                    if (state.userAnswers[globalIdx] !== undefined && !state.isExamMode && state.currentModule !== 'homework') return;

                    state.userAnswers[globalIdx] = idx;

                    // Save progress immediately
                    saveProgress(false);

                    if (!state.isExamMode && state.currentModule !== 'homework') {
                        const isCorrect = idx === q.correctIndex;
                        btn.classList.add(isCorrect ? 'correct' : 'wrong');
                        disableOptions();
                        showFeedback(isCorrect);
                    } else {
                        Array.from(dom.optionsGrid.children).forEach(b => b.classList.remove('selected'));
                        btn.classList.add('selected');
                    }
                });
                dom.optionsGrid.appendChild(btn);
            });
        }

        dom.prevBtn.disabled = (state.currentSlideIdx === 0);
        dom.nextBtn.textContent = (state.currentSlideIdx === state.currentQuestions.length - 1) ? 'Continue →' : 'Next Question →';

        triggerMath(dom.quiz);
    }

    function checkGridIn(userVal, correctVal) {
        const clean = (val) => val.toString().toLowerCase().replace(/\s+/g, '').replace(/\.$/, '');
        const u = clean(userVal);
        const c = clean(correctVal);
        if (u === c) return true;
        if (!isNaN(u) && !isNaN(c)) return parseFloat(u) === parseFloat(c);
        return false;
    }

    function disableOptions() {
        Array.from(dom.optionsGrid.children).forEach(b => b.disabled = true);
    }

    function showFeedback(isCorrect) {
        const q = state.currentQuestions[state.currentSlideIdx];
        dom.feedbackStatus.textContent = isCorrect ? "✓ Correct" : "✗ Incorrect";
        dom.feedbackStatus.style.color = isCorrect ? "var(--success)" : "var(--danger)";
        dom.explanationText.innerHTML = q.explanation;
        dom.feedbackArea.hidden = false;
        triggerMath(dom.feedbackArea);
    }

    function handleNext() {
        if (state.currentSlideIdx < state.currentQuestions.length - 1) {
            state.currentSlideIdx++;
            renderSlide();
        } else {
            // End of current TOPIC
            state.allQuestions = state.allQuestions.concat(state.currentQuestions);

            if (state.currentTopicIdx < state.playlist.length - 1) {
                // There is another topic!
                dom.quiz.hidden = true;
                loadTopic(state.currentTopicIdx + 1);
            } else {
                // Playlist Finished
                finishPlaylist();
            }
        }
    }

    function finishPlaylist() {
        clearInterval(state.timerInterval);
        dom.activeTimer.hidden = true;
        dom.quiz.hidden = true;
        dom.endScreen.hidden = false;

        let score = 0;
        state.allQuestions.forEach((q, idx) => {
            if (q.type === 'grid-in') {
                if (checkGridIn(state.userAnswers[idx] || "", q.answer)) score++;
            } else {
                if (state.userAnswers[idx] === q.correctIndex) score++;
            }
        });

        dom.scoreDisplay.textContent = `Total Score: ${score} / ${state.allQuestions.length}`;
        dom.scoreDisplay.hidden = false;
        dom.reviewBtn.hidden = false;

        // Save final progress
        saveProgress(true);
    }

    function startReview() {
        state.reviewIndex = 0;
        dom.endScreen.hidden = true;
        dom.reviewScreen.hidden = false;
        renderReviewSlide();
    }

    function renderReviewSlide() {
        const q = state.allQuestions[state.reviewIndex];
        const userA = state.userAnswers[state.reviewIndex];

        let isCorrect = false;
        if (q.type === 'grid-in') {
            isCorrect = checkGridIn(userA || "", q.answer);
        } else {
            isCorrect = userA === q.correctIndex;
        }

        dom.reviewProgress.textContent = `Review: ${state.reviewIndex + 1} of ${state.allQuestions.length}`;
        dom.reviewQuestionText.innerHTML = q.question;

        dom.reviewOptions.innerHTML = '';
        if (q.type === 'grid-in') {
            dom.reviewOptions.innerHTML = `<div class="review-grid-in">
                <p><strong>Your Answer:</strong> ${userA || "—"}</p>
                <p><strong>Correct Answer:</strong> ${q.answer}</p>
            </div>`;
        } else {
            ['A', 'B', 'C', 'D'].forEach((letter, idx) => {
                const div = document.createElement('div');
                div.className = 'option-btn disabled';
                div.innerHTML = `<span class="opt-letter">${letter}</span>`;
                if (idx === q.correctIndex) div.classList.add('correct');
                if (idx === userA && !isCorrect) div.classList.add('wrong');
                dom.reviewOptions.appendChild(div);
            });
        }

        dom.reviewFeedbackStatus.textContent = isCorrect ? "✓ Correct" : "✗ Incorrect";
        dom.reviewFeedbackStatus.style.color = isCorrect ? "var(--success)" : "var(--danger)";
        dom.reviewExplanationText.innerHTML = q.explanation;

        dom.reviewPrevBtn.disabled = state.reviewIndex === 0;
        dom.reviewNextBtn.disabled = state.reviewIndex === state.allQuestions.length - 1;

        triggerMath(dom.reviewScreen);
    }

    init();
})();
