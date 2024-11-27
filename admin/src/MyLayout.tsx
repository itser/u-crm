import { Layout } from 'react-admin';
import { MyMenu } from './MyMenu';

// @ts-ignore
export const MyLayout = ({ children }) => (
    <Layout menu={MyMenu}>
        {children}
    </Layout>
);