// 計算機組織與結構題庫
const questions = [
    {
        id: 1,
        question: "下列哪一項不是計算機系統的主要組成部分？",
        options: [
            "A. 處理器 (CPU)",
            "B. 記憶體 (Memory)",
            "C. 作業系統 (Operating System)",
            "D. 網路線 (Network cable)"
        ],
        correctAnswer: "D",
        explanation: "計算機系統主要由處理器、記憶體、輸入/輸出裝置組成；網路線屬於外部設備。"
    },
    {
        id: 2,
        question: "在「由外而內」的抽象分層觀點中，下列哪一層最貼近使用者軟體？",
        options: [
            "A. 應用程式層",
            "B. 裝置驅動程式層",
            "C. 微架構層",
            "D. 電路層"
        ],
        correctAnswer: "A",
        explanation: "應用程式層最靠近使用者，其下是作業系統與硬體。"
    },
    {
        id: 3,
        question: "在電腦系統中，「指令」的意義是什麼？",
        options: [
            "A. 一個高階語言敘述",
            "B. 控制 CPU 執行一項操作的最小單元",
            "C. 一種輸入/輸出裝置",
            "D. 記憶體地址"
        ],
        correctAnswer: "B",
        explanation: "指令是 CPU 執行的最小控制單元。"
    },
    {
        id: 4,
        question: "關於計算機系統發展歷史，下列哪一段描述較正確？",
        options: [
            "A. 第一代電腦使用積體電路",
            "B. 第二代電腦使用真空管",
            "C. 第三代電腦開始使用積體電路",
            "D. 第四代電腦使用電晶體"
        ],
        correctAnswer: "C",
        explanation: "第三代開始使用積體電路。"
    },
    {
        id: 5,
        question: "在計算機系統中，「位元 (bit)」最常被定義為什麼？",
        options: [
            "A. 字元的最小單位",
            "B. 表示資料正／負號",
            "C. 二進位的一個位",
            "D. 儲存器中一個記憶體格"
        ],
        correctAnswer: "C",
        explanation: "bit 是 binary digit，即二進位的位。"
    },
    {
        id: 6,
        question: "效能通常用哪一個量度來表示比較直觀？",
        options: [
            "A. 執行時間",
            "B. 功耗",
            "C. 晶片面積",
            "D. 記憶體容量"
        ],
        correctAnswer: "A",
        explanation: "效能最直接的衡量是執行時間。"
    },
    {
        id: 7,
        question: "若機器 A 執行某程式需 10 秒，B 需 7 秒，B 相對 A 的加速比為多少？",
        options: [
            "A. 0.7",
            "B. 1.3",
            "C. 1.43",
            "D. 3"
        ],
        correctAnswer: "C",
        explanation: "Speedup = 10 ÷ 7 = 1.43。"
    },
    {
        id: 8,
        question: "根據 Amdahl 法則，若 40%不可加速，其餘可無限加速，最大加速比為何？",
        options: [
            "A. 2.5",
            "B. 1.67",
            "C. 1",
            "D. 1.43"
        ],
        correctAnswer: "A",
        explanation: "Speedup = 1 / (0.4 + 0.6/∞) = 2.5。"
    },
    {
        id: 9,
        question: "CPI 代表什麼？",
        options: [
            "A. 每秒執行指令數",
            "B. 平均每條指令的週期數",
            "C. 每條指令的記憶體存取次數",
            "D. 功耗指標"
        ],
        correctAnswer: "B",
        explanation: "CPI = 每條指令平均需的 clock 週期數。"
    },
    {
        id: 10,
        question: "2GHz CPU、CPI=1.5、1 億指令，執行時間為？",
        options: [
            "A. 0.075 秒",
            "B. 0.15 秒",
            "C. 0.2 秒",
            "D. 0.125 秒"
        ],
        correctAnswer: "A",
        explanation: "T = (1e8 × 1.5) / 2e9 = 0.075 秒。"
    },
    {
        id: 11,
        question: "指令格式通常包括哪幾個欄位？",
        options: [
            "A. 操作碼、操作數、標誌",
            "B. 操作碼、位址欄、註記",
            "C. 操作碼、操作數、位址",
            "D. 操作碼、時脈、功耗"
        ],
        correctAnswer: "C",
        explanation: "指令格式包含操作碼、操作數與位址。"
    },
    {
        id: 12,
        question: "RISC 結構傾向使用哪種特性？",
        options: [
            "A. 複雜定址模式",
            "B. 多種長度指令",
            "C. 大量複雜指令",
            "D. 固定長度指令、簡單操作"
        ],
        correctAnswer: "D",
        explanation: "RISC 採固定長度、簡單操作設計。"
    },
    {
        id: 13,
        question: "16 位元有號立即數範圍為何？",
        options: [
            "A. –32768 到 +32767",
            "B. 0 到 65535",
            "C. –2^15 到 2^15–1",
            "D. –32767 到 +32767"
        ],
        correctAnswer: "A",
        explanation: "範圍為 –32768 到 +32767。"
    },
    {
        id: 14,
        question: "指令集設計中「正交性」指什麼？",
        options: [
            "A. 指令成直角",
            "B. 可與各定址方式、資料型態自由組合",
            "C. 指令分組",
            "D. 一種操作碼"
        ],
        correctAnswer: "B",
        explanation: "指令能自由與定址、資料型態組合。"
    },
    {
        id: 15,
        question: "12 位元 signed offset (word 對齊) 的跳躍範圍為？",
        options: [
            "A. ±2^11×4 位元組",
            "B. ±2^12×4 位元組",
            "C. ±2^11×2 位元組",
            "D. ±2^12×2 位元組"
        ],
        correctAnswer: "A",
        explanation: "±2^11 個字 × 4 bytes。"
    },
    {
        id: 16,
        question: "two's complement 中 A–B 等於？",
        options: [
            "A. A+B",
            "B. A+B 的 1's 補數",
            "C. A+B 的 2's 補數",
            "D. A–B 的 2's 補數"
        ],
        correctAnswer: "C",
        explanation: "A–B = A + (B 的 2's 補數)。"
    },
    {
        id: 17,
        question: "Ripple-carry adder 缺點是？",
        options: [
            "A. 複雜",
            "B. 延遲長",
            "C. 無法減法",
            "D. 僅符號整數"
        ],
        correctAnswer: "B",
        explanation: "進位逐級傳遞造成延遲。"
    },
    {
        id: 18,
        question: "改善進位延遲的技術是？",
        options: [
            "A. 串波進位",
            "B. 前向進位",
            "C. 串接",
            "D. 預測進位"
        ],
        correctAnswer: "B",
        explanation: "Carry Lookahead 加速進位傳遞。"
    },
    {
        id: 19,
        question: "CLA 中 G_i=1 表示？",
        options: [
            "A. 要求進位輸入",
            "B. 一定產生進位",
            "C. 可傳遞進位",
            "D. 不產生進位"
        ],
        correctAnswer: "B",
        explanation: "該位不論輸入都會產生進位。"
    },
    {
        id: 20,
        question: "4 位 CLA 分 2 組時，上組是否需等下組？",
        options: [
            "A. 不需",
            "B. 可直接算",
            "C. 需等待下組進位",
            "D. 獨立"
        ],
        correctAnswer: "C",
        explanation: "上組需等下組進位輸出。"
    },
    {
        id: 21,
        question: "最簡單但效率低的乘法演算法？",
        options: [
            "A. Booth",
            "B. 除法乘法合併",
            "C. 逐位相加",
            "D. FFT 乘法"
        ],
        correctAnswer: "C",
        explanation: "逐位移位加法最簡單但慢。"
    },
    {
        id: 22,
        question: "Booth 演算法優點？",
        options: [
            "A. 減少部分乘法次數",
            "B. 提高除法效率",
            "C. 處理浮點",
            "D. 優化記憶體"
        ],
        correctAnswer: "A",
        explanation: "可合併連續 1，減少乘加操作。"
    },
    {
        id: 23,
        question: "乘法器中的加法樹用途？",
        options: [
            "A. 加總部分乘積",
            "B. 控制進位",
            "C. 處理符號位",
            "D. 儲存中間結果"
        ],
        correctAnswer: "A",
        explanation: "加法樹用於部分乘積相加。"
    },
    {
        id: 24,
        question: "除法器常用的演算法？",
        options: [
            "A. 長除法",
            "B. FFT 除法",
            "C. Booth 除法",
            "D. 中斷除法"
        ],
        correctAnswer: "A",
        explanation: "常見為恢復/非恢復長除法。"
    },
    {
        id: 25,
        question: "浮點乘法的主要步驟？",
        options: [
            "A. 指數相加、尾數相乘、規格化、捨入、檢查溢位",
            "B. 指數相乘、尾數相加",
            "C. 指數相加、尾數相加",
            "D. 指數相加、尾數相乘、捨入"
        ],
        correctAnswer: "A",
        explanation: "標準流程為指數相加、尾數相乘、規格化、捨入、檢查。"
    },
    {
        id: 26,
        question: "單週期 CPU 缺點？",
        options: [
            "A. 控制簡單",
            "B. 時脈需涵蓋最慢指令",
            "C. 過早完成",
            "D. 無法支援記憶體"
        ],
        correctAnswer: "B",
        explanation: "最慢指令決定整體週期長度。"
    },
    {
        id: 27,
        question: "多週期 CPU 優點？",
        options: [
            "A. 簡單指令快",
            "B. 複雜指令快",
            "C. 週期可縮短",
            "D. 共用週期"
        ],
        correctAnswer: "C",
        explanation: "多週期可縮短時脈週期。"
    },
    {
        id: 28,
        question: "處理器資料路徑元件？",
        options: [
            "A. 控制單元、ALU、暫存器檔、記憶體",
            "B. 顯示器、網卡",
            "C. 編譯器、作業系統",
            "D. 檔案系統"
        ],
        correctAnswer: "A",
        explanation: "基本組成為控制、ALU、暫存器、記憶體。"
    },
    {
        id: 29,
        question: "控制單元的輸出？",
        options: [
            "A. 指令本身",
            "B. 控制信號",
            "C. 資料",
            "D. 記憶體位址"
        ],
        correctAnswer: "B",
        explanation: "控制單元輸出控制信號給資料路徑。"
    },
    {
        id: 30,
        question: "分支指令需新增的單元？",
        options: [
            "A. 加法器計算分支目標",
            "B. 加法器算平方根",
            "C. 除法器算偏移",
            "D. 乘法器算位址"
        ],
        correctAnswer: "A",
        explanation: "分支指令需加法器以計算 PC+offset。"
    }
];