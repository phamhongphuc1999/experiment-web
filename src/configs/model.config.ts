// Train parameters
export const PLAY_EPISODES = 5; // 25 in the paper
export const MCTS_SEARCHES = 10;
export const MCTS_BATCH_SIZE = 8;
// export const MCTS_BATCH_SIZE = 24;
export const REPLAY_BUFFER = 20000; // 30000 in the paper
export const LEARNING_RATE = 1e-3;
export const BATCH_SIZE = 512;
export const TRAIN_ROUNDS = 10;
// export const TRAIN_ROUNDS = 20;
export const MIN_REPLAY_TO_TRAIN = 4000; // 10000 in the paper

export const BEST_NET_WIN_RATIO = 0.55;

export const EVALUATE_EVERY_STEP = 100;
export const EVALUATION_ROUNDS = 20;
export const STEPS_BEFORE_TAU_0 = 10;

// Play parameters
export const PLAY_MCTS_SEARCHES = 40;
export const PLAY_MCTS_BATCH_SIZE = 8;

// Telegram bot parameters
export const BOT_MCTS_SEARCHES = 40;
export const BOT_MCTS_BATCH_SIZE = 8;

// MCTS parameters
export const C_PUCT = 1.4;
export const ALPHA = 0.25;
export const EXPLORE = 0.3;

// Model parameters
export const NUM_FILTERS = 64;
