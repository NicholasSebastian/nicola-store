import React, { FC, Fragment, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { GetStaticProps } from 'next';
import { signIn } from 'next-auth/react';
import styled from 'styled-components';
import useLanguage, { ILocalization } from '../hooks/useLanguage';
import withLayout, { generateLayoutProps } from '../components/layout/Layout';
import SEO from '../components/SEO';
import FormInput from '../components/FormInput';
import Loading from '../components/Loading';
import Button from '../components/Button';
import ReCaptcha from '../components/ReCaptcha';

const localization: ILocalization = {
  'login': { en: 'Log In', id: 'Masuk' },
  'username': { en: 'Username', id: 'Nama Pengguna' },
  'password': { en: 'Password', id: 'Kata Sandi' },
  'signup': { en: 'Sign Up', id: 'Daftar Akun' },
  'confirmPassword': { en: 'Confirm Password', id: 'Konfirmasi Kata Sandi' },
  'name': { en: 'Full Name', id: 'Nama Penuh' },
  'phone': { en: 'Phone Number', id: 'Nomor HP' },
  'address': { en: 'Shipping Address', id: 'Alamat Pengiriman' },
  'newsletter': { en: 'Subscribe to the newsletter.', id: 'Berlangganan newsletter kami.' },
  'createAccount': { en: 'Create an Account', id: 'Buat Akun' },
  'backToLogin': { en: 'Back to the Login Page', id: 'Kembali ke Halaman Login' },
  'success': { en: 'Account Successfully Created.', id: 'Akun Berhasil Dibuat.' },
  'error': { en: 'An error occurred.', id: 'Error terjadi.' },
  'noBlank': { en: 'Must not be blank.', id: 'Wajib di isi.' },
  'usernameTaken': { en: 'Username has already been taken.', id: 'Nama sudah di ambil.' },
  'passwordShort': { en: 'Password is too short.', id: 'Kata sandi terlalu pendek.' },
  'passwordNoMatch': { en: 'Passwords do not match.', id: 'Kata-kata sandi tidak cocok.' },
  'emailInvalid': { en: 'Invalid email address.', id: 'Email salah.' },
  'emailTaken': { en: 'An account with this email already exists.', id: 'Akun dengan email ini sudah ada.' },
  'recaptcha': { en: 'Recaptcha required.', id: 'Recaptcha diperlukan.' }
};

const Login: FC<IPageProps> = ({ changePage }) => {
  const [language] = useLanguage();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = () => {
    const callbackUrl = window.location.origin;
    signIn('credentials', { username, password, callbackUrl });
  }

  return (
    <Container>
      <SEO pageTitle='Log In' noFollow />
      <h1>{localization.login[language]}</h1>
      <LoginErrorMessage />
      <FormInput label={localization.username[language]} placeholder='Username' 
        value={username} onChange={setUsername} />
      <FormInput label={localization.password[language]} placeholder='Password'
        value={password} onChange={setPassword} 
        type={showPassword ? "text" : "password"}
        extra={
          <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
          </button>
        } />
      <label style={{ display: 'none' }} />
      <Button primary onClick={onSubmit}>{localization.login[language]}</Button>
      <hr />
      <Button primary onClick={changePage}>{localization.signup[language]}</Button>
    </Container>
  );
}

const SignUp: FC<IPageProps> = ({ changePage }) => {
  const [language] = useLanguage();

  // Forms in React are a pain in the butt.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [cPassword, setCPassword] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [notRobot, setNotRobot] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);
  const [recaptchaError, setRecaptchaError] = useState(false);
  const [errors, setErrors] = useState<ISignUpErrors>({
    usernameBlank: false, 
    usernameTaken: false, 
    passwordBlank: false, 
    passwordShort: false, 
    passwordNoMatch: false,
    nameBlank: false,
    emailBlank: false,
    emailInvalid: false,
    emailTaken: false,
    phoneBlank: false,
    addressBlank: false
  });

  const onSubmit = () => {
    setRecaptchaError(!notRobot);
    if (!notRobot) return;

    setLoading(true);
    fetch('/api/auth/signup', { 
      method: 'POST', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, password, cPassword, fullname, email, phone, address, newsletter 
      }) 
    })
    .then(results => {
      if (results.status === 200) {
        setSuccess(true);
      }
      else if (results.status === 400) {
        results.json().then(({ errors }) => setErrors(errors));
      }
      else {
        setServerError(true);
      }
    })
    .finally(() => {
      setLoading(false);
      window.scrollTo(0, 0);
    });
  };

  const onLeave = () => {
    if (success) setSuccess(false);
    changePage();
  }

  return loading ? <Loading /> : (
    <Container>
      <SEO pageTitle='Sign Up' noFollow />
      {success ? 
        <h4>{localization.success[language]}</h4> : (
        <Fragment>
          <h1>{localization.createAccount[language]}</h1>
          {serverError && <div>{localization.error[language]}</div>}
          <FormInput label={localization.username[language]} placeholder='Username' 
            value={username} onChange={setUsername}
            errorMessages={[
              { condition: errors.usernameBlank, message: localization.noBlank[language] },
              { condition: errors.usernameTaken, message: localization.usernameTaken[language] }
            ]} />
          <FormInput label={localization.password[language]} placeholder='Password' 
            value={password} onChange={setPassword} type='password'
            errorMessages={[
              { condition: errors.passwordBlank, message: localization.noBlank[language] },
              { condition: errors.passwordShort, message: localization.passwordShort[language] }
            ]} />
          <FormInput label={localization.confirmPassword[language]} placeholder='Confirm Password' 
            value={cPassword} onChange={setCPassword} type="password"
            errorMessages={[
              { condition: errors.passwordNoMatch, message: localization.passwordNoMatch[language] }
            ]} />
          <FormInput label={localization.name[language]} placeholder='Full Name'
            value={fullname} onChange={setFullname}
            errorMessages={[
              { condition: errors.nameBlank, message: localization.noBlank[language] }
            ]} />
          <FormInput label='Email' placeholder='Email Address' 
            value={email} onChange={setEmail} type="email"
            errorMessages={[
              { condition: errors.emailBlank, message: localization.noBlank[language] },
              { condition: errors.emailInvalid, message: localization.emailInvalid[language] },
              { condition: errors.emailTaken, message: localization.emailTaken[language] }
            ]} />
          <FormInput label={localization.phone[language]} placeholder='Phone Number'
            value={phone} onChange={setPhone} type="tel"
            errorMessages={[
              { condition: errors.phoneBlank, message: localization.noBlank[language] }
            ]} />
          <FormInput label={localization.address[language]} placeholder='Shipping Address'
            value={address} onChange={setAddress} type='textarea'
            errorMessages={[
              { condition: errors.addressBlank, message: localization.noBlank[language] }
            ]} />
          <label>
            <input type='checkbox' checked={newsletter} onChange={() => setNewsletter(!newsletter)} />
            {localization.newsletter[language]}
          </label>
          {recaptchaError && <span>{localization.recaptcha[language]}</span>}
          <ReCaptcha onChange={val => setNotRobot(!!val)} />
          <Button primary onClick={onSubmit}>{localization.signup[language]}</Button>
          <hr />
        </Fragment>
      )}
      <Button primary onClick={onLeave}>{localization.backToLogin[language]}</Button>
    </Container>
  );
}

