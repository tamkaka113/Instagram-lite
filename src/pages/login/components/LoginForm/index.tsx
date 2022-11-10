import FormField from '~/components/FormField';
import styles from './styles.module.scss';
import { bindClass } from '~/lib/classNames';
import { useState } from 'react';
import Image from '~/components/Image';
import { logo } from '~/assets/images';
import Button from '~/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareFacebook } from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';
const cx = bindClass(styles);
const LoginForm = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const onChange = () => {};
  return (
    <div className={cx('main')}>
      <div className={cx('container')}>
        <Image className={cx('img')} src={logo.src} alt='instagram-logo' />
        <form className='wrapper'>
          <div className='inputs'>
            <FormField
              value={email}
              placeholder='Phone number, user or email'
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormField
              value={password}
              placeholder='Password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button className={cx('button')} primary size='lg'>
            Log In
          </Button>
          <div className={cx('con')}>
            <hr className={cx('hr')} />
            <span className={cx('or')}>OR</span>
          </div>
          <div className={cx('wrapper-login')}>
            <div className={cx('facebook-login')}>
              <FontAwesomeIcon icon={faSquareFacebook} className={cx('icon')} />
              <span className={cx('login')}>Log in with facebook</span>
            </div>
            <span className={cx('forgot-password')}>forgot password?</span>
          </div>
        </form>
      </div>
      <div className={cx('wrapper-register')}>
        <span>You don't have an account?</span>
        <Link href={'#'}>Register</Link>
      </div>
    </div>
  );
};

export default LoginForm;
