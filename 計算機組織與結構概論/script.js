// 題目資料庫
const quizData = [
    {
        question: "1. 下列何種記憶體具有揮發性(Volatile)，且通常用作電腦的主記憶體？",
        options: ["ROM", "Flash Memory", "DRAM", "EEPROM"],
        answer: 2,
        explanation: "DRAM (Dynamic RAM)是主記憶體，具揮發性；ROM、Flash、EEPROM都是非揮發性。"
    },
    {
        question: "2. 關於快取記憶體(Cache Memory)的設計，下列敘述何者錯誤？",
        options: [
            "空間區域性(Spatial Locality)指的是如果一個記憶體位置被存取，則其附近的記憶體位置很可能接著被存取。",
            "直接映射(Direct Mapped)方式的硬體設計最簡單，但容易發生衝突失誤(Conflict Miss)。",
            "時間區域性(Temporal Locality)指的是如果一個記憶體位置被存取，則該位置很可能在短時間內再次被存取。",
            "全相關映射(Fully Associative Mapped)的設計中，每個區塊只能對應到快取中的特定一列。"
        ],
        answer: 3,
        explanation: "全相關映射的特點是任一主記憶體區塊可對應到快取中的任一列。選項(D)的敘述是直接映射的特點。"
    },
    {
        question: "3. 在虛擬記憶體(Virtual Memory)系統中，當CPU產生一個虛擬位址(Virtual Address)，轉換成實體位址(Physical Address)時，通常會利用哪一個硬體元件來加速轉換？",
        options: ["暫存器(Register)", "算術邏輯單元(ALU)", "轉譯後備緩衝區(TLB)", "程式計數器(PC)"],
        answer: 2,
        explanation: "TLB (Translation Lookaside Buffer)是一個小型、高速的快取，專門用於加速虛擬位址到實體位址的轉譯。"
    },
    {
        question: "4. 相較於靜態隨機存取記憶體(SRAM)，動態隨機存取記憶體(DRAM)的主要缺點是什麼？",
        options: ["存取速度較快", "需要定時刷新(Refresh)電路以維持資料", "體積較大，成本較高", "具有非揮發性"],
        answer: 1,
        explanation: "DRAM 使用電容儲存電荷，電荷會隨時間洩漏，故需定時刷新；SRAM 使用鎖存器，不需要刷新且速度較快，但成本高且體積大。"
    },
    {
        question: "5. 在快取記憶體發生寫入操作(Write Operation)時，若資料同時寫入快取和主記憶體，此策略稱為？",
        options: ["寫回法(Write-Back)", "寫入法(Write-Through)", "寫入分配(Write-Allocate)", "不寫入分配(No-Write-Allocate)"],
        answer: 1,
        explanation: "寫入法(Write-Through)：同時寫入快取和主記憶體；寫回法(Write-Back)：只寫入快取，當區塊被替換時才寫回主記憶體。"
    },
    {
        question: "6. 下列哪一種記憶體技術主要使用電荷來儲存資料，並需要額外的高電壓才能執行寫入/清除操作？",
        options: ["SRAM", "DRAM", "Flash Memory", "PROM"],
        answer: 2,
        explanation: "Flash Memory (快閃記憶體)是一種非揮發性記憶體，使用浮動閘極電晶體，需要高電壓來擦除或寫入資料。"
    },
    {
        question: "7. 下列關於記憶體階層(Memory Hierarchy)的描述，何者符合一般原則？",
        options: [
            "容量越小、速度越慢、每位元成本越低。",
            "容量越大、速度越快、每位元成本越高。",
            "離CPU越近(上層)的記憶體，容量越小、速度越快、每位元成本越高。",
            "離CPU越遠(下層)的記憶體，容量越小、速度越慢、每位元成本越高。"
        ],
        answer: 2,
        explanation: "記憶體階層中，越靠近CPU的記憶體(上層)，速度越快、容量越小、單位成本越高。"
    },
    {
        question: "8. 當CPU正在執行程式時，若發生了一件需要CPU立即處理的外部事件(External Event)，例如鍵盤輸入，此事件會觸發何種機制？",
        options: ["輪詢(Polling)", "匯流排仲裁(Bus Arbitration)", "中斷(Interrupt)", "直接記憶體存取(DMA)"],
        answer: 2,
        explanation: "中斷是硬體訊號，用來通知CPU發生了需要立即處理的事件，讓CPU暫停當前工作去處理該事件。"
    },
    {
        question: "9. 在中斷服務常式(ISR)執行前，CPU必須將哪些資訊儲存起來，以便中斷處理完成後能正確返回被中斷的程式繼續執行？",
        options: ["程式計數器(PC)和所有通用暫存器", "僅儲存中斷向量", "僅儲存堆疊指標(SP)", "僅儲存中斷請求訊號"],
        answer: 0,
        explanation: "為了能從中斷處正確返回，CPU必須保存被中斷點的位址(PC)和所有可能被 ISR 改變的暫存器狀態。"
    },
    {
        question: "10. 下列哪一種中斷類型是由硬體設備所發出，用來請求CPU的服務？",
        options: ["軟體中斷(Software Interrupt)", "例外(Exception)", "外部中斷(External Interrupt)", "陷阱(Trap)"],
        answer: 2,
        explanation: "外部中斷是由計時器、I/O裝置等CPU外部硬體所發出；軟體中斷和陷阱/例外是由指令執行或程式錯誤所觸發。"
    },
    {
        question: "11. 中斷向量(Interrupt Vector)的主要功能是什麼？",
        options: [
            "儲存中斷服務常式(ISR)的程式碼。",
            "儲存CPU在發生中斷時的狀態資訊。",
            "提供一個表格，其中包含各個中斷來源對應的ISR起始位址。",
            "用來控制中斷訊號的優先權。"
        ],
        answer: 2,
        explanation: "中斷向量是一個位址表格，每個條目儲存一個中斷服務常式的入口位址。"
    },
    {
        question: "12. 為了處理多個同時發生的中斷請求，通常會使用什麼機制來決定CPU應優先處理哪一個中斷？",
        options: ["中斷向量表", "中斷仲裁器或中斷控制器", "程式計數器", "記憶體管理單元(MMU)"],
        answer: 1,
        explanation: "中斷控制器負責接收多個中斷請求，並依據優先權決定哪個請求可以發送給CPU。"
    },
    {
        question: "13. 當程式執行過程中發生除以零(Division by Zero)錯誤時，這屬於哪一種類型的中斷/事件？",
        options: ["外部中斷", "軟體中斷", "陷阱/例外(Trap/Exception)", "I/O 中斷"],
        answer: 2,
        explanation: "除以零、無效指令、記憶體存取違規等，都是程式執行時的內部錯誤，屬於陷阱(Trap)或例外(Exception)。"
    },
    {
        question: "14. 在三種主要的I/O控制方式中，哪一種方式的CPU負擔最重，且效率最低？",
        options: ["程式控制 I/O (Programmed I/O)", "中斷驅動 I/O (Interrupt-Driven I/O)", "直接記憶體存取(DMA)", "匯流排主控(Bus Mastering)"],
        answer: 0,
        explanation: "程式控制 I/O需CPU不斷檢查I/O裝置的狀態暫存器(輪詢)，直到裝置就緒，佔用CPU資源最多。"
    },
    {
        question: "15. 直接記憶體存取(DMA)的主要目的是什麼？",
        options: [
            "讓CPU更有效率地執行運算。",
            "讓I/O裝置與記憶體之間可以直接傳輸資料，減少 CPU介入。",
            "提供I/O裝置一個唯一的位址。",
            "讓I/O裝置可以直接讀寫快取記憶體。"
        ],
        answer: 1,
        explanation: "DMA的核心思想是將大批量的I/O 資料傳輸工作交由DMA 控制器完成，從而解放CPU。"
    },
    {
        question: "16. 在記憶體映射 I/O (Memory-Mapped I/O)的架構中，CPU如何讀取或寫入I/O裝置的控制暫存器？",
        options: [
            "使用特殊的I/O指令。",
            "將控制暫存器視為一般記憶體位址來存取。",
            "透過中斷服務常式。",
            "僅能由DMA 控制器存取。"
        ],
        answer: 1,
        explanation: "在記憶體映射I/O中，I/O裝置的暫存器被分配在記憶體位址空間，CPU使用Load/Store等一般記憶體存取指令來操作。"
    },
    {
        question: "17. 在中斷驅動I/O方式中，I/O裝置在完成資料傳輸後，如何通知CPU？",
        options: [
            "I/O裝置發出中斷請求訊號給CPU。",
            "CPU不斷地輪詢(Polling)I/O 裝置的狀態暫存器。",
            "I/O裝置直接更新程式計數器。",
            "I/O裝置直接寫入主記憶體。"
        ],
        answer: 0,
        explanation: "中斷驅動 I/O 方式下，CPU不輪詢，只有I/O 裝置完成工作後發出中斷訊號才會通知 CPU。"
    },
    {
        question: "18. DMA 控制器在進行資料傳輸時，需要向CPU請求匯流排的控制權(Bus Ownership)。這種請求通常是透過什麼訊號完成的？",
        options: ["INTR (Interrupt Request)", "IOREAD (I/O Read)", "HOLD (Bus Request)", "RESET (Reset)"],
        answer: 2,
        explanation: "DMA 控制器發出 HOLD(或其他類似訊號，如Bus Request)請求匯流排控制權，CPU則回覆 HLDA (Hold Acknowledge)表示同意釋放。"
    },
    {
        question: "19. 下列關於I/O介面的描述，何者最正確？",
        options: [
            "I/O介面僅負責資料格式轉換。",
            "I/O介面是CPU與外部裝置之間的橋樑，負責位址解碼、資料緩衝、狀態控制等功能。",
            "I/O介面只在DMA模式下才使用。",
            "I/O介面主要功能是提供電源給周邊裝置。"
        ],
        answer: 1,
        explanation: "I/O介面卡是 I/O 裝置與系統匯流排之間的轉譯層，提供必要的緩衝、位址/指令解碼和狀態控制。"
    },
    {
        question: "20. 在多個DMA控制器競爭使用系統匯流排時，需要有一個機制來決定誰可以使用。這屬於匯流排仲裁(Bus Arbitration)的哪一類問題？",
        options: ["優先權設定", "I/O位址映射", "中斷處理", "快取一致性"],
        answer: 0,
        explanation: "匯流排仲裁主要在解決多個主控者(Master)競爭匯流排控制權的問題，通常根據優先權來決定。"
    },
    {
        question: "21. 關於磁碟(Hard Disk Drive, HDD)的結構，下列敘述何者錯誤？",
        options: [
            "磁軌(Track)是同心圓，每一磁軌又劃分成數個扇區(Sector)。",
            "磁頭(Head)用來讀取/寫入資料。",
            "磁柱(Cylinder)是所有碟片上具有相同磁軌編號的集合。",
            "存取資料時，主要的時間延遲來自於讀寫頭的移動(尋道時間)與碟片的轉動(旋轉延遲)，而資料傳輸時間通常是最長的。"
        ],
        answer: 3,
        explanation: "在磁碟存取中，尋道時間(Seek Time)和旋轉延遲(Rotational Latency)是主要的延遲來源，資料傳輸時間通常最短。"
    },
    {
        question: "22. 固態硬碟(Solid State Drive, SSD)主要使用哪一種非揮發性記憶體晶片來儲存資料？",
        options: ["DRAM", "SRAM", "Flash Memory", "PROM"],
        answer: 2,
        explanation: "SSD 使用 NAND型 Flash Memory，是一種非揮發性的電子儲存介質。"
    },
    {
        question: "23. 在檔案系統中，下列哪一種檔案配置方法可能導致外部碎裂(External Fragmentation)的問題？",
        options: ["連續配置(Contiguous Allocation)", "連結配置(Linked Allocation)", "索引配置(Indexed Allocation)", "記憶體映射配置"],
        answer: 0,
        explanation: "連續配置要求檔案佔用連續的磁碟區塊，當檔案被刪除或修改時，容易在已配置區塊中產生無法利用的小空洞，即外部碎裂。"
    },
    {
        question: "24. RAID (Redundant Array of Independent Disks)的主要目的是什麼？",
        options: [
            "僅為了提升單一磁碟的容量。",
            "透過將資料分散儲存在多個磁碟上，以提高效能(Performance)和/或提供容錯(Fault Tolerance)能力。",
            "僅為了降低單一磁碟的成本。",
            "取代傳統CPU的功能。"
        ],
        answer: 1,
        explanation: "RAID 通過資料冗餘(Redundancy)提升容錯能力，通過資料條帶化(Striping)提升I/O效能。"
    },
    {
        question: "25. 關於檔案系統(File System)的功能，下列何者不屬於其核心職責？",
        options: [
            "管理檔案的儲存空間(配置與釋放)。",
            "提供使用者介面(User Interface)供使用者操作。",
            "提供檔案的邏輯視圖(Logical View)，將實體儲存細節隱藏。",
            "實現檔案的安全與存取控制。"
        ],
        answer: 1,
        explanation: "檔案系統是作業系統(OS)的一部分，主要負責儲存管理、命名和抽象化。提供使用者介面是作業系統的殼層(Shell)或應用程式的工作。"
    },
    {
        question: "26. RAID-1 級別的設計，其主要特點是什麼？",
        options: [
            "採用同位元檢查(Parity Check)來進行容錯。",
            "採用鏡像(Mirroring)技術，將資料完全複製到另一個磁碟。",
            "採用條帶化(Striping)技術，但不包含容錯功能。",
            "至少需要三個磁碟。"
        ],
        answer: 1,
        explanation: "RAID-1 稱為鏡像陣列(Mirrored Array)，將資料完全複製到兩組磁碟，提供高容錯性，但磁碟空間利用率低(50%)。"
    },
    {
        question: "27. 關於檔案屬性(File Attributes)的描述，下列何者最常見？",
        options: [
            "僅包含檔案的名稱和大小。",
            "通常包含檔案的名稱、類型、大小、建立/修改日期、擁有者與存取權限等。",
            "檔案屬性只儲存在主記憶體中。",
            "檔案屬性會隨著程式執行而改變。"
        ],
        answer: 1,
        explanation: "檔案屬性是 OS 用來描述和控制檔案的元資料(Metadata)，涵蓋了檔案的各種基本資訊與安全控制資訊。"
    },
    {
        question: "28. 下列哪一種介面標準主要用於連接高速、多用途的外部裝置，例如印表機、隨身碟、鍵盤、滑鼠等，並支援熱插拔(Hot Swapping)？",
        options: ["RS-232", "Parallel Port (並列埠)", "USB (Universal Serial Bus)", "PS/2"],
        answer: 2,
        explanation: "USB(通用串列匯流排)具有高速、可熱插拔和通用性強的特點，已成為最主要的外部裝置介面。"
    },
    {
        question: "29. 在視訊系統中，像素(Pixel)的色彩深度(Color Depth)通常是用什麼來衡量？",
        options: ["解析度(Resolution)", "螢幕尺寸(Screen Size)", "位元數(Bits)，例如8-bit、24-bit。", "垂直刷新率(Refresh Rate)"],
        answer: 2,
        explanation: "色彩深度(Color Depth)是指用多少位元(Bit)來表示一個像素的顏色。例如24-bit 可表示 2^24 種顏色。"
    },
    {
        question: "30. 下列哪一個介面標準是目前電腦連接顯示卡(Graphics Card)和主機板最常見且高速的介面？",
        options: ["ISA", "PCI", "PCIe (PCI Express)", "AGP"],
        answer: 2,
        explanation: "PCIe (PCI Express)是目前主流的內部高速序列匯流排，用於連接顯示卡、高速SSD等裝置。"
    },
    {
        question: "31. 關於鍵盤與滑鼠，下列哪一種介面標準在現代電腦中已逐漸被 USB 取代？",
        options: ["HDMI", "SATA", "PS/2", "Ethernet"],
        answer: 2,
        explanation: "PS/2 是早期的鍵盤與滑鼠連接埠，已被更通用的 USB 介面取代。"
    },
    {
        question: "32. 網路介面卡 (Network Interface Card, NIC)在OSI模型的哪一層中扮演主要角色？",
        options: ["應用層", "網路層", "資料連結層(Data Link Layer)和實體層(Physical Layer)", "傳輸層"],
        answer: 2,
        explanation: "NIC 處理實體層的傳輸介質信號，以及資料連結層的MAC位址定址、錯誤偵測和成幀(Framing)等功能。"
    },
    {
        question: "33. 觸控螢幕(Touch Screen)是一種典型的雙向(Bi-Directional)周邊裝置，因為它同時具備了哪兩種功能？",
        options: ["僅輸出功能", "僅輸入功能", "輸入(Input) 和輸出(Output) 功能", "僅儲存功能"],
        answer: 2,
        explanation: "觸控螢幕允許使用者輸入(觸控)指令，同時也作為輸出(顯示)裝置。"
    },
    {
        question: "34. 嵌入式系統(Embedded System)與通用電腦(General Purpose Computer)之間最根本的差異是什麼？",
        options: [
            "嵌入式系統沒有CPU。",
            "嵌入式系統通常專門為一個或少數幾個特定功能設計，而通用電腦則追求多功能性。",
            "嵌入式系統一定比通用電腦慢。",
            "嵌入式系統不使用作業系統。"
        ],
        answer: 1,
        explanation: "嵌入式系統的關鍵特性是功能專一性，它不是設計來執行多種任務，而是專注於特定的控制、監測或處理功能。"
    },
    {
        question: "35. 在嵌入式系統中，下列哪一種記憶體通常用來儲存韌體(Firmware)，且資料在斷電後仍能保存？",
        options: ["SRAM", "DRAM", "ROM(或Flash Memory)", "暫存器"],
        answer: 2,
        explanation: "韌體是系統啟動和控制的程式碼，需要永久儲存，故使用非揮發性記憶體，如ROM、EEPROM 或更常見的Flash Memory。"
    },
    {
        question: "36. 許多嵌入式系統，特別是需要即時反應(Real-Time Response)的系統，會使用哪一種類型的作業系統？",
        options: ["Windows", "Linux", "即時作業系統(RTOS)", "DOS"],
        answer: 2,
        explanation: "RTOS (Real-Time Operating System)專為需要在嚴格時間限制內完成任務的系統設計，是許多嵌入式系統的選擇。"
    },
    {
        question: "37. 在單晶片微控制器(Microcontroller Unit, MCU)中，下列哪一個元件通常是整合在晶片內部，而非像通用電腦那樣作為獨立元件存在？",
        options: ["CPU核心", "記憶體(RAM/ROM)", "I/O 周邊(如計時器、ADC/DAC)", "以上皆是"],
        answer: 3,
        explanation: "MCU(微控制器)是一個將CPU核心、記憶體(RAM/ROM)和I/O 周邊(如計時器、串列埠)整合在單一晶片上的電腦系統。"
    },
    {
        question: "38. 看門狗計時器(Watchdog Timer)在嵌入式系統中的主要作用是什麼？",
        options: [
            "監控CPU溫度。",
            "用於定時鬧鐘功能。",
            "在系統因軟體錯誤或故障而當機時，自動重置(Reset)系統。",
            "測量程式執行的時間。"
        ],
        answer: 2,
        explanation: "看門狗計時器是一種失效安全(Fail-Safe)機制，如果系統在預定時間內沒有「餵狗」(刷新計時器)，則計時器會溢位並發出重置訊號。"
    },
    {
        question: "39. 嵌入式系統設計中，常需要考量功耗(Power Consumption)的原因是什麼？",
        options: [
            "為了提高運算速度。",
            "功耗與體積無關。",
            "許多嵌入式設備是電池供電，需要長時間運行。",
            "降低功耗可以提高解析度。"
        ],
        answer: 2,
        explanation: "許多嵌入式設備(如手機、穿戴裝置、感測器)依賴電池供電，功耗管理是延長運行時間的首要考量。"
    },
    {
        question: "40. 許多嵌入式系統中使用的A/D 轉換器(Analog-to-Digital Converter, ADC)的作用是什麼？",
        options: [
            "將數位訊號轉換為類比訊號輸出。",
            "將外界感測到的類比訊號轉換為數位訊號供微處理器處理。",
            "儲存程式碼。",
            "執行算術運算。"
        ],
        answer: 1,
        explanation: "ADC的功能是將類比訊號(如溫度、壓力等感測器訊號)轉換為數位訊號，供微處理器(Digital Processor)進行數位處理。"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let hasAnswered = false;
let wrongAnswers = []; // 儲存錯題資料 { index: 0, userChoice: 1 }

// DOM 元素
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options-container');
const progressEl = document.getElementById('progress');
const questionCountEl = document.getElementById('question-count');
const scoreEl = document.getElementById('score-display');
const feedbackArea = document.getElementById('feedback-area');
const feedbackMessage = document.getElementById('feedback-message');
const explanationText = document.getElementById('explanation-text');
const nextBtn = document.getElementById('next-btn');
const quizContainer = document.getElementById('quiz-container');
const resultContainer = document.getElementById('result-container');
const reviewContainer = document.getElementById('review-container');
const finalScoreEl = document.getElementById('final-score');
const resultMessageEl = document.getElementById('result-message');
const reviewBtn = document.getElementById('review-btn');
const reviewList = document.getElementById('review-list');

// 初始化測驗
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    wrongAnswers = []; // 重置錯題
    quizContainer.classList.remove('hidden');
    resultContainer.classList.add('hidden');
    reviewContainer.classList.add('hidden');
    updateScore();
    loadQuestion();
}

// 載入題目
function loadQuestion() {
    hasAnswered = false;
    feedbackArea.classList.add('hidden');
    nextBtn.textContent = "下一題";
    
    const currentQuestion = quizData[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';

    // 更新進度
    const progressPercent = ((currentQuestionIndex) / quizData.length) * 100;
    progressEl.style.width = `${progressPercent}%`;
    questionCountEl.textContent = `題目: ${currentQuestionIndex + 1} / ${quizData.length}`;

    // 建立選項按鈕
    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = `(${String.fromCharCode(65 + index)}) ${option}`;
        button.classList.add('option-btn');
        button.setAttribute('tabindex', '0'); 
        button.addEventListener('click', () => selectOption(index, button));
        optionsContainer.appendChild(button);
    });
}

