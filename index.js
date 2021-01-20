import fetch from 'node-fetch';
import fs from 'fs/promises';
import { DateTime } from 'luxon';

loadData();
export default async function loadData() {

  const url = 'https://opensky-network.org/api/states/all';
  const res = await fetch(url, {method: 'GET'});
  const data = await res.json();
  await fs.writeFile('./flights_example.json', JSON.stringify(data, null, 2), 'utf-8');

  /*
  const file = await fs.readFile('./flights_example.json', 'utf-8');
  const data = JSON.parse(file);
  */

  const load_date = DateTime.fromSeconds(data.time).toISO();
  const flights = data.states.map(f => {
    let [ica024, callsign, origin_country, timePosition, last_contact, longitude, latitude, baro_altitude, on_ground, velocity, true_track, vertical_rate, sensors, altitude, squawk, spi, positionSource] = f;
    last_contact = DateTime.fromSeconds(last_contact).toISO();
    const position = latitude && longitude ? `POINT (${longitude} ${latitude})` : null;
    return {load_date, callsign: (callsign || '').trim(), squawk, origin_country, last_contact, position, on_ground, velocity, true_track, altitude, vertical_rate};
  }).filter(f => f.callsign || f.position);

  // 1 line per object
  const content = flights.map(f => JSON.stringify(f)).join('\n');
  try {
    await fs.mkdir('./data');
  } catch (err) {
    // already exists?
  }
  const filenameSafe = `./data/flights_${load_date}.json`.replace(/:/g,'-');
  await fs.writeFile(filenameSafe, content, 'utf-8');

  console.log('done');
}
