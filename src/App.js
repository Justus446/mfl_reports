
import './App.css';
import jsonData from './Untitled-1.json';
import { useEffect, useState } from 'react';
import FacilitiesReport from './FacilitiesDatagrid';
import chulJson from './chul.json';
import { countChulReportFieldsFacility,
  countChulReportFieldsWard,
  countFacilityMultiReport,
  countFacilityReport } from './commonFunctions';

function App() {
  const [data, setData] = useState(null);
  const [chulData, setChulData] = useState(null); 

  useEffect(() => {
    setData(jsonData);
    setChulData(chulJson);
  }, []);

  //data to filter from facility data
  const facilityReportCount = [
  'number_of_beds',
  'number_of_inpatient_beds',
  'number_of_cots',
  'number_of_emergency_casualty_beds',
  'number_of_icu_beds',
  'number_of_hdu_beds',
  'number_of_maternity_beds',
  'number_of_isolation_beds',
  'number_of_general_theatres',
  'number_of_maternity_theatres'
];

  //Data to filter from chul data
  const chulReportCount=[
    'status_name',
    'services',
  ];
const chulReportFacility=['facility_name']
  // data to filter from facilities 
const FacilitySubcategoryCount = ['facility_services', 'facility_infrastructure', 'facility_contacts', 'facility_humanresources','owner_type_name', 
'facility_type_name', 
'keph_level',
'regulatory_body_name'];

// Extracting data from the facility data
const facilityReportArray = data?.results ? countFacilityReport(data.results,facilityReportCount) : [];

const facilityMultireportArray = data?.results ? countFacilityMultiReport(data.results,FacilitySubcategoryCount) : [];

const chulWardReportArray = data?.results ? countChulReportFieldsWard(chulData.results,chulReportCount) : [];

const chulFacilityReportArray = data?.results ? countChulReportFieldsFacility(chulData.results,chulReportFacility) : [];



console.log("Facility report Data",facilityReportArray);
console.log("Facility services,infrstructure e.t.c report Data",facilityMultireportArray);
console.log("CHUL report Ward level Data ",chulWardReportArray);
console.log("CHUL report  CHUL level Data",chulFacilityReportArray);

// Extracting rows and columns from a nested object
// {
//   field: 'lastName',
//   headerName: 'Last name',
//   width: 150,
//   editable: true,
//   valueGetter: (params) => `${params.row.lastName?.y || ''}`,
//   },

const columns = [];
const rows =[];




  return (
    <div className="App">
      <h3>Facility Reports All hierachies</h3>
      <FacilitiesReport  rows={rows} columns={columns}/>
      
    </div>
  );
}

export default App;