// 選擇答案
function selectOption(selectedIndex, selectedButton) {
    if (hasAnswered) return;
    hasAnswered = true;

    const currentQuestion = quizData[currentQuestionIndex];
    const correctIndex = currentQuestion.answer;
    const buttons = optionsContainer.getElementsByClassName('option-btn');

    // 顯示對錯樣式
    if (selectedIndex === correctIndex) {
        selectedButton.classList.add('correct');
        feedbackMessage.innerHTML = '<span style="color: #27ae60; font-size: 1.2rem; font-weight: bold;">✅ 答對了！</span>';
        score++;
        updateScore();
    } else {
        selectedButton.classList.add('wrong');
        buttons[correctIndex].classList.add('correct'); 
        feedbackMessage.innerHTML = '<span style="color: #e74c3c; font-size: 1.2rem; font-weight: bold;">❌ 答錯了！</span>';
        
        // 紀錄錯題
        wrongAnswers.push({
            index: currentQuestionIndex,
            userChoice: selectedIndex
        });
    }

    // 顯示詳解
    explanationText.textContent = currentQuestion.explanation;
    feedbackArea.classList.remove('hidden');

    if (currentQuestionIndex === quizData.length - 1) {
        nextBtn.textContent = "查看結果";
    }

    nextBtn.focus();
}

