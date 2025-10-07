// GameConstant.js
export default class GameConstant {
    // ====== Power state ======
    static ENUM_STATE_POWER_NORMAL = 0;
    static ENUM_STATE_POWER_HAMMER = 1;
    static ENUM_STATE_POWER_SWITCH = 2;
    static ENUM_STATE_POWER_SUPPER_HAMMER = 3;

    // ====== Time & Slot ======
    static TOTAL_TIME_WEEKLY_CONTEST = 604800; // 7 ngày (giây)
    static MAX_SLOT_CAKE = 6;

    // ====== Cake state ======
    static NOT_COMPLETE_CAKE = 0;
    static COMPLETE_CAKE_WITH_ONLY_COLOR = 1;
    static COMPLETE_CAKE_WITH_OTHER_COLOR = 2;
    static UNCOMPLETE_CAKE_WITH_ONLY_COLOR = 3;
    static UNCOMPLETE_CAKE_WITH_OTHER_COLOR = 4;

    // ====== Index ======
    static LAST_CAKE_INDEX = 23;

    // ====== Biến runtime (có thể thay đổi) ======
    static IndexNewCake = 0;
    static CakeTutorial = 0;


    static GRAPHCAKE = {
        0: [1, 3, 4],   // đỉnh 0 có kề 1 và 2
        1: [0, 2, 4, 5],
        2: [1, 5, 6],
        3: [0, 4, 7],
        4: [0, 1, 3, 7, 8],   // đỉnh 0 có kề 1 và 2
        5: [1, 2, 6, 8, 9],
        6: [2, 5, 9],
        7: [3, 4, 10],
        8: [4, 5, 10,12],   // đỉnh 0 có kề 1 và 2
        9: [5, 6, 12],
        10: [7, 8, 11],
        11: [10, 12],
        12: [8, 9, 11],   // đỉnh 0 có kề 1 và 2
        // 13: [9, 17, 12, 14],
        // 14: [10, 18, 13, 15],
        // 15: [11, 19, 14],
        // 16: [12, 17],   // đỉnh 0 có kề 1 và 2
        // 17: [13, 16, 18],
        // 18: [14, 17, 19],
        // 19: [15, 18],
    }
}
