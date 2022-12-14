import Head from 'next/head';
import { ReactNode } from 'react';
import NavBar from '~/components/NavBar';
import { bindClass } from '~/lib/classNames';
import styles from './styles.module.scss';

interface Props {
  title: string;
  children: ReactNode;
}
const cx = bindClass(styles);
export const MainLayout = ({ children, title }: Props) => {
  return (
    <>
      <Head>
        <meta charSet='UTF-8' />
        <meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <meta
          name='description'
          content='Instagram Clone - Best social network in github not world 😄'
        />
        <title>{title}</title>
      </Head>
      <div className={cx('container')}>
        <NavBar />
        {children}
      </div>
    </>
  );
};
