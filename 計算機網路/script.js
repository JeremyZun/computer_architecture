// 題目資料庫
const quizData = [
    { chapter: "第三章 OSI模型", question: "OSI 模型中將網路的架構定義成幾個層次？", options: ["四個層次", "五個層次", "七個層次", "以上皆非"], answer: 2 },
    { chapter: "第三章 OSI模型", question: "哪一層能將位元轉換成電的訊號？", options: ["實體層", "數據鏈路層", "網路層", "傳輸層"], answer: 0 },
    { chapter: "第三章 OSI模型", question: "在傳送的過程中，由較高層或較低層傳送的 PDU 會加上標頭，此程序稱為？", options: ["封裝", "解封裝", "分割", "多工"], answer: 0 },
    { chapter: "第三章 OSI模型", question: "OSI 最上面的三層在 Internet 協定堆疊中僅以單獨的一層表示被稱為？", options: ["表現層", "交談層", "應用層", "傳輸層"], answer: 2 },
    { chapter: "第三章 OSI模型", question: "OSI 的哪一層，其資料單位被稱為訊框(frame)？", options: ["實體層", "數據鏈路層", "網路層", "傳輸層"], answer: 1 },
    { chapter: "第三章 OSI模型", question: "電子郵件(e-mail)服務屬於 OSI 的哪一層？", options: ["表現層", "數據鏈路層", "應用層", "傳輸層"], answer: 2 },
    { chapter: "第三章 OSI模型", question: "哪一層可以使用訊框的標尾來進行錯誤偵測？", options: ["表現層", "數據鏈路層", "應用層", "傳輸層"], answer: 1 },
    { chapter: "第三章 OSI模型", question: "當資料封包從低層往它的上層移動的時候，標頭會被？", options: ["移除", "加入", "保留", "修改"], answer: 0 },
    { chapter: "第三章 OSI模型", question: "位於網路層和交談層之間的層稱為？", options: ["表現層", "數據鏈路層", "應用層", "傳輸層"], answer: 3 },
    { chapter: "第三章 OSI模型", question: "應用層是享受哪一層提供的服務？", options: ["實體層", "數據鏈路層", "網路層", "傳輸層"], answer: 3 },
    { chapter: "第四章 網路傳輸媒介與設備", question: "適用於 1000Base-T 乙太網路的雙絞線類別為？", options: ["類別 3", "類別 5", "類別 5e", "類別 6"], answer: 2 },
    { chapter: "第四章 網路傳輸媒介與設備", question: "多模光纖規格若為 62.5/125 代表傳導核心為？", options: ["125mm", "125μm", "62.5mm", "62.5μm"], answer: 3 },
    { chapter: "第四章 網路傳輸媒介與設備", question: "當橋接器收到訊框時，會根據橋接表中的目的 MAC 位址來決定訊框需不需要送到另一網路區段稱為？", options: ["過濾", "轉送", "路徑選擇", "以上皆非"], answer: 0 },
    { chapter: "第四章 網路傳輸媒介與設備", question: "會分割廣播網域為？", options: ["第 2 層交換器", "第 3 層交換器", "橋接器", "集線器"], answer: 1 },
    { chapter: "第四章 網路傳輸媒介與設備", question: "閘道器是運作在 OSI 模型中幾個層的網路設備？", options: ["3 個層", "4 個層", "5 個層", "7 個層"], answer: 3 },
    { chapter: "第四章 網路傳輸媒介與設備", question: "下列哪種設備可以分割碰撞區域，但不能分割廣播網域？", options: ["第 2 層交換器", "TDM", "集線器", "路由器"], answer: 0 },
    { chapter: "第四章 網路傳輸媒介與設備", question: "下列哪種設備具有一個廣播區域及一個碰撞區域？", options: ["第 2 層交換器", "MUX", "集線器", "以上皆可"], answer: 2 },
    { chapter: "第四章 網路傳輸媒介與設備", question: "下列哪種設備可以分割碰撞區域及廣播網域？", options: ["第 2 層交換器", "TDM", "集線器", "路由器"], answer: 3 },
    { chapter: "第四章 網路傳輸媒介與設備", question: "第 2 層交換器常以什麼技術分割廣播區域？", options: ["VLAN", "LAN", "MAN", "WAN"], answer: 0 },
    { chapter: "第四章 網路傳輸媒介與設備", question: "要解決廣播風暴問題，可以採取什麼方式來解決迴路造成的問題？", options: ["VLAN", "擴展樹(spanning tree)演算法", "第 2 層交換器", "以上皆非"], answer: 1 }
];

// DOM 元素
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const restartBtn = document.getElementById('restart-btn');
const optionsContainer = document.getElementById('options-container');
const questionText = document.getElementById('question-text');
const chapterTag = document.getElementById('chapter-tag');
const currentQSpan = document.getElementById('current-q');
const totalQSpan = document.getElementById('total-q');
const finalScoreSpan = document.getElementById('final-score');
const resultComment = document.getElementById('result-comment');

// 新增 DOM 元素：錯題審視相關
const reviewBtn = document.getElementById('review-btn');
const reviewContainer = document.getElementById('review-container');

// 狀態變數
let currentQuestionIndex = 0;
let userAnswers = []; // 紀錄使用者選擇的 index
let touchStartX = 0;
let touchEndX = 0;

// 初始化
function init() {
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    prevBtn.addEventListener('click', prevQuestion);
    restartBtn.addEventListener('click', resetQuiz);
    reviewBtn.addEventListener('click', toggleReview); // 綁定錯題按鈕
    
    // 鍵盤監聽
    document.addEventListener('keydown', handleKeyboard);
    
    // 觸控監聽
    const container = document.querySelector('.container');
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    totalQSpan.textContent = quizData.length;
}

