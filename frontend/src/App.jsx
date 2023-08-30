import './App.css';
import JobTable from './components/Table';

const getRandomDate = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const randomDate = new Date(startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime()));
  return randomDate.toISOString().split('T')[0];
};

const companies = ['TechCorp', 'InnovateTech', 'CodeGenius', 'DataTech', 'WebSolutions'];
const roles = ['Frontend Developer', 'Backend Engineer', 'Data Scientist', 'UI/UX Designer', 'Product Manager'];
const locations = ['New York, NY', 'Chicago, IL', 'San Francisco, CA', 'Los Angeles, CA', 'Seattle, WA'];
const durations = ['Contract', 'Full-time', 'Part-time'];
const anticipatedPays = ['$75,000', '$90,000', '$110,000', '$120,000', '$150,000'];
const states = ['Interview Scheduled', 'Phone Screen', 'On-site Interview', 'Offer Extended', 'Rejected'];

const generateRandomData = () => {
  const randomCompany = companies[Math.floor(Math.random() * companies.length)];
  const randomRole = roles[Math.floor(Math.random() * roles.length)];
  const randomLocation = locations[Math.floor(Math.random() * locations.length)];
  const randomDuration = durations[Math.floor(Math.random() * durations.length)];
  const randomAnticipatedPay = anticipatedPays[Math.floor(Math.random() * anticipatedPays.length)];
  const randomScheduledInterview = getRandomDate('2023-09-01', '2023-09-30');
  const randomState = states[Math.floor(Math.random() * states.length)];

  return {
    company: randomCompany,
    roleName: randomRole,
    location: randomLocation,
    duration: randomDuration,
    anticipatedPay: randomAnticipatedPay,
    scheduledInterview: randomScheduledInterview,
    state: randomState,
  };
};

const generateSampleData = (count) => {
  const data = [];
  for (let i = 0; i < count; i++) {
    data.push(generateRandomData());
  }
  return data;
};

const App = () => {
  const jobData = generateSampleData(341);

  return (
    <>
      <JobTable data={jobData} />
    </>
  );
};

export default App;