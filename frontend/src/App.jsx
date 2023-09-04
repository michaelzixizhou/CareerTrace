import './App.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import JobTable from './components/Table';
import AddJob from './components/Add';
import TrackCalender from './components/Calender';
import Stats from './components/Stats';
import { Icon } from '@iconify/react';
import GoogleButton from 'react-google-button'

const MobileMode = styled.span`
  display: none;
  
  @media (max-width: 1000px) {
    display: flex;
    flex-direction: column;
  }
`
const DesktopMode = styled.span`
  @media (max-width: 1000px) {
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
const statuses = ['Interview', 'Phone Screen', 'Online Assessment', 'Offer', 'No Response'];

const generateRandomData = () => {
  const randomCompany = companies[Math.floor(Math.random() * companies.length)];
  const randomRole = roles[Math.floor(Math.random() * roles.length)];
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  const randomDuration = durations[Math.floor(Math.random() * durations.length)];
  const randomAnticipatedPay = anticipatedPays[Math.floor(Math.random() * anticipatedPays.length)];
  const randomScheduledInterview = getRandomDate('2023-09-01', '2024-09-30');
  const dateApplied = getRandomDate('2023-09-01', '2024-09-30');
  const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
  const randomrejected = Math.random() < 0.5;

  return {
    company: randomCompany,
    role: randomRole,
    dateApplied: dateApplied,
    location: randomLocation,
    duration: randomDuration,
    pay: randomAnticipatedPay,
    scheduledInterview: randomScheduledInterview,
    applicationStage: randomStatus,
    rejected: randomStatus === "Offer" ? false : randomrejected,
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
  gap: min(2vw, 2rem);
  justify-content: center;

  @media (max-width: 1000px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0;
    padding: 0;
    width: 97vw;
    padding-top: min(10vw, 3rem);
  }

  margin: 0 0 1rem 0;
`;

const AppScreen = styled.section`
  width: 100vw;
`

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  
  @media (min-width: 1000px) {
    flex-direction: row; 
  }
`;


const LeftContainer = styled.div`
  flex: 1;  
  @media (max-width: 1000px) {
    align-items: center;
    padding: 0;
    margin: 0;    
    max-width: 97vw;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  @media (max-width: 1000px) {
    width: fit-content;
    margin: 0;
    padding: 0;
    max-width: 97vw;
  }
`;

const Title = styled.h1`
  font-size: var(--font-size__title);
  text-align: center;
  font-weight: 1000;
  border-radius: 50%;
  @media (min-width: 1000px) {
    margin-left: 10%;
  }
`;

const GoogleSignOutButton = styled(GoogleButton)`
  @media (min-width: 1000px) {
    margin-right: 10%;
  }
`

const App = () => {
  const jobData = generateSampleData(341);
  const [showCalenderStats, setShowCalenderStats] = useState(false);

  const toggleLeftContainer = () => {
    setShowCalenderStats(!showCalenderStats);
  };

  return (
    <AppScreen>
      <TopContainer>
        <Title>CareerTrace</Title>
        <GoogleSignOutButton
          onClick={() => { console.log('Google button clicked') }}
          label='Sign Out of Google'
        />
      </TopContainer>
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
    </AppScreen>
  );
};

export default App;