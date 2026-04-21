const PrintStopDepartures = ({ tripUpdates, stopId, setStopDepartures }) => {

  const stopDepartureMap = new Map();
  const testStopDepartureMap = new Map();


  for (let i = 0; i < tripUpdates.length; i++)
    {
      for (let j = 0; j < tripUpdates[i].tripUpdate.stopTimeUpdate.length - 1; j++)
        {
          /*console.log(new Date(tripUpdates[i].tripUpdate.stopTimeUpdate[j].departure.time * 1000).toLocaleTimeString('fi-FI', {
            hour: '2-digit',
            minute: '2-digit'
          }))*/
          //console.log('Ylioppilaskylä stop ID: ', stopId)
          //console.log('current stop id: ' ,tripUpdates[i].tripUpdate.stopTimeUpdate[j].stopId)
          if (String(stopId) === String(tripUpdates[i].tripUpdate.stopTimeUpdate[j].stopId))
            {
              stopDepartureMap.set(
                tripUpdates[i].tripUpdate.trip.routeId,
                tripUpdates[i].tripUpdate.stopTimeUpdate[j].departure.time
              )
            }
          if (String(207426) === String(tripUpdates[i].tripUpdate.stopTimeUpdate[j].stopId))
            {
              testStopDepartureMap.set(
                tripUpdates[i].tripUpdate.trip.routeId,
                tripUpdates[i].tripUpdate.stopTimeUpdate[j].departure.time
              )
            }
        }
    }
  console.log('Stop departures as a map: ',  stopDepartureMap)
  console.log('Test stop departures as a map: ', testStopDepartureMap)
  console.log('TripUpdate length: ', tripUpdates.length)
  console.log('Tripupdate stoptimeUpdate length: ', tripUpdates[0]?.tripUpdate.stopTimeUpdate.length)

  return (
    <ul>
      {[...testStopDepartureMap.entries()].map(([routeId, time]) =>(
        <li key={routeId}>
          Route {routeId}: {new Date(time * 1000).toLocaleTimeString('fi-FI', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </li>
      ))}
    </ul>
  )
}

export default PrintStopDepartures
