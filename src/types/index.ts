// Question Types
export type QuestionType = 'text_answer' | 'multiple_choice' | 'true_false' | 'closest_number' | 'image';

export interface BaseQuestion {
  id?: string;
  type: QuestionType;
  question: string;
  answer: string;
  explanation?: string;
  points: number;
}

export interface TextAnswerQuestion extends BaseQuestion {
  type: 'text_answer';
}

export interface MultipleChoiceQuestion extends BaseQuestion {
  type: 'multiple_choice';
  options: string[];
  answer: string; // Should be one of the options
}

export interface TrueFalseQuestion extends BaseQuestion {
  type: 'true_false';
  answer: 'true' | 'false';
}

export interface ClosestNumberQuestion extends BaseQuestion {
  type: 'closest_number';
  answer: string; // The target number as string
  scoring_type: 'closest';
}

export interface ImageQuestion extends BaseQuestion {
  type: 'image';
  image_path: string;
}

export type Question = TextAnswerQuestion | MultipleChoiceQuestion | TrueFalseQuestion | ClosestNumberQuestion | ImageQuestion;

// Round and Game Pack Types
export interface Round {
  id?: number;
  pack_id?: number;
  round_number: number;
  theme_name: string;
  theme_description?: string;
  questions: Question[];
  usage_count?: number;
  last_used?: string;
}

export interface GamePack {
  id?: number;
  name: string;
  version: string;
  author: string;
  description?: string;
  total_rounds: number;
  rounds?: Round[];
  active?: boolean;
  created_at?: string;
}

// Team Types
export interface Team {
  id?: number;
  name: string;
  total_games?: number;
  total_wins?: number;
  win_percentage?: number;
  created_at?: string;
  last_played?: string;
}

export interface TeamScore {
  team_id: number;
  team_name: string;
  current_score: number;
  round_score: number;
}

// Game State Types
export type GamePhase = 'setup' | 'round_intro' | 'question' | 'answer_reveal' | 'score_entry' | 'leaderboard' | 'game_complete';

export interface GameState {
  id?: number;
  pack: GamePack;
  teams: Team[];
  current_round: number;
  current_question: number;
  current_phase: GamePhase;
  rounds: Round[];
  scores: TeamScore[];
  completed_rounds: number;
  total_rounds: number;
  game_id?: number;
}

// Game Session Types
export interface GameSession {
  id?: number;
  date?: string;
  pack_id: number;
  winning_team_id?: number;
  completed_rounds: number;
  total_rounds: number;
}

export interface RoundScores {
  game_id: number;
  round_number: number;
  team_scores: Record<number, number>; // team_id -> score
}

// UI State Types
export interface AppState {
  current_game: GameState | null;
  available_packs: GamePack[];
  available_teams: Team[];
  is_fullscreen: boolean;
  settings: AppSettings;
}

export interface AppSettings {
  auto_advance: boolean;
  sound_enabled: boolean;
  theme: 'light' | 'dark';
  font_size: 'normal' | 'large' | 'extra_large';
}

// Import/Export Types
export interface ImportableGamePack {
  name: string;
  version: string;
  author: string;
  description?: string;
  rounds: {
    theme: string;
    description?: string;
    questions: Question[];
  }[];
}

// Database result types
export interface DatabaseGamePack {
  id: number;
  name: string;
  version: string;
  author: string;
  description?: string;
  total_rounds: number;
  active: boolean;
  created_at: string;
}

export interface DatabaseRound {
  id: number;
  pack_id: number;
  round_number: number;
  theme_name: string;
  theme_description?: string;
  questions_json: string;
  usage_count: number;
  last_used?: string;
}

export interface DatabaseTeam {
  id: number;
  name: string;
  total_games: number;
  total_wins: number;
  win_percentage?: number;
  created_at: string;
  last_played?: string;
}

// Event types for game flow
export interface GameEvent {
  type: 'NEXT_QUESTION' | 'NEXT_ROUND' | 'SHOW_ANSWERS' | 'ENTER_SCORES' | 'SHOW_LEADERBOARD' | 'END_GAME';
  payload?: unknown;
}

// Keyboard navigation
export interface KeyboardShortcut {
  key: string;
  action: () => void;
  description: string;
}