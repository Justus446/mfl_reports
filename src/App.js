import logo from './logo.svg';
import './App.css';
import jsonData from './Untitled-1.json';
import { useEffect, useState } from 'react';

function App() {
  const [data, setData] = useState(null);

  function countFacilityOccurrencesAndProperties(facilities, keysToCount) {
    const countsMap = new Map();
  
    for (const facility of facilities) {
      const { county, sub_county, ward_name, ...propertyValues } = facility;
      const key = `${county}-${sub_county}-${ward_name}`;
  
      if (!countsMap.has(key)) {
        const initialCounts = {
          county,
          sub_county,
          ward_name,
          occurrences: {},
        };
  
        for (const key of keysToCount) {
          initialCounts.occurrences[key] = {};
        }
  
        countsMap.set(key, initialCounts);
      }
  
      const currentCounts = countsMap.get(key);
  
      for (const key of keysToCount) {
        if (Array.isArray(facility[key])) {
          for (const obj of facility[key]) {
            const name = obj.name;
            if (!currentCounts.occurrences[key][name]) {
              currentCounts.occurrences[key][name] = 0;
            }
            currentCounts.occurrences[key][name]++;
          }
        } else {
          const value = propertyValues[key];
          if (!currentCounts.occurrences[key][value]) {
            currentCounts.occurrences[key][value] = 0;
          }
          currentCounts.occurrences[key][value]++;
        }
      }
    }
  
    return Array.from(countsMap.values());
  }
  
 

  useEffect(() => {
    setData(jsonData);
  }, []);

  const propertiesToCount = [
  'number_of_beds',
  'number_of_inpatient_beds',
  'number_of_cots',
  'number_of_emergency_casualty_beds',
  'number_of_icu_beds',
  'number_of_hdu_beds',
  'number_of_maternity_beds',
  'number_of_isolation_beds',
  'number_of_general_theatres',
  'number_of_maternity_theatres',
  'owner_type_name', 
  'facility_type_name', 
  'keph_level',
  'regulatory_body_name'];


  // Example keys and facilities data
const keysToCount = ['facility_services', 'facility_infrastructure', 'facility_contacts', 'facility_humanresources'];

// Check if data is available before calling the countFacilityBedsCotsCasualty function
const countsArray = data?.results ? countFacilityOccurrencesAndProperties(data.results,propertiesToCount) : [];

const countsArray2 = data?.results ?countFacilityOccurrencesAndProperties(data.results, keysToCount): [];




console.log(countsArray);
console.log('results');
console.log(countsArray2);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {/* Conditional rendering to check if data is available */}
        {data && data.results && data.results[0] && (
          <p>Name: {data.results[0].regulatory_status_name}</p>
         
        )}
        
       
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;

