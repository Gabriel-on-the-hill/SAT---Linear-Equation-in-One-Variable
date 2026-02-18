(function () {
    // --- State ---
    const state = {
        currentConceptKey: null,
        currentQuestions: [],
        currentIndex: 0,
        isExamMode: false,
        userAnswers: [], // Stores { questionIndex, answerIndex, isCorrect }
        score: 0
    };

    // --- DOM Elements ---
    const screens = {
        start: document.getElementById('startScreen'),
        quiz: document.getElementById('quiz'),
        end: document.getElementById('endScreen')
    };

    const ui = {
        questionText: document.getElementById('questionText'),
        optionsContainer: document.getElementById('options'),
        progress: document.getElementById('progress'),
        feedbackArea: document.getElementById('feedbackArea'),
        feedbackStatus: document.getElementById('feedbackStatus'),
        explanationText: document.getElementById('explanationText'),
        prevBtn: document.getElementById('prevSlideBtn'),
        nextBtn: document.getElementById('nextSlideBtn'),
        backBtn: document.getElementById('backBtn')
    };

    // --- App API ---
    window.app = {
        loadConcept: function (conceptKey) {
            state.currentConceptKey = conceptKey;
            state.isExamMode = document.getElementById('examModeToggle').checked;

            // Select Question Set
            const conceptData = window.QUESTIONS[conceptKey];
            state.currentQuestions = state.isExamMode ? conceptData.exam : conceptData.practice;

            state.currentIndex = 0;
            state.userAnswers = [];
            state.score = 0;
            state.isExamMode = document.getElementById('examModeToggle').checked;

            // UI Transition
            screens.start.hidden = true;
            screens.quiz.hidden = false;
            screens.end.hidden = true;

            renderSlide();
        }
    };

    // --- Core Logic ---
    function renderSlide() {
        const q = state.currentQuestions[state.currentIndex];

        // Reset State
        ui.feedbackArea.hidden = true;
        ui.optionsContainer.innerHTML = '';
        ui.nextBtn.disabled = true; // Force interaction before next (optional, maybe enabled for slide flow?)
        // Actually, for a "slide deck teaching" flow, Next should always be available or available after answer?
        // Let's make Next available always to allow skipping/teaching flow.
        ui.nextBtn.disabled = false;

        ui.prevBtn.disabled = state.currentIndex === 0;

        // Render Text
        const modeLabel = state.isExamMode ? "EXAM MODE" : "Practice Mode";
        ui.progress.textContent = `${modeLabel} | Slide ${state.currentIndex + 1} of ${state.currentQuestions.length}`;
        ui.questionText.innerHTML = q.question;

        // Render Options
        q.options.forEach((optText, idx) => {
            const btn = document.createElement('button');
            btn.className = 'option-btn';
            btn.innerHTML = optText;
            btn.onclick = () => handleAnswer(idx, btn);
            ui.optionsContainer.appendChild(btn);
        });

        // Math Rendering
        renderMathInElement(ui.questionText, { delimiters: [{ left: "$", right: "$", display: false }] });
        renderMathInElement(ui.optionsContainer, { delimiters: [{ left: "$", right: "$", display: false }] });
    }

    function handleAnswer(selectedIndex, btnElement) {
        if (!state.isExamMode && !ui.feedbackArea.hidden) return; // Prevent double clicking in Practice

        const q = state.currentQuestions[state.currentIndex];
        const isCorrect = selectedIndex === q.correctIndex;

        // Save Answer
        state.userAnswers[state.currentIndex] = {
            questionIndex: state.currentIndex,
            selectedOption: selectedIndex,
            isCorrect: isCorrect
        };

        // EXAM MODE BEHAVIOR
        if (state.isExamMode) {
            // Visual selection only
            Array.from(ui.optionsContainer.children).forEach(b => b.classList.remove('selected'));
            btnElement.classList.add('selected');
            ui.nextBtn.disabled = false; // Allow moving on
            return;
        }

        // PRACTICE MODE BEHAVIOR
        if (ui.feedbackArea.hidden) {
            if (isCorrect) {
                btnElement.classList.add('correct');
                ui.feedbackStatus.textContent = "Correct! ✅";
                ui.feedbackStatus.style.color = "var(--success)";
            } else {
                btnElement.classList.add('wrong');
                ui.feedbackStatus.textContent = "Incorrect ❌";
                ui.feedbackStatus.style.color = "var(--danger)";

                // Highlight correct one
                const correctBtn = ui.optionsContainer.children[q.correctIndex];
                if (correctBtn) correctBtn.classList.add('correct');
            }

            // Show Explanation
            ui.explanationText.innerHTML = q.explanation;
            ui.feedbackArea.hidden = false;

            // Render math in explanation
            renderMathInElement(ui.explanationText, { delimiters: [{ left: "$", right: "$", display: false }] });
        }
    }

    function nextSlide() {
        if (state.currentIndex < state.currentQuestions.length - 1) {
            state.currentIndex++;
            renderSlide();
        } else {
            finishModule();
        }
    }

    function finishModule() {
        screens.quiz.hidden = true;
        screens.end.hidden = false;

        const total = state.currentQuestions.length;
        // Calc Score
        const correctCount = state.userAnswers.filter(a => a && a.isCorrect).length;

        let msg = "";
        if (state.isExamMode) {
            msg = `<h2>Exam Complete!</h2>
                   <div class="score-display">Score: ${correctCount} / ${total}</div>
                   <p>Great job! You have completed the module.</p>`;
        } else {
            msg = `<h2>Module Complete!</h2>
                   <p>You have reviewed all slides in this concept.</p>`;
        }

        // Update End Screen Content
        const container = screens.end.querySelector('h2').parentNode;
        // Simple swap logic or innerHTML replacement
        screens.end.innerHTML = msg + `<div class="action-buttons"><button onclick="location.reload()" class="btn-primary">Return to Menu</button></div>`;
    }

    function prevSlide() {
        if (state.currentIndex > 0) {
            state.currentIndex--;
            renderSlide();
        }
    }

    function goBack() {
        if (confirm("Return to Main Menu?")) {
            screens.quiz.hidden = true;
            screens.start.hidden = false;
        }
    }

    // --- Bindings ---
    ui.nextBtn.onclick = nextSlide;
    ui.prevBtn.onclick = prevSlide;
    ui.backBtn.onclick = goBack;

})();
