const emojis = {
  "-": " ",
  O: "🌍",
  X: "👽",
  I: "🚀",
  PLAYER: "👨‍🚀",
  BOMB_COLLISION: "🔥",
  GAME_OVER: "👎",
  WIN: "🏆",
  HEART: "❤",
}

const maps = []
maps.push(`
        IXXXXXXXXX
        -XXXXXXXXX
        -XXXXXXXXX
        -XXXXXXXXX
        -XXXXXXXXX
        -XXXXXXXXX
        -XXXXXXXXX
        -XXXXXXXXX
        -XXXXXXXXX
        OXXXXXXXXX
      `)
maps.push(`
        O--XXXXXXX
        X--XXXXXXX
        XX----XXXX
        X--XX-XXXX
        X-XXX--XXX
        X-XXXX-XXX
        XX--XX--XX
        XX--XXX-XX
        XXXX---IXX
        XXXXXXXXXX
        `)
maps.push(`
        I-----XXXX
        XXXXX-XXXX
        XX----XXXX
        XX-XXXXXXX
        XX-----XXX
        XXXXXX-XXX
        XX-----XXX
        XX-XXXXXXX
        XX-----OXX
        XXXXXXXXXX
      `)
maps.push(`
      O--XXXXXXX
      XX-XXX---X
      XX-XXX-X-X
      XX-X---X-X
      XX-X-XX--X
      XX-X-X--XX
      XX-X--X-XX
      XX-XX-X-XX
      XX----XIXX
      XXXXXXXXXX
    `)
maps.push(`
    XXXXXXXIXX
    XXXXXXX-XX
    X-------XX
    X-XXXXXXXX
    X-------XX
    XXXXXXX-XX
    X-------XX
    X-XXXXXXXX
    X------OXX
    XXXXXXXXXX
  `)
maps.push(`
    XXXXXXXO--
    -------XX-
    -XXXXX--X-
    -X----X-X-
    -X-XX-X-X-
    -X-XI-X-X-
    -X-XXXX-X-
    -X------X-
    -XXXXXXXX-
    ----------
  `)
