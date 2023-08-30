import './App.css';
import JobTable from './components/Table';

const App = () => {
  const jobData = [
    {
      company: 'Example Inc',
      roleName: 'Software Engineer',
      location: 'San Francisco, CA',
      duration: 'Full-time',
      anticipatedPay: '$100,000',
      scheduledInterview: '2023-09-10',
      state: 'Applied',
    },
    {
      company: 'TechCorp',
      roleName: 'Frontend Developer',
      location: 'New York, NY',
      duration: 'Contract',
      anticipatedPay: '$85,000',
      scheduledInterview: '2023-09-15',
      state: 'Interview Scheduled',
    },
    {
      company: 'InnovateTech',
      roleName: 'Data Scientist',
      location: 'Chicago, IL',
      duration: 'Full-time',
      anticipatedPay: '$110,000',
      scheduledInterview: '2023-09-20',
      state: 'Phone Screen',
    },
  ];

  return (
    <div>
      <h1>Job Search Dashboard</h1>
      <JobTable data={jobData} />
    </div>
  );
};

export default App;