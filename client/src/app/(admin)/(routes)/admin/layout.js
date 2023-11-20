'use client';
import React from 'react';
import Notifications from '@/components/Notifications/Notifications';
import styles from './layout.module.scss';
import { useCheckAdminStatus } from '@/utils/auth';

const RootLayout = ({ children, ...props }) => {
  const [isAdmin, loading, error] = useCheckAdminStatus();
  console.log(loading);
  if (error) return <div>Error: {error}</div>;
  else if (loading) return <div>Loading...</div>;
  else if (!isAdmin) {
    return <div>Not an Admin</div>;
  }

  return (
    <>
      <div className={styles['layout__content-middle']}>{children}</div>
      <div className={styles['layout__content-right']}>
        <Notifications {...props} />
      </div>
    </>
  );
};
export default RootLayout;
