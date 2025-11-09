// 全域變數
let currentMode = null;
let currentQuestionIndex = 0;
let selectedAnswers = [];
let examQuestions = [];
let examAnswers = [];
let timerInterval = null;
let timeLeft = 50 * 60;
let examStartTime = null;
let examEndTime = null;

// 觸控相關變數
let touchStartX = 0;
let touchEndX = 0;
const SWIPE_THRESHOLD = 50; // 最小滑動距離

// DOM元素
const modeSelection = document.getElementById('mode-selection');
const practiceContainer = document.getElementById('practice-container');
const examContainer = document.getElementById('exam-container');
const resultContainer = document.getElementById('result-container');

// 練習模式元素
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const answerExplanation = document.getElementById('answer-explanation');
const correctAnswer = document.getElementById('correct-answer');
const explanationText = document.getElementById('explanation-text');
const currentQ = document.getElementById('current-q');
const totalQ = document.getElementById('total-q');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const showAnswerBtn = document.getElementById('show-answer');
const resetPracticeBtn = document.getElementById('reset-practice');
const backToPracticeModeBtn = document.getElementById('back-to-practice-mode');

// 模擬考模式元素
const examQuestionText = document.getElementById('exam-question-text');
const examOptionsContainer = document.getElementById('exam-options-container');
const timer = document.getElementById('timer');
const progress = document.getElementById('progress');
const submitExamBtn = document.getElementById('submit-exam');
const resetExamBtn = document.getElementById('reset-exam');

// 結果頁面元素
const scoreDisplay = document.getElementById('score-display');
const resultDetails = document.getElementById('result-details');
const backToModeBtn = document.getElementById('back-to-mode');
const reviewAnswersBtn = document.getElementById('review-answers');
const retryExamBtn = document.getElementById('retry-exam');

// 事件監聽器
document.getElementById('practice-mode').addEventListener('click', () => startPracticeMode());
document.getElementById('exam-mode').addEventListener('click', () => startExamMode());
prevBtn.addEventListener('click', () => navigateQuestion(-1));
nextBtn.addEventListener('click', () => navigateQuestion(1));
showAnswerBtn.addEventListener('click', showAnswer);
resetPracticeBtn.addEventListener('click', resetToModeSelection);
backToPracticeModeBtn.addEventListener('click', resetToModeSelection);
submitExamBtn.addEventListener('click', submitExam);
resetExamBtn.addEventListener('click', resetExam);
backToModeBtn.addEventListener('click', resetToModeSelection);

// 初始化
function init() {
    resetToModeSelection();
    
    // 添加鍵盤事件監聽
    document.addEventListener('keydown', handleKeyDown);
    
    // 添加觸控事件監聽
    document.addEventListener('touchstart', handleTouchStart, { passive: true });
    document.addEventListener('touchend', handleTouchEnd, { passive: true });
    
    // 確保結果頁面按鈕事件監聽器
    reviewAnswersBtn?.addEventListener('click', () => {
        document.querySelector('.result-details-section').scrollIntoView({ 
            behavior: 'smooth' 
        });
    });
    
    retryExamBtn?.addEventListener('click', startExamMode);
}

// 鍵盤操作處理
function handleKeyDown(event) {
    // 只在測驗頁面啟用鍵盤操作
    if (!practiceContainer.classList.contains('active') && !examContainer.classList.contains('active')) {
        return;
    }
    
    switch(event.key) {
        case 'ArrowLeft':
            event.preventDefault();
            if (!prevBtn.disabled) {
                navigateQuestion(-1);
            }
            break;
            
        case 'ArrowRight':
            event.preventDefault();
            if (!nextBtn.disabled) {
                navigateQuestion(1);
            }
            break;
            
        case '1':
        case '2':
        case '3':
        case '4':
            event.preventDefault();
            selectOptionByNumber(parseInt(event.key));
            break;
            
        case 'Enter':
            event.preventDefault();
            if (practiceContainer.classList.contains('active')) {
                showAnswer();
            } else if (examContainer.classList.contains('active') && !submitExamBtn.disabled) {
                submitExam();
            }
            break;
            
        case 'Escape':
            event.preventDefault();
            resetToModeSelection();
            break;
    }
}

