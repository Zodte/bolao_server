import actions from '../actions/actions'
const roundTable = (
  state={
    selectedRound: 2,
    sortBy: 'roundPosition',
    roundsByPlayer: [
      {
        "name": "Peck Oskarsson",
        "rounds": [
          {
            "round": 1,
            "roundPosition": 2,
            "roundPoints": 11,
            "roundPerfect": 2,
            "roundCorrect": 5,
            "roundMisses": 3
          },
          {
            "round": 2,
            "roundPosition": 1,
            "roundPoints": 12,
            "roundPerfect": 3,
            "roundCorrect": 3,
            "roundMisses": 4
          }
        ]
      },
      {
        "name": "Pedro Luis",
        "rounds": [
          {
            "round": 1,
            "roundPosition": 1,
            "roundPoints": 12,
            "roundPerfect": 2,
            "roundCorrect": 6,
            "roundMisses": 2
          },
          {
            "round": 2,
            "roundPosition": 2,
            "roundPoints": 8,
            "roundPerfect": 1,
            "roundCorrect": 5,
            "roundMisses": 4
          }
        ]
      }
    ]
  }, action) => {
    switch (action.type) {
      case actions.ROUND_TABLE_NEXT_ROUND:
        let round = state.selectedRound+ 1;
        return {...state, selectedRound: round}
      case actions.ROUND_TABLE_PREV_ROUND:
        round = state.selectedRound - 1;
        return {...state, selectedRound: round}
      case actions.ROUND_TABLE_SET_ROUND:
        return {...state, selectedRound: action.payload.round}

      default:
        return state;
    }
}

export default roundTable;
