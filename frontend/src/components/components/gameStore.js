import { create } from 'zustand';
import { getRandomWords } from './wordUtils';

const useGameStore = create((set) => ({
  score: 0,
  currentLevel: 1,
  targetWord: getRandomWords(1)[0],
  options: getRandomWords(4),
  isCorrect: null,
  incrementScore: () => set((state) => ({ score: state.score + 1 })),
  setGameState: (newState) => set((state) => ({ ...state, ...newState })),
}));

export default useGameStore;