// 通過數字選擇選項
function selectOptionByNumber(optionNumber) {
    const currentQuestions = currentMode === 'practice' ? questions : examQuestions;
    const currentIndex = currentQuestionIndex;
    
    if (optionNumber >= 1 && optionNumber <= 4) {
        const question = currentQuestions[currentIndex];
        if (question && question.options[optionNumber - 1]) {
            const optionLetter = question.options[optionNumber - 1].charAt(0);
            if (currentMode === 'practice') {
                selectOption(optionLetter);
            } else {
                selectExamOption(optionLetter);
            }
        }
    }
}

// 觸控開始處理
function handleTouchStart(event) {
    touchStartX = event.changedTouches[0].screenX;
}

// 觸控結束處理
function handleTouchEnd(event) {
    touchEndX = event.changedTouches[0].screenX;
    handleSwipe();
}

// 處理滑動手勢
function handleSwipe() {
    const swipeDistance = touchEndX - touchStartX;
    
    // 只有當滑動距離超過閾值時才處理
    if (Math.abs(swipeDistance) < SWIPE_THRESHOLD) {
        return;
    }
    
    if (swipeDistance > 0) {
        // 向右滑動 - 上一題
        if (!prevBtn.disabled) {
            navigateQuestion(-1);
            showSwipeFeedback('prev');
        }
    } else {
        // 向左滑動 - 下一題
        if (!nextBtn.disabled) {
            navigateQuestion(1);
            showSwipeFeedback('next');
        }
    }
}

// 顯示滑動反饋
function showSwipeFeedback(direction) {
    const feedback = document.createElement('div');
    feedback.className = `swipe-feedback swipe-${direction}`;
    feedback.innerHTML = direction === 'prev' ? '← 上一題' : '下一題 →';
    
    // 添加到當前活動的測驗容器
    const activeContainer = practiceContainer.classList.contains('active') ? practiceContainer : examContainer;
    activeContainer.appendChild(feedback);
    
    // 顯示動畫
    setTimeout(() => {
        feedback.classList.add('show');
    }, 10);
    
    // 移除元素
    setTimeout(() => {
        feedback.classList.remove('show');
        setTimeout(() => {
            if (feedback.parentNode) {
                feedback.parentNode.removeChild(feedback);
            }
        }, 300);
    }, 1000);
}

// 重置到模式選擇
function resetToModeSelection() {
    setActiveSection(modeSelection);
    practiceContainer.classList.remove('active');
    examContainer.classList.remove('active');
    resultContainer.classList.remove('active');
    
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    currentMode = null;
    currentQuestionIndex = 0;
    selectedAnswers = [];
    examQuestions = [];
    examAnswers = [];
    timeLeft = 50 * 60;
}

// 設置活動區域
function setActiveSection(section) {
    document.querySelectorAll('.mode-selection, .quiz-container, .result-container').forEach(sec => {
        sec.classList.remove('active');
    });
    section.classList.add('active');
}

// 開始練習模式
function startPracticeMode() {
    currentMode = 'practice';
    setActiveSection(practiceContainer);
    
    currentQuestionIndex = 0;
    selectedAnswers = new Array(questions.length).fill(null);
    
    updatePracticeQuestion();
    showKeyboardShortcuts();
}

// 開始模擬考模式
function startExamMode() {
    currentMode = 'exam';
    setActiveSection(examContainer);
    
    examQuestions = getRandomQuestions(20);
    examAnswers = new Array(examQuestions.length).fill(null);
    
    currentQuestionIndex = 0;
    updateExamQuestion();
    updateProgress();
    
    examStartTime = new Date();
    startTimer();
    showKeyboardShortcuts();
}

// 顯示鍵盤快捷鍵提示
function showKeyboardShortcuts() {
    const shortcuts = document.createElement('div');
    shortcuts.className = 'keyboard-shortcuts';
    shortcuts.innerHTML = `
        <div class="shortcuts-content">
            <h4>📋 操作提示</h4>
            <div class="shortcut-item">
                <span class="key">← →</span>
                <span>切換題目</span>
            </div>
            <div class="shortcut-item">
                <span class="key">1-4</span>
                <span>選擇答案</span>
            </div>
            <div class="shortcut-item">
                <span class="key">Enter</span>
                <span>${currentMode === 'practice' ? '顯示答案' : '提交測驗'}</span>
            </div>
            <div class="shortcut-item">
                <span class="key">ESC</span>
                <span>返回首頁</span>
            </div>
            <div class="mobile-hint">📱 手機支援左右滑動切換題目</div>
        </div>
    `;
    
    const activeContainer = currentMode === 'practice' ? practiceContainer : examContainer;
    activeContainer.appendChild(shortcuts);
    
    // 3秒後自動隱藏
    setTimeout(() => {
        shortcuts.classList.add('fade-out');
        setTimeout(() => {
            if (shortcuts.parentNode) {
                shortcuts.parentNode.removeChild(shortcuts);
            }
        }, 500);
    }, 3000);
}

