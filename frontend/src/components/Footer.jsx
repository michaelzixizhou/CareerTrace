import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
  background-color: #f0f4f8;
  color: #000;
  padding: 20px;
  text-align: center;
`;

const Footer = () => {
  return (
    <FooterContainer>
      &copy; 2023 Michael Zhou, Sean Kim, Charles Hsieh. All rights reserved.
    </FooterContainer>
  );
};

export default Footer;
