import React from 'react';
import styled from 'styled-components';

const StatsContainer = styled.div`
  margin: min(3vw, 3rem);
  padding: min(2vw, 1.3rem);
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  background-color: #f9f9f9;
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
  const totalInterviewsAndOffers = data.filter(item => item.status === 'Interview' || item.status === 'Offer').length;
  const totalOffers = data.filter(item => item.status === 'Offer').length;

  const interviewRate = (totalInterviewsAndOffers / totalApplications) * 100;
  const offerRate = (totalOffers / totalApplications) * 100;

  return (
    <StatsContainer>
      <Header>Application Statistics</Header>
      <StatItem>Total Applications: {totalApplications}</StatItem>
      <StatItem>Interview Rate: {interviewRate.toFixed(2)}%</StatItem>
      <StatItem>Offer Rate: {offerRate.toFixed(2)}%</StatItem>
    </StatsContainer>
  );
};

export default Stats;