// 更新練習模式題目
function updatePracticeQuestion() {
    const question = questions[currentQuestionIndex];
    
    questionText.textContent = `${question.id}. ${question.question}`;
    
    optionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.dataset.optionNumber = index + 1;
        
        const optionLetter = option.charAt(0);
        const isSelected = selectedAnswers[currentQuestionIndex] === optionLetter;
        const isCorrect = optionLetter === question.correctAnswer;
        
        if (selectedAnswers[currentQuestionIndex] !== null) {
            if (isCorrect) {
                optionElement.classList.add('correct');
            } else if (isSelected && !isCorrect) {
                optionElement.classList.add('incorrect');
            }
        } else if (isSelected) {
            optionElement.classList.add('selected');
        }
        
        const optionNumber = document.createElement('span');
        optionNumber.className = 'option-number';
        optionNumber.textContent = `${index + 1}.`;
        
        const optionText = document.createElement('span');
        optionText.className = 'option-text';
        optionText.textContent = option.substring(3); // 移除 "A. " 前綴
        
        optionElement.appendChild(optionNumber);
        optionElement.appendChild(optionText);
        optionElement.addEventListener('click', () => selectOption(optionLetter));
        
        optionsContainer.appendChild(optionElement);
    });
    
    currentQ.textContent = currentQuestionIndex + 1;
    totalQ.textContent = questions.length;
    
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = currentQuestionIndex === questions.length - 1;
    
    if (selectedAnswers[currentQuestionIndex] !== null) {
        showAnswer();
    } else {
        answerExplanation.classList.add('hidden');
    }
}

// 選擇選項
function selectOption(option) {
    selectedAnswers[currentQuestionIndex] = option;
    updatePracticeQuestion();
}

// 顯示答案
function showAnswer() {
    const question = questions[currentQuestionIndex];
    
    correctAnswer.textContent = question.correctAnswer;
    explanationText.textContent = question.explanation;
    
    answerExplanation.classList.remove('hidden');
}

// 導航題目
function navigateQuestion(direction) {
    currentQuestionIndex += direction;
    
    if (currentMode === 'practice') {
        updatePracticeQuestion();
    } else {
        updateExamQuestion();
    }
}

// 隨機選擇題目
function getRandomQuestions(count) {
    const shuffled = [...questions].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// 更新模擬考題目
function updateExamQuestion() {
    const question = examQuestions[currentQuestionIndex];
    
    examQuestionText.textContent = `${currentQuestionIndex + 1}. ${question.question}`;
    
    examOptionsContainer.innerHTML = '';
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        optionElement.dataset.optionNumber = index + 1;
        
        if (examAnswers[currentQuestionIndex] === option.charAt(0)) {
            optionElement.classList.add('selected');
        }
        
        const optionNumber = document.createElement('span');
        optionNumber.className = 'option-number';
        optionNumber.textContent = `${index + 1}.`;
        
        const optionText = document.createElement('span');
        optionText.className = 'option-text';
        optionText.textContent = option.substring(3); // 移除 "A. " 前綴
        
        optionElement.appendChild(optionNumber);
        optionElement.appendChild(optionText);
        optionElement.addEventListener('click', () => selectExamOption(option.charAt(0)));
        
        examOptionsContainer.appendChild(optionElement);
    });
    
    submitExamBtn.disabled = examAnswers.includes(null);
}

// 選擇模擬考選項
function selectExamOption(option) {
    examAnswers[currentQuestionIndex] = option;
    updateExamQuestion();
    updateProgress();
    
    if (currentQuestionIndex < examQuestions.length - 1) {
        currentQuestionIndex++;
        updateExamQuestion();
    }
}

// 更新進度
function updateProgress() {
    const answered = examAnswers.filter(answer => answer !== null).length;
    progress.textContent = `${answered}/${examQuestions.length}`;
}

