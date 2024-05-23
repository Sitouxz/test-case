import { Row, Col, Typography, Empty } from 'antd';

const { Text } = Typography;

const PageNotFound: React.FC = () => {
  const styles = {
    textAlign: 'center',
    fontSize: '32px',
    fontWeight: 'bold',
    opacity: 0.5
  } as React.CSSProperties;

  return (
    <Row justify='center' align='middle' style={{ height: '100vh' }}>
      <Col>
        <Col style={{ textAlign: 'center' }}>
          <Empty description={false} />
          <Text style={styles}>Page not found</Text>
        </Col>
      </Col>
    </Row>
  );
};

export default PageNotFound;
