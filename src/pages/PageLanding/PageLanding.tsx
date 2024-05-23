import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Layout, Empty } from 'antd';
import api from '../../config/axios';
import { Link } from 'react-router-dom';

const { Content } = Layout;
const { Title, Paragraph } = Typography;

interface NewsStory {
  source: { id: string | null; name: string };
  author: string | null;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length > maxLength) {
    return text.substring(0, maxLength) + '...';
  }
  return text;
};

const PageLanding: React.FC = () => {
  const [topStory, setTopStory] = useState<NewsStory | null>(null);
  const [newsList, setNewsList] = useState<NewsStory[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api
      .get('/top-headlines', {
        params: {
          country: 'us',
          pageSize: 1,
          language: 'en'
        }
      })
      .then((response) => {
        const articles = response.data.articles;
        if (articles.length > 0) {
          setTopStory(articles[0]);
        }
      })
      .catch((error) => {
        setError(error.message);
      });

    api
      .get('/everything', {
        params: {
          pageSize: 10,
          page: 2,
          language: 'en',
          q: 'us',
          sortBy: 'publishedAt'
        }
      })
      .then((response) => {
        setNewsList(response.data.articles || []); // Ensure newsList is always initialized
      })
      .catch((error) => {
        console.log(error);

        setError(error.response?.data?.message || 'An error occurred');
      });
  }, []);

  if (error) {
    return (
      <div>
        <Title level={2}>Error</Title>
        {error}
      </div>
    );
  }

  return (
    <Layout>
      <Content className='content'>
        <div className='headline-section'>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              {topStory?.urlToImage ? (
                <img
                  src={topStory.urlToImage}
                  alt='Top story'
                  className='headline-image'
                />
              ) : (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={<span>No Image</span>}
                  className='headline-image-empty'
                />
              )}
            </Col>
            <Col xs={24} md={12}>
              <Title level={3}>{topStory?.title}</Title>
              <Paragraph>
                {truncateText(topStory?.description || '', 150)}
              </Paragraph>
            </Col>
          </Row>
        </div>
        <Title level={3} style={{ marginTop: '2rem' }}>
          Latest
        </Title>
        <div className='news-list-section'>
          <Row gutter={[16, 16]}>
            {newsList.map((news) => (
              <Col xs={24} md={12} lg={8} key={news.url}>
                <Link to={`/news-details/${news.title}`}>
                  <Card
                    className='news-card'
                    hoverable
                    cover={
                      news.urlToImage ? (
                        <img
                          alt='news'
                          src={news.urlToImage}
                          className='news-image'
                        />
                      ) : (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={<span>No Image</span>}
                          className='news-image-empty'
                        />
                      )
                    }>
                    <Card.Meta
                      title={
                        <a
                          href={news.url}
                          target='_blank'
                          rel='noopener noreferrer'>
                          {news.title}
                        </a>
                      }
                      description={truncateText(news.description || '', 100)} // Ensure description is not null
                      className='card-meta'
                    />
                  </Card>
                </Link>
              </Col>
            ))}
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default PageLanding;