// 開始計時器
function startTimer() {
    updateTimerDisplay();
    
    timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitExam();
        }
    }, 1000);
}

// 更新計時器顯示
function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timer.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    if (timeLeft < 300) {
        timer.style.color = '#ef4444';
    }
}

// 提交模擬考
function submitExam() {
    clearInterval(timerInterval);
    examEndTime = new Date();
    
    let correctCount = 0;
    examQuestions.forEach((question, index) => {
        if (examAnswers[index] === question.correctAnswer) {
            correctCount++;
        }
    });
    
    const score = (correctCount / examQuestions.length) * 100;
    showResults(score, correctCount, examQuestions.length);
}

// 顯示結果
function showResults(score, correctCount, totalCount) {
    setActiveSection(resultContainer);
    
    // 計算用時
    const timeUsed = Math.floor((examEndTime - examStartTime) / 1000);
    const minutes = Math.floor(timeUsed / 60);
    const seconds = timeUsed % 60;
    const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    // 更新結果標題和圖標
    const resultIcon = document.getElementById('result-icon');
    const resultTitle = document.getElementById('result-title');
    
    if (score >= 90) {
        resultIcon.textContent = '🏆';
        resultTitle.textContent = '優秀表現！';
    } else if (score >= 70) {
        resultIcon.textContent = '🎯';
        resultTitle.textContent = '表現良好！';
    } else if (score >= 60) {
        resultIcon.textContent = '📚';
        resultTitle.textContent = '繼續加油！';
    } else {
        resultIcon.textContent = '💪';
        resultTitle.textContent = '再接再厲！';
    }
    
    // 更新分數顯示
    scoreDisplay.innerHTML = `
        <div class="score ${getScoreClass(score)}">${score.toFixed(1)} 分</div>
        <div class="score-detail">答對 ${correctCount} 題 / 共 ${totalCount} 題</div>
    `;
    
    // 更新統計數據
    document.getElementById('correct-count').textContent = correctCount;
    document.getElementById('total-count').textContent = totalCount;
    document.getElementById('accuracy').textContent = `${score.toFixed(1)}%`;
    document.getElementById('time-used').textContent = timeString;
    
    // 更新詳細結果
    updateResultDetails();
    
    // 設置篩選功能
    setupResultFilter();
}

// 獲得分數等級
function getScoreClass(score) {
    if (score >= 90) return 'score-excellent';
    if (score >= 70) return 'score-good';
    if (score >= 60) return 'score-average';
    return 'score-poor';
}

// 更新結果詳細內容
function updateResultDetails() {
    resultDetails.innerHTML = '';
    examQuestions.forEach((question, index) => {
        const resultItem = document.createElement('div');
        resultItem.className = `result-item ${examAnswers[index] === question.correctAnswer ? 'correct' : 'incorrect'}`;
        resultItem.dataset.type = examAnswers[index] === question.correctAnswer ? 'correct' : 'incorrect';
        
        const isCorrect = examAnswers[index] === question.correctAnswer;
        const userAnswer = examAnswers[index] || '未作答';
        
        resultItem.innerHTML = `
            <div class="result-question">
                <strong>第 ${index + 1} 題</strong>
                <p>${question.question}</p>
            </div>
            <div class="result-answer">
                <span class="user-answer ${isCorrect ? 'correct' : 'incorrect'}">
                    您的答案：${userAnswer} ${isCorrect ? '✓' : '✗'}
                </span>
                <span class="correct-answer">
                    正確答案：${question.correctAnswer}
                </span>
            </div>
            ${!isCorrect ? `
                <div class="result-explanation">
                    <strong>解析：</strong>${question.explanation}
                </div>
            ` : ''}
        `;
        
        resultDetails.appendChild(resultItem);
    });
}

// 設置結果篩選
function setupResultFilter() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新按鈕狀態
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            const resultItems = document.querySelectorAll('.result-item');
            
            resultItems.forEach(item => {
                if (filter === 'all') {
                    item.style.display = 'block';
                } else {
                    item.style.display = item.dataset.type === filter ? 'block' : 'none';
                }
            });
        });
    });
}

// 重置模擬考
function resetExam() {
    if (confirm('確定要結束測驗嗎？您的進度將會遺失。')) {
        resetToModeSelection();
    }
}

// 初始化應用
document.addEventListener('DOMContentLoaded', init);