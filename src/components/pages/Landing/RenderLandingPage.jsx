import React from 'react';
// ADD IMPORTS BACK FOR GRAPHS SECTION
import GrantRatesByOfficeImg from '../../../styles/Images/bar-graph-no-text.png';
import GrantRatesByNationalityImg from '../../../styles/Images/pie-chart-no-text.png';    //  these are all of my charts
import GrantRatesOverTimeImg from '../../../styles/Images/line-graph-no-text.png';
import HrfPhoto from '../../../styles/Images/paper-stack.jpg';
import '../../../styles/RenderLandingPage.less';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
// for the purposes of testing PageNav
import PageNav from '../../common/PageNav';    // ***find a use for this!!!***

function RenderLandingPage(props) {
  const scrollToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  };

  const history = useHistory();

  return (
    <div className="main">
      <div className="header">
        <div className="header-text-container">
          <h1>Asylum Office Grant Rate Tracker</h1>
          <h3>
            The Asylum Office Grant Rate Tracker provides asylum seekers,
            researchers, policymakers, and the public an interactive tool to
            explore USCIS data on Asylum Office decisions
          </h3>
        </div>
      </div>
      {/* Graphs Section */}
      <div className="graphs-section">
        <div className="image-row">
          <div className='image-text'>
            <img src={GrantRatesByOfficeImg} alt="Grant Rates By Office" className="image" />
            <p>Grant Rates By Office</p>
          </div>
          <div className='image-text'>
            <img src={GrantRatesByNationalityImg} alt="Grant Rates By Nationality" className="image" />
            <p>Grant Rates By Nationality</p>
          </div>
          <div className='image-text'>
            <img src={GrantRatesOverTimeImg} alt="Grant Rates Over Time" className="image" />
            <p>Grant Rates Over Time</p>
          </div>
        </div>
      </div>
      <div className="view-more-data-btn-container">
        <Button
          type="default"
          style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
          onClick={() => history.push('/graphs')}
        >
          View the Data
        </Button>
        <Button
          type="default"
          style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
          onClick={() => history.push('/graphs')}
        >
          Download the Data
        </Button>
      </div>

      <div className="middle-section">
        <div className="hrf-img-container">
          <img src={HrfPhoto} alt="Human Rights First" className="hrf-img" />
        </div>
        <div className="middle-section-text-container">
          <h3>
            Human Rights First has created a search tool to give you a
            user-friendly way to explore a data set of asylum decisions between
            FY 2016 and May 2021 by the USCIS Asylum Office, which we received
            through a Freedom of Information Act request. You can search for
            information on asylum grant rates by year, nationality, and asylum
            office, visualize the data with charts and heat maps, and download
            the data set
          </h3>
        </div>
      </div>
      <div>
        {/* Bottom Section */}
        <div className="bottom-section">
          <div className="bottom-section-container">
            <h3>36%</h3>
            <p>By the end of the4 Trump administration, the average asylum office grant rate had fallen 36 percent from an average of 44 percent in fiscal year 2016 to 28 percent in fiscal year 2020.</p>
          </div>
          <div className="bottom-section-container">
            <h3>5%</h3>
            <p>The New York asylum off grant rate dropped to 5 percent in the fiscal year 2020.</p>
          </div>
          <div className="bottom-section-container">
            <h3>6x Lower</h3>
            <p>Between fiscal year 2017 and 2020, the New York asylum office's average grant rate was six times lower than the San Fransicoasylum office.</p>
          </div>
        </div>
        <div className="view-more-data-btn-container">
          <Button
            type="default"
            style={{ backgroundColor: '#404C4A', color: '#FFFFFF' }}
            onClick={() => history.push('/graphs')}
          >
            Download the Data
          </Button>
        </div>
        <p onClick={() => scrollToTop()} className="back-to-top">
          Back To Top ^
        </p>
      </div>
    </div>
  );
}
export default RenderLandingPage;