// 下一題功能
function handleNext() {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

nextBtn.addEventListener('click', handleNext);

// 更新分數顯示
function updateScore() {
    scoreEl.textContent = `得分: ${score}`;
}

// 顯示結果
function showResult() {
    quizContainer.classList.add('hidden');
    resultContainer.classList.remove('hidden');
    
    const percentage = Math.round((score / quizData.length) * 100);
    finalScoreEl.textContent = `${score} / ${quizData.length} (${percentage}分)`;
    
    let message = "";
    if (percentage === 100) {
        message = "太強了！完全制霸！ 🎉";
    } else if (percentage >= 80) {
        message = "很棒的成績！繼續保持！ 👍";
    } else if (percentage >= 60) {
        message = "及格了，但還有進步空間喔。 💪";
    } else {
        message = "加油，建議多複習一下題庫。 📚";
    }
    resultMessageEl.textContent = message;

    // 如果有錯題，顯示「檢視錯題」按鈕
    if (wrongAnswers.length > 0) {
        reviewBtn.classList.remove('hidden');
    } else {
        reviewBtn.classList.add('hidden');
    }
}

// 檢視錯題功能
reviewBtn.addEventListener('click', () => {
    resultContainer.classList.add('hidden');
    reviewContainer.classList.remove('hidden');
    renderReview();
});

// 渲染錯題列表
function renderReview() {
    reviewList.innerHTML = ''; // 清空舊內容

    wrongAnswers.forEach((item) => {
        const questionData = quizData[item.index];
        const card = document.createElement('div');
        card.classList.add('review-card');

        // 題目標題
        const title = document.createElement('div');
        title.classList.add('review-question');
        title.textContent = questionData.question;
        card.appendChild(title);

        // 選項
        questionData.options.forEach((opt, idx) => {
            const optionDiv = document.createElement('div');
            optionDiv.textContent = `(${String.fromCharCode(65 + idx)}) ${opt}`;
            optionDiv.classList.add('review-option');

            if (idx === item.userChoice) {
                optionDiv.classList.add('your-answer'); // 你的錯誤答案
                optionDiv.innerHTML += ' ❌ (你的答案)';
            }
            if (idx === questionData.answer) {
                optionDiv.classList.add('correct-answer'); // 正確答案
                optionDiv.innerHTML += ' ✅ (正確答案)';
            }

            card.appendChild(optionDiv);
        });

        // 詳解
        const expDiv = document.createElement('div');
        expDiv.classList.add('review-explanation');
        expDiv.innerHTML = `<strong>詳解：</strong>${questionData.explanation}`;
        card.appendChild(expDiv);

        reviewList.appendChild(card);
    });
}

// 重新測驗
function restartQuiz() {
    startQuiz();
}

// 鍵盤支援
document.addEventListener('keydown', (e) => {
    if (quizContainer.classList.contains('hidden')) {
        // 如果在結果頁面，按 Enter 重新測驗
        if (!resultContainer.classList.contains('hidden') && e.key === 'Enter') {
            restartQuiz();
        }
        return;
    }

    const key = e.key.toLowerCase();
    const buttons = document.querySelectorAll('.option-btn');

    if (!hasAnswered) {
        if ((key === '1' || key === 'a') && buttons[0]) buttons[0].click();
        if ((key === '2' || key === 'b') && buttons[1]) buttons[1].click();
        if ((key === '3' || key === 'c') && buttons[2]) buttons[2].click();
        if ((key === '4' || key === 'd') && buttons[3]) buttons[3].click();
    } else {
        if (key === 'enter' || key === 'arrowright') {
            handleNext();
        }
    }
});

// 啟動程式
startQuiz();