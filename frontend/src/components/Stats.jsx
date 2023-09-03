import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  flex-grow: 1; 
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
  text-align: center;
`;

const Header = styled.div`
  font-size: var(--font-size__header);
  font-weight: 800;
  margin-bottom: min(1vw, 1rem);
`;

const StatItem = styled.div`
  font-size: var(--font-size__button);
  margin: 10px 0;
`;

const Stats = ({ data }) => {
  const totalApplications = data.length;
  const totalInterviewsAndOffers = data.filter(item => item.maxStatus === 'Interview' || item.maxStatus === 'Offer').length;
  const totalOffers = data.filter(item => item.maxStatus === 'Offer').length;

  const interviewRate = (totalInterviewsAndOffers / totalApplications) * 100;
  const offerRate = (totalOffers / totalApplications) * 100;

  return (
    <StatsContainer>
      <Header>Application Statistics</Header>
      <StatItem>Total Applications: {totalApplications}</StatItem>
      <StatItem>Total Interviews: {totalInterviewsAndOffers} ({interviewRate.toFixed(2)}%)</StatItem>
      <StatItem>Total Offers: {totalOffers} ({offerRate.toFixed(2)}%)</StatItem>
    </StatsContainer>
  );
};

export default Stats;