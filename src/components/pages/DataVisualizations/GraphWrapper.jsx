import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import CitizenshipMapAll from './Graphs/CitizenshipMapAll';
import CitizenshipMapSingleOffice from './Graphs/CitizenshipMapSingleOffice';
import TimeSeriesAll from './Graphs/TimeSeriesAll';
import OfficeHeatMap from './Graphs/OfficeHeatMap';
import TimeSeriesSingleOffice from './Graphs/TimeSeriesSingleOffice';
import YearLimitsSelect from './YearLimitsSelect';
import ViewSelect from './ViewSelect';
import axios from 'axios';
import { resetVisualizationQuery } from '../../../state/actionCreators';
// import test_data from '../../../data/test_data.json';    
// commented the line above to remove the the test data ^
import { colors } from '../../../styles/data_vis_colors';
import ScrollToTopOnMount from '../../../utils/scrollToTopOnMount';

const { background_color } = colors;

function GraphWrapper(props) {
  const { set_view, dispatch } = props;
  let { office, view } = useParams();
  if (!view) {
    set_view('time-series');
    view = 'time-series';
  }
  let map_to_render;
  if (!office) {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesAll />;
        break;
      case 'office-heat-map':
        map_to_render = <OfficeHeatMap />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapAll />;
        break;
      default:
        break;
    }
  } else {
    switch (view) {
      case 'time-series':
        map_to_render = <TimeSeriesSingleOffice office={office} />;
        break;
      case 'citizenship':
        map_to_render = <CitizenshipMapSingleOffice office={office} />;
        break;
      default:
        break;
    }
  }
  /*
  _                                                                             _
  |                                                                                 |
  |   Example request for once the `/summary` endpoint is up and running:           |
  |                                                                                 |
  |     `${url}/summary?to=2022&from=2015&office=ZLA`                               |
  |                                                                                 |
  |     so in axios we will say:                                                    |
  |                                                                                 |     
  |       axios.get(`${url}/summary`, {                                             |
  |         params: {                                                               |
  |           from: <year_start>,                                                   |
  |           to: <year_end>,                                                       |
  |           office: <office>,       [ <-- this one is optional! when    ]         |
  |         },                        [ querying by `all offices` there's ]         |
  |       })                          [ no `office` param in the query    ]         |
  |                                                                                 |
  _                                                                             _
  -- Mack 
  
  */

  // started coding here

  async function updateStateWithNewData(years, view, office, stateSettingCallback) {

    if (office === 'all' || !office) {
      // added a variable to store citizenshipSummary and added correct endpoint
      // if all or no offices are selected
      const citizenshipSummary = await axios
        .get("https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary", {
          params: {
            from: years[0],
            to: years[1],
          },
        });
        console.log("Citizenship Summary Data:", citizenshipSummary); // logged results
      // added a variable to store fiscalSummary and added correct endpoint
      const fiscalSummary = await axios
        .get("https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary", {
          params: {
            from: years[0],
            to: years[1],
          },
        });
        console.log("Fiscal Summary Data:", fiscalSummary); // logged results

      fiscalSummary.data["citizenshipResults"] = citizenshipSummary.data;
      // added a variable to store combinedData
      const combinedData = [fiscalSummary.data];  
      console.log("Combined Data:",combinedData);  // logged results
      stateSettingCallback(view, office, combinedData);  
      // changed the test data to combined data ^

    } else {
      // added a variable to store citizenshipSummary and added correct endpoint
      // if an office is selected
      const citizenshipSummary = await axios
        .get("https://hrf-asylum-be-b.herokuapp.com/cases/citizenshipSummary", {
          params: {
            from: years[0],
            to: years[1],
            office: office,
          },
        });
        console.log("Citizenship Summary Data:", citizenshipSummary);
      // added a variable to store fiscalSummary and added correct endpoint
      // if an office is selected
      const fiscalSummary = await axios
        .get("https://hrf-asylum-be-b.herokuapp.com/cases/fiscalSummary", {
          params: {
            from: years[0],
            to: years[1],
            office: office,
          },
        });
        console.log("Fiscal Summary Data:", fiscalSummary); // logged results

      fiscalSummary.data["citizenshipResults"] = citizenshipSummary.data;
      // added a variable to store combinedData
      const combinedData = [fiscalSummary.data]; 
      console.log("Combined Data:",combinedData); // logged results
      stateSettingCallback(view, office, combinedData);
      // changed the test data to combined data ^
    }
  }
  // nothing coded after this line

  const clearQuery = (view, office) => {
    dispatch(resetVisualizationQuery(view, office));
  };
  return (
    <div
      className="map-wrapper-container"
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        minHeight: '50px',
        backgroundColor: background_color,
      }}
    >
      <ScrollToTopOnMount />
      {map_to_render}
      <div
        className="user-input-sidebar-container"
        style={{
          width: '300px',
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <ViewSelect set_view={set_view} />
        <YearLimitsSelect
          view={view}
          office={office}
          clearQuery={clearQuery}
          updateStateWithNewData={updateStateWithNewData}
        />
      </div>
    </div>
  );
}

export default connect()(GraphWrapper);
