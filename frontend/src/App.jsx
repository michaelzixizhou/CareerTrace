import './App.css';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import JobTable from './components/Table';
import AddJob from './components/Add';
import TrackCalender from './components/Calender';
import Stats from './components/Stats';
import { Icon } from '@iconify/react';
import GoogleButton from 'react-google-button'
import Logo from './assets/logo.svg';
import Footer from './components/Footer';

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

const Image = styled.img`
  width: 20rem;
  max-width: 95vw;
  border-radius: 50%;
  pointer-events: none;
`;

const GoogleSignButton = styled(GoogleButton)`
  width: 20rem;
  max-width: 95vw;
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
    .then((data) => {
      if (data){
        localStorage.setItem('briefUserInfo', JSON.stringify(data));
        setBriefUserInfo(data);
      }
    })
    .catch((err) => {
      console.error('Not logged in:', err);
      localStorage.removeItem('briefUserInfo');
      localStorage.removeItem('userData');
      setUserData(null);
      setBriefUserInfo(null);
    });
  }, []);

  useEffect(() => {
    if (briefUserInfo !== null) {
      fetch(`/api/${briefUserInfo.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data){
            localStorage.setItem('userData', JSON.stringify(data));
            setUserData(data);
          }
        })
        .catch((err) => {
          console.error('Error fetching user jobs:', err);
        });
    }
  }, [briefUserInfo]);
  
  const toggleLeftContainer = () => {
    setShowCalenderStats(!showCalenderStats);
  };  

  return (
    <>
      {userData && briefUserInfo ? (
        <AppScreen>
          <TopContainer>
            <Image src={Logo} alt="CareerTrace" />
            <GoogleSignButton
              onClick={signOut}
              label='Sign Out of Google'
            />
          </TopContainer>
          <AppContainer>
            <MobileMode>
              {showCalenderStats ? (
                <LeftContainer>
                  <TrackCalender data={userData} />
                  <Stats data={userData} />
                  <AddJob userData={userData} />
                </LeftContainer>
              ) : (
                <SemiCircleButton onClick={toggleLeftContainer}>
                  <LeftRightArrowIcon icon="teenyicons:left-outline" />
                </SemiCircleButton>
              )}
            </MobileMode>
            <DesktopMode>
              <LeftContainer>
                <TrackCalender data={userData} />
                <Stats data={userData} />
                <AddJob userData={userData} />
              </LeftContainer>
            </DesktopMode>
            <MobileMode>
              {showCalenderStats ? (
                <SemiCircleButton onClick={toggleLeftContainer}>
                  <LeftRightArrowIcon icon="teenyicons:right-outline" />
                </SemiCircleButton>
              ) : (
                <RightContainer>
                  <JobTable userData={userData} setUserData={setUserData} />
                </RightContainer>
              )}
            </MobileMode>
            <DesktopMode>
              <RightContainer>
                <JobTable userData={userData} setUserData={setUserData} />
              </RightContainer>
            </DesktopMode>
          </AppContainer>
          <Footer/>
        </AppScreen>
      ) : (
        <AppScreen>
          <SignedOutScreen>
            <Image src={Logo} alt="CareerTrace" />
            <GoogleSignButton onClick={() => {
              window.location.href = '/auth/google';
            }}/>
          </SignedOutScreen>
          <Footer/>
        </AppScreen>
      )}
    </>
  );
};

export default App;