// 開始測驗
function startQuiz() {
    userAnswers = new Array(quizData.length).fill(null);
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    loadQuestion();
}

// 載入題目
function loadQuestion() {
    const currentData = quizData[currentQuestionIndex];
    chapterTag.textContent = currentData.chapter;
    currentQSpan.textContent = currentQuestionIndex + 1;
    questionText.textContent = currentData.question;
    
    // 按鈕控制
    prevBtn.classList.toggle('hidden', currentQuestionIndex === 0);
    
    if (userAnswers[currentQuestionIndex] !== null) {
        nextBtn.classList.remove('hidden');
        nextBtn.textContent = (currentQuestionIndex === quizData.length - 1) ? "查看結果" : "下一題";
    } else {
        nextBtn.classList.add('hidden');
    }

    // 選項生成
    optionsContainer.innerHTML = '';
    currentData.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.classList.add('option-btn');
        button.textContent = option;
        button.dataset.index = index;
        button.onclick = selectOption;
        
        // 恢復作答狀態
        if (userAnswers[currentQuestionIndex] !== null) {
            button.disabled = true;
            const correctIndex = currentData.answer;
            const userIndex = userAnswers[currentQuestionIndex];
            
            if (index === correctIndex) button.classList.add('correct');
            if (index === userIndex && userIndex !== correctIndex) button.classList.add('wrong');
        }
        optionsContainer.appendChild(button);
    });
}

// 選擇答案
function selectOption(e) {
    const selectedBtn = e.target;
    const selectedIndex = parseInt(selectedBtn.dataset.index);
    userAnswers[currentQuestionIndex] = selectedIndex;
    loadQuestion();
}

// 翻頁邏輯
function nextQuestion() {
    if (userAnswers[currentQuestionIndex] === null) return;
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    } else {
        showResult();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

// 鍵盤與滑動
function handleKeyboard(e) {
    if (!quizScreen.classList.contains('active')) return;
    if (e.key === 'ArrowRight') nextQuestion();
    else if (e.key === 'ArrowLeft') prevQuestion();
    else if (['1','2','3','4'].includes(e.key) && userAnswers[currentQuestionIndex] === null) {
        const btn = optionsContainer.querySelectorAll('.option-btn')[parseInt(e.key)-1];
        if(btn) btn.click();
    }
}

function handleSwipe() {
    if (!quizScreen.classList.contains('active')) return;
    const threshold = 50;
    if (touchStartX - touchEndX > threshold) nextQuestion();
    if (touchEndX - touchStartX > threshold) prevQuestion();
}

// --- 顯示結果與錯題功能核心 ---

function showResult() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    
    let score = 0;
    let wrongCount = 0;

    // 清空舊的錯題列表
    reviewContainer.innerHTML = '';
    
    userAnswers.forEach((userIndex, qIndex) => {
        const qData = quizData[qIndex];
        if (userIndex === qData.answer) {
            score++;
        } else {
            // 處理錯題：加入列表
            wrongCount++;
            addWrongAnswerToReview(qData, userIndex, qIndex);
        }
    });

    const finalScore = Math.round((score / quizData.length) * 100);
    finalScoreSpan.textContent = finalScore;

    // 評語
    if (finalScore === 100) {
        resultComment.textContent = "太強了！完全正確！";
        reviewBtn.classList.add('hidden'); // 滿分不需要看錯題
    } else {
        reviewBtn.classList.remove('hidden'); // 顯示查看錯題按鈕
        reviewBtn.textContent = `查看錯題 (${wrongCount} 題)`; // 更新按鈕文字
        
        if (finalScore >= 80) resultComment.textContent = "優秀！觀念很清楚喔。";
        else if (finalScore >= 60) resultComment.textContent = "及格了，但還有進步空間。";
        else resultComment.textContent = "請再多複習一下筆記吧！";
    }
}

// 生成單個錯題 HTML
function addWrongAnswerToReview(qData, userIndex, qIndex) {
    const item = document.createElement('div');
    item.classList.add('review-item');
    
    // 處理未作答的情況 (雖然邏輯上不太會發生，但以防萬一)
    const userAnswerText = userIndex !== null ? qData.options[userIndex] : "未作答";
    const correctAnswerText = qData.options[qData.answer];

    item.innerHTML = `
        <div class="review-q">Q${qIndex + 1}. ${qData.question}</div>
        <div class="review-ans user">
            <span class="review-label">你的答案：</span>
            <span>${userAnswerText}</span>
        </div>
        <div class="review-ans correct">
            <span class="review-label">正確答案：</span>
            <span>${correctAnswerText}</span>
        </div>
    `;
    reviewContainer.appendChild(item);
}

// 切換錯題列表顯示/隱藏
function toggleReview() {
    if (reviewContainer.classList.contains('hidden')) {
        reviewContainer.classList.remove('hidden');
        reviewBtn.textContent = "隱藏錯題";
    } else {
        reviewContainer.classList.add('hidden');
        // 恢復按鈕文字需重新計算，這裡簡化處理直接改回查看
        const wrongCount = quizData.length - userAnswers.filter((a, i) => a === quizData[i].answer).length;
        reviewBtn.textContent = `查看錯題 (${wrongCount} 題)`;
    }
}

// 重置測驗
function resetQuiz() {
    currentQuestionIndex = 0;
    userAnswers = [];
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
    
    // 重置錯題區塊
    reviewContainer.classList.add('hidden');
    reviewContainer.innerHTML = '';
}

// 啟動程式
init();