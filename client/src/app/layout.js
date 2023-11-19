'use client';
import './global.scss';
import Providers from '@/utils/Provider';
import { Amplify } from 'aws-amplify';
import awsconfig from '../aws-exports';
import styles from './layout.module.scss';
import Sidebar from '@/app/_components/Sidebar/Sidebar';

Amplify.configure(awsconfig, { ssr: true });

const RootLayout = ({ children, ...props }) => {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className={styles['layout']}>
            {/* // Display flex */}
            <Sidebar />
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
};

export default RootLayout;
