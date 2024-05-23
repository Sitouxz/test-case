import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Typography, Spin, Empty, Row, Col } from 'antd';
import api from '../../config/axios';

const { Title, Paragraph } = Typography;

interface NewsStory {
  title: string;
  urlToImage: string;
  content: string;
  description: string;
}

interface RouteParams {
  title: string;
  [key: string]: string | undefined;
}

const PageDetails: React.FC = () => {
  const { title } = useParams<RouteParams>();
  const [loading, setLoading] = useState<boolean>(true);
  const [newsDetails, setNewsDetails] = useState<NewsStory | null>(null);

  useEffect(() => {
    api
      .get(`/everything?searchIn=title&q=${title}`)
      .then((response) => {
        setNewsDetails(response.data.articles[0]);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching news details:', error);
        setLoading(false);
      });
  }, [title]);

  if (loading) {
    return <Spin size='large' />;
  }

  if (!newsDetails) {
    return <div>No news details found for '{title}'</div>;
  }

  return (
    <div>
      <Title level={2}>{newsDetails.title?.replace(/%20/g, ' ')}</Title>
      {newsDetails.urlToImage ? (
        <img
          src={newsDetails.urlToImage}
          alt='News'
          style={{ marginBottom: '20px', maxWidth: '100%' }}
        />
      ) : (
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={<span>No Image</span>}
          style={{ marginBottom: '20px' }}
        />
      )}
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={12}>
          <Paragraph>{newsDetails.description}</Paragraph>
          <Paragraph>{newsDetails.content}</Paragraph>
        </Col>
      </Row>
    </div>
  );
};

export default PageDetails;
