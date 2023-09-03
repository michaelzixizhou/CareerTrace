import './App.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import JobTable from './components/Table';
import AddJob from './components/Add';
import TrackCalender from './components/Calender';
import Stats from './components/Stats';
import { Icon } from '@iconify/react';

const MobileMode = styled.span`
  display: none;
  
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
  }
`
const DesktopMode = styled.span`
  @media (max-width: 800px) {
    display: none;
  }
`
const SemiCircleButton = styled.button`
  width: 100px;
  height: 130px;
  background-color: #777;
  border-radius: 60%;
  position: fixed;
  left: 0%;
  top: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  outline: none;
  transform: translateX(-50%);
  border: 2px solid #777;
`;

const LeftRightArrowIcon = styled(Icon)`
  vertical-align: middle;
  color: #fff;
  left: 50%;
  width: 30px;
  height: 30px;
  position: fixed;
  cursor: pointer;
`;

const getRandomDate = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  return randomDate.toISOString().split('T')[0];
};

const companies = ['TechCorp', 'InnovateTech', 'CodeGenius', 'DataTech', 'WebSolutions'];
const roles = ['Frontend Developer', 'Backend Engineer', 'Data Scientist', 'UI/UX Designer', 'Product Manager'];
const locations = ['New York, NY', 'Chicago, IL', 'San Francisco, CA', 'Los Angeles, CA', 'Seattle, WA'];
const durations = ['4-month', '8-month', '12-month'];
const anticipatedPays = ['$75,000', '$90,000', '$110,000', '$120,000', '$150,000'];
const statuses = ['Interview', 'Phone Screen', 'Online Assessment', 'Offer', 'Rejected'];

const generateRandomData = () => {
  const randomCompany = companies[Math.floor(Math.random() * companies.length)];
  const randomRole = roles[Math.floor(Math.random() * roles.length)];
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  const randomDuration = durations[Math.floor(Math.random() * durations.length)];
  const randomAnticipatedPay = anticipatedPays[Math.floor(Math.random() * anticipatedPays.length)];
  const randomScheduledInterview = getRandomDate('2023-09-01', '2023-09-30');
  const dateApplied = getRandomDate('2023-09-01', '2023-09-30');
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];

  return {
    company: randomCompany,
    role: randomRole,
    dateApplied: dateApplied,
    location: randomLocation,
    duration: randomDuration,
    pay: randomAnticipatedPay,
    scheduledInterview: randomScheduledInterview,
    status: randomStatus,
    maxStatus: randomStatus,
  };
};

const generateSampleData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(generateRandomData());
  }
  return data;
};

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  padding: 20px;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0;
    padding: 0;
    width: 100vw;
    padding-top: min(10vw, 3rem);
  }

  margin: 1rem 0;
`;

const LeftContainer = styled.div`
  flex: 1;  
  @media (max-width: 800px) {
    align-items: center;
    padding: 0;
    margin: 0;    
    max-width: 97vw;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  @media (max-width: 800px) {
    width: fit-content;
    margin: 0;
    padding: 0;
    max-width: 97vw;
  }
`;

const Title = styled.div`
  font-size: var(--font-size__title);
  text-align: center;
  font-weight: 1000;
  border-radius:50%;
`;

const App = () => {
  const jobData = generateSampleData(341);
  const [showCalenderStats, setshowCalenderStats] = useState(false);

  const toggleLeftContainer = () => {
    setshowCalenderStats(!showCalenderStats);
  };

  return (
    <>
      <Title>Job Tracker</Title>
      <AppContainer>
        <MobileMode>    
          {showCalenderStats ? (
            <LeftContainer>
              <TrackCalender data={jobData} />
              <Stats data={jobData} />
              <AddJob />
            </LeftContainer>
          ) : (
            <SemiCircleButton onClick={toggleLeftContainer}>
              <LeftRightArrowIcon icon="teenyicons:left-outline" />
            </SemiCircleButton>
          )}
        </MobileMode>
        <DesktopMode>
          <LeftContainer>
            <TrackCalender data={jobData} />
            <Stats data={jobData} />
            <AddJob />
          </LeftContainer>
        </DesktopMode>
        <MobileMode>   
        {showCalenderStats ? (
            <SemiCircleButton onClick={toggleLeftContainer}>
              <LeftRightArrowIcon icon="teenyicons:right-outline" />
            </SemiCircleButton>
          ) : (        
            <RightContainer>
              <JobTable data={jobData} />
            </RightContainer>
        )}
        </MobileMode>
        <DesktopMode>
          <RightContainer>
            <JobTable data={jobData} />
          </RightContainer>
        </DesktopMode>
      </AppContainer>
    </>
  );
};

export default App;