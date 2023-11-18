'use client';
import './global.scss';
import Providers from '@/utils/Provider';
import LayoutWrapper from './LayoutWrapper';
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';

Amplify.configure(awsconfig, { ssr: true });

const RootLayout = ({ children, ...props }) => {
  console.log(props);
  return (
    <html lang="en">
      <body>
        <Providers>
          <LayoutWrapper>{children}</LayoutWrapper>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
