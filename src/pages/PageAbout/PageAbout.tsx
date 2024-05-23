import React from 'react';
import { Typography } from 'antd';

const { Title, Paragraph } = Typography;

const PageAbout = () => {
  return (
    <>
      <Title level={2}>About Us</Title>
      <Paragraph>Website created by Owen, a software developer</Paragraph>
      <Paragraph>
        This website is a news aggregator that pulls data from the News API and
        displays it in a user-friendly way. The website is built using React and
        Ant Design.
      </Paragraph>
    </>
  );
};

export default PageAbout;
