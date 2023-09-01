import './App.css';
import styled from 'styled-components';
import JobTable from './components/Table';
import AddJob from './components/Add';
import TrackCalender from './components/Calender';
import Stats from './components/Stats';

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
    roleName: randomRole,
    dateApplied: dateApplied,
    location: randomLocation,
    duration: randomDuration,
    anticipatedPay: randomAnticipatedPay,
    scheduledInterview: randomScheduledInterview,
    status: randomStatus,
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
  }
`;

const LeftContainer = styled.div`
  flex: 1;

  @media(max-width: 800px) {
    align-items: center;
    padding: 0;
    margin: 0;
  }
`;

const RightContainer = styled.div`
  flex: 1;

  @media(max-width: 800px) {
    width: fit-content;
    margin: 0;
    padding: 0;
  }
`;

const App = () => {
  const jobData = generateSampleData(341);

  return (
    <AppContainer>
      <LeftContainer>
        <TrackCalender data={jobData} />
        <Stats data={jobData} />
        <AddJob />
      </LeftContainer>
      <RightContainer>
        <JobTable data={jobData} />
      </RightContainer>
    </AppContainer>
  );
};

export default App;
