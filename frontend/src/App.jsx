import './App.css';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import JobTable from './components/Table';
import AddJob from './components/Add';
import TrackCalender from './components/Calender';
import Stats from './components/Stats';
import { Icon } from '@iconify/react';
import GoogleButton from 'react-google-button'

const MobileMode = styled.span`
  display: none;
  @media (max-width: 1200px) {
    display: flex;
    flex-direction: column;
  }
`
const DesktopMode = styled.span`
  @media (max-width: 1200px) {
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

const AppContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 3rem;
  justify-content: center;

  @media (max-width: 1200px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 0;
    padding: 0;
    width: 100vw;
    padding-top: min(10vw, 3rem);
  }
`;

const AppScreen = styled.section`
  width: 100vw;    
  height: 100vh;
  align-items: center;
  text-align: center; 
`

const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 0;

  @media (min-width: 1200px) {
    flex-direction: row; 
    width: 80%;
    margin: 0 10%;
  }
`;

const SignedOutScreen = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  justify-content: center; 
  flex-direction: column;
`;

const LeftContainer = styled.div`
  flex: 1;  
  @media (max-width: 1200px) {
    align-items: center;
    padding: 0;
    margin: 0;    
    max-width: 97vw;
  }
`;

const RightContainer = styled.div`
  flex: 1;
  display: flex;
  @media (max-width: 1200px) {
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
`;

const GoogleSignButton = styled(GoogleButton)`
`

const App = () => {
  const [showCalenderStats, setShowCalenderStats] = useState(false);
  const [userData, setUserData] = useState(JSON.parse(localStorage.getItem('userData') || 'null'));
  const [briefUserInfo, setBriefUserInfo] = useState(JSON.parse(localStorage.getItem('briefUserInfo') || 'null'));
  
  const signOut = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
  
    fetch("/auth/logout", requestOptions)
      .then((res) => {
        if (!res.ok) {
          throw new Error('Logout failed'); 
        }
        localStorage.removeItem('briefUserInfo');
        localStorage.removeItem('userData');
        setUserData(null);
        setBriefUserInfo(null);
      })
      .catch((err) => {
        console.error('Error logging out:', err);
      });
  };

  useEffect(() => {
    fetch("/api/profile")
    .then((res) => res.json())
    .then((data) => {{
      if (data){
        localStorage.setItem('briefUserInfo', JSON.stringify(data));
        setBriefUserInfo(data);
      }
    }})
    .catch((err) => {
      console.error('Not logged in:', err);
    });
  }, []);

  useEffect(() => {
    if (briefUserInfo !== null) {
      fetch(`/api/${briefUserInfo.id}`)
        .then((res) => res.json())
        .then((data) => {{
          if (data){
            localStorage.setItem('userData', JSON.stringify(data));
            setUserData(data);
          }
        }})
        .catch((err) => {
          console.error('Error fetching user jobs:', err);
        });
    }
  }, []);
  
  const toggleLeftContainer = () => {
    setShowCalenderStats(!showCalenderStats);
  };  

  return (
    <>
      {userData ? (
        <AppScreen>
          <TopContainer>
            <Title>CareerTrace</Title>
            <GoogleSignButton
              onClick={signOut}
              label='Sign Out of Google'
            />
          </TopContainer>
          <AppContainer>
            <MobileMode>
              {showCalenderStats ? (
                <LeftContainer>
                  <TrackCalender data={userData.jobapps} />
                  <Stats data={userData.jobapps} />
                  <AddJob userData={userData} setUserData={setUserData} />
                </LeftContainer>
              ) : (
                <SemiCircleButton onClick={toggleLeftContainer}>
                  <LeftRightArrowIcon icon="teenyicons:left-outline" />
                </SemiCircleButton>
              )}
            </MobileMode>
            <DesktopMode>
              <LeftContainer>
                <TrackCalender data={userData.jobapps} />
                <Stats data={userData.jobapps} />
                <AddJob userData={userData} setUserData={setUserData} />
              </LeftContainer>
            </DesktopMode>
            <MobileMode>
              {showCalenderStats ? (
                <SemiCircleButton onClick={toggleLeftContainer}>
                  <LeftRightArrowIcon icon="teenyicons:right-outline" />
                </SemiCircleButton>
              ) : (
                <RightContainer>
                  <JobTable data={userData.jobapps} />
                </RightContainer>
              )}
            </MobileMode>
            <DesktopMode>
              <RightContainer>
                <JobTable data={userData.jobapps} />
              </RightContainer>
            </DesktopMode>
          </AppContainer>
        </AppScreen>
      ) : (
        <AppScreen>
          <SignedOutScreen>
            <Title>CareerTrace</Title>
            <GoogleSignButton onClick={() => {
              window.location.href = '/auth/google';
            }}/>
          </SignedOutScreen>
        </AppScreen>
      )}
    </>
  );
};

export default App;