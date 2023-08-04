export const initialState = {
  playerName: null,
  score: 0,
  gameState: "menu",
  isLogin: false,
  questions: "",
  active_questionId: null,
  playerAnswers: {},
};

export function reducer(state, action) {
  switch (action.type) {
    case "game_state": {
      return {
        ...state,
        gameState: action.gameState,
      };
    }
    case "load_questions": {
      return {
        ...state,
        questions: action.loadQuestions,
      };
    }
    case "set_score": {
      return {
        ...state,
        score: action.score,
      };
    }
    case "add_name": {
      return {
        ...state,
        playerName: action.name,
      };
    }
    case "login": {
      return {
        ...state,
        isLogin: action.isLogin,
      };
    }
    case "active_question": {
      return {
        ...state,
        active_questionId: action.active_questionId,
      };
    }
    case "add_answer": {
      return {
        ...state,
        playerAnswers: {
          ...state.playerAnswers,
          [state.active_questionId]: action.answer,
        },
      };
    }

    case "remove_answer": {
      return {
        ...state,
        playerAnswers: {},
      };
    }
    default: {
      throw Error("Unknown action: " + action.type);
    }
  }
}
