import { Layout } from 'antd';
import { Typography, Space } from 'antd';
import Booklist from './components/Booklist';
import { Forms } from './components/Form';

import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'

const { Text, Link } = Typography;
const { Header, Footer, Sider, Content } = Layout;

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client = {client}>
    <Layout>
      <Header>
        <Text type="success">Book list</Text>
      </Header>
      <Content style={{ padding: '0 50px' }}>
        <hr></hr>
        <Forms></Forms>
        <hr></hr>
        <Booklist></Booklist>
      </Content>
      <Footer>
        <Text type="warning">Thucnx</Text>
      </Footer>
    </Layout>
    </ApolloProvider>  
  );
}

export default App;
