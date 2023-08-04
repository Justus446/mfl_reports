// This file contains definitions of functions that count the unique occurence of certain fields in a given data e.g number of beds,cots, chu services for
//a  specific county,subcounty,ward or specific county,subcounty,ward ,faility
// It takes two arguements:
//Facilities: Our data which should contain  all those fields we want to count and the hierachy we want to filter by
//  keysToCount: Are the specific fields we want to count from a certain hierachy
//NB: The hierachies are already defined in the functions



//function for CHUL reports with hierachy upto facility level
export function countChulReportFieldsFacility(chuls, keysToCount) {
    const countsMap = new Map();
  
    for (const chul of chuls) {
      const { facility_county, facility_sub_ounty,facility_name,facility_ward, ...propertyValues } = chul;
      const key = `${facility_county}-${facility_sub_ounty}-${facility_name}-${facility_ward}`;
  
      if (!countsMap.has(key)) {
        const initialCounts = {
          facility_county,
          facility_sub_ounty,
          facility_name,
          facility_ward,
          occurrences: {},
        };
  
        for (const key of keysToCount) {
          initialCounts.occurrences[key] = {};
        }
  
        countsMap.set(key, initialCounts);
      }
  
      const currentCounts = countsMap.get(key);
  
      for (const key of keysToCount) {
        if (Array.isArray(chul[key])) {
          for (const obj of chul[key]) {
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
  

//function to be used for facility(services,infrustructure,humanresource)
export function countFacilityReportFieldsWard(data, keysToCount) {
    const countsMap = new Map();
  
    for (const facility of data) {
      const { county, sub_county,ward_name,ward, ...propertyValues } = facility;
      const key = `${county}-${sub_county}-${ward_name}-${ward}`;
  
      if (!countsMap.has(key)) {
        const initialCounts = {
          county,
          sub_county,
          ward_name,
          ward,
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
  

//function to be used for chul reports upto ward level
export function countChulReportFieldsWard(data, keysToCount) {
    const countsMap = new Map();
  
    for (const facility of data) {
      const { facility_county, facility_subcounty,facility_name,facility_ward, ...propertyValues } = facility;
      const key = `${facility_county}-${facility_subcounty}-${facility_ward}-${facility_name}`;
  
      if (!countsMap.has(key)) {
        const initialCounts = {
        facility_county,
        facility_subcounty,
        facility_name,
        facility_ward,
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
  // Function to be used for facility report
export function countFascilityReportFieldsFacility(facilities,propertiesToCount)
{
    const countsMap = new Map();

    for (const facility of facilities) {
      const { county, constituency, ward_name, ...propertyValues } = facility;
      const key = `${county}-${constituency}-${ward_name}`;

      if (!countsMap.has(key)) {
        const initialCounts = {
          county,
          constituency,
          ward_name,
          occurrences: {},
        };

        for (const property of propertiesToCount) {
          initialCounts.occurrences[property] = {};
        }

        countsMap.set(key, initialCounts);
      }

      const currentCounts = countsMap.get(key);

      for (const property of propertiesToCount) {
        const propertyValue = propertyValues[property];
        if (!currentCounts.occurrences[property][propertyValue]) {
          currentCounts.occurrences[property][propertyValue] = 0;
        }
        currentCounts.occurrences[property][propertyValue]++;
      }
    }

    return Array.from(countsMap.values());
}