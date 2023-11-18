import React from 'react';
import Sidebar from '@/components/Sidebar/Sidebar';
import MusicComponent from '@/components/MusicComponent/MusicComponent';
import Notifications from '@/components/Notifications/Notifications';
import styles from './LayoutWrapper.module.scss';
import { withAuthenticator } from '@aws-amplify/ui-react';
import Header from '@/components/Header/Header';
import ImageGrid from '@/components/ImageGrid/ImageGrid';
import Filter from '@/components/Filters/Filter';
import { GET_ALL_SONGS } from '@/utils/api-end-points';

export const metadata = {
  title: 'JukeBox',
  description: 'My Project',
};

const LayoutWrapper = ({ children, ...props }) => {
  return (
    <div className={styles['layout']}>
      <Sidebar {...props} />
      <div className={styles['layout__content-middle']}>
        <Header />
        <Filter />
        <ImageGrid apiRoute={GET_ALL_SONGS} {...props} />
        {children}
      </div>
      <div className={styles['layout__content-right']}>
        <Notifications {...props} />
        <MusicComponent {...props} />
      </div>
    </div>
  );
};
export default withAuthenticator(LayoutWrapper);
