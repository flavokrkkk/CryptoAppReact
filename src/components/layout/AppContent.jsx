import React from 'react';
import { Layout, Typography } from 'antd';

const contentStyle = {
    textAlign: 'center',
    minHeight: 'calc(100vh - 60px)',
    color: '#fff',
    backgroundColor: '#001529',
  };
  
const AppContent = () => {
    return (
        <Layout.Content style={contentStyle}>
            <Typography.Title level={3}>
                Portfolio: 12000$
            </Typography.Title>
        </Layout.Content>
    );
};

export default AppContent;