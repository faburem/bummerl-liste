export const setupNewBummerl = () => {
  const pointObject = []
  const pointLine = {
    teamApoints: 24,
    teamBpoints: 24,
    creationDate: new Date(),
  }
  pointObject.push(pointLine)
  return pointObject
}
export const restoreSpecialGames = () => {
  SpecialGames.remove({})
  SpecialGames.insert({ specialGameId: 'zehnerloch', specialGameName: 'Zehnerloch', specialGamePoints: 10 })
  SpecialGames.insert({ specialGameId: 'bettler', specialGameName: 'Bettler', specialGamePoints: 4 })
  SpecialGames.insert({ specialGameId: 'assbettler', specialGameName: 'Ass-Bettler', specialGamePoints: 5 })
  SpecialGames.insert({ specialGameId: 'schnapser', specialGameName: 'Schnapser', specialGamePoints: 6 })
  SpecialGames.insert({ specialGameId: 'gang', specialGameName: 'Gang', specialGamePoints: 9 })
  SpecialGames.insert({ specialGameId: 'bauer', specialGameName: 'Bauernschnapser', specialGamePoints: 12 })
  SpecialGames.insert({ specialGameId: 'kontraschnapser', specialGameName: 'Kontraschnapser', specialGamePoints: 6 })
  SpecialGames.insert({ specialGameId: 'farbringerl', specialGameName: 'Farbringerl', specialGamePoints: 18 })
  SpecialGames.insert({ specialGameId: 'kontrabauer', specialGameName: 'Kontrabauernschnapser', specialGamePoints: 24 })
  SpecialGames.insert({ specialGameId: 'herrenschnapser', specialGameName: 'Herrenschnapser', specialGamePoints: 24 })
  SpecialGames.insert({ specialGameId: 'normal1', specialGameName: 'Normales Spiel', specialGamePoints: 1 })
  SpecialGames.insert({ specialGameId: 'normal2', specialGameName: 'Normales Spiel', specialGamePoints: 2 })
  SpecialGames.insert({ specialGameId: 'normal3', specialGameName: 'Normales Spiel', specialGamePoints: 3 })
}