const LoginErrorMessage: FC = () => {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    if (params.has('error')) {
      const invalidCreds = params.get('error') === 'CredentialsSignin';
      return <div>{invalidCreds ? 'Invalid Credentials.' : 'An Error Occurred.'}</div>
    }
  }
  return null;
}

const Page: FC = () => {
  const [signupPage, setSignupPage] = useState(false);
  return signupPage ? 
    <SignUp changePage={() => setSignupPage(false)} /> : 
    <Login changePage={() => setSignupPage(true)} />;
}

export default withLayout(Page);
export const getStaticProps: GetStaticProps = generateLayoutProps;

const Container = styled.div`
  max-width: 320px;
  margin: 0 auto;
  padding-top: 20px;
  margin-bottom: 110px;

  > h1 {
    font-size: 28px;
  }

  > div:first-of-type {
    color: #f44;
    font-size: 14px;
  }

  // Sign-up page Newsletter checkbox.
  > label:last-of-type {
    display: flex;
    justify-content: start;
    align-items: center;
    font-size: 14px;
    user-select: none;
    margin-bottom: 20px;

    > input {
      margin: 0;
      margin-right: 8px;
    }

    :hover {
      cursor: pointer;
    }
  }

  > span:last-of-type {
    color: #f44;
    font-size: 12px;
  }

  > button {
    width: 100%;
    padding: 10px 0;

    :first-of-type {
      margin-top: 20px;
    }
  }

  > hr {
    margin: 20px 0;
  }
`;

interface IPageProps {
  changePage: () => void
}

export interface ISignUpErrors {
  usernameBlank: boolean, 
  usernameTaken: boolean, 
  passwordBlank: boolean, 
  passwordShort: boolean, 
  passwordNoMatch: boolean,
  nameBlank: boolean,
  emailBlank: boolean,
  emailInvalid: boolean,
  emailTaken: boolean,
  phoneBlank: boolean,
  addressBlank: boolean
}
