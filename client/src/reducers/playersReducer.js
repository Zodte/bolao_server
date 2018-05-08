const players = (state=[
  {
    "name": "Peck Oskarsson",
    "rounds": [
      {
        "round": 1,
        "roundPoints": 11,
        "leaguePoints": 11,
        "roundPerfect": 2,
        "leaguePerfect": 2,
        "roundCorrect": 5,
        "leagueCorrect": 5,
        "gold": 0,
        "silver": 1,
        "bronze": 0,
        "roundPosition": 2,
        "leaguePosition": 2,
        "guesses": [
          {
            "id": "ArsenalManchesterUnited",
            "homeScore": 1,
            "awayScore": 0
          },
          {
            "id": "LiverpoolLeeds",
            "homeScore": 2,
            "awayScore": 1
          }
        ]
      },
      {
        "round": 2,
        "roundPoints": 12,
        "leaguePoints": 23,
        "roundPerfect": 3,
        "leaguePerfect": 5,
        "roundCorrect": 3,
        "leagueCorrect":8,
        "gold": 1,
        "silver": 1,
        "bronze": 0,
        "roundPosition": 1,
        "leaguePosition": 1,
        "guesses": [
          {
            "id": "PopoTata",
            "homeScore": 0,
            "awayScore": 4
          }
        ]
      }
    ]
  },
  {
    "name": "Pedro Luis",
    "rounds": [
      {
        "round": 1,
        "roundPoints": 12,
        "leaguePoints": 12,
        "roundPerfect": 2,
        "leaguePerfect": 2,
        "roundCorrect": 6,
        "leagueCorrect": 6,
        "gold": 1,
        "silver": 0,
        "bronze": 0,
        "roundPosition": 1,
        "leaguePosition": 1,
        "guesses": [
          {
            "id": "ArsenalManchesterUnited",
            "homeScore": 2,
            "awayScore": 0
          },
          {
            "id": "LiverpoolLeeds",
            "homeScore": 1,
            "awayScore": 0
          }
        ]
      },
      {
        "round": 2,
        "roundPoints": 8,
        "leaguePoints": 20,
        "roundPerfect": 1,
        "leaguePerfect": 3,
        "roundCorrect": 5,
        "leagueCorrect": 11,
        "gold": 1,
        "silver": 1,
        "bronze": 0,
        "roundPosition": 2,
        "leaguePosition": 2,
        "guesses": [
          {
            "id": "PopoTata",
            "homeScore": 1,
            "awayScore": 0
          }
        ]
      }
    ]
  }
], action) => {
  return state;
}

export default players;
