import React, { FC, Fragment, useState } from 'react';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import ReCaptcha from 'react-google-recaptcha';
import { signIn } from 'next-auth/react';
import styled from 'styled-components';
import useLanguage, { ILocalization } from '../hooks/useLanguage';
import { fgFromBg } from '../utils/lightOrDark';
import SEO from '../components/SEO';
import Loading from '../components/Loading';

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
      <SEO pageTitle='Log In' />
      <h1>{localization.login[language]}</h1>
      <LoginValidity />
      <label>
        {localization.username[language]}
        <input type="text" placeholder='Username' value={username}
          onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        {localization.password[language]}
        <input type={showPassword ? "text" : "password"} placeholder='Password' 
          value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? <AiOutlineEyeInvisible size={22} /> : <AiOutlineEye size={22} />}
        </button>
      </label>
      <label style={{ display: 'none' }} />
      <button onClick={onSubmit}>{localization.login[language]}</button>
      <hr />
      <button onClick={changePage}>{localization.signup[language]}</button>
    </Container>
  );
}

const SignUp: FC<IPageProps> = ({ changePage }) => {
  const [language] = useLanguage();

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
      <SEO pageTitle='Sign Up' />
      {success ? 
        <h4>{localization.success[language]}</h4> : (
        <Fragment>
          <h1>{localization.createAccount[language]}</h1>
          {serverError && <div>{localization.error[language]}</div>}
          <label>
            {localization.username[language]}
            {errors.usernameBlank && <span>{localization.noBlank[language]}</span>}
            {errors.usernameTaken && <span>{localization.usernameTaken[language]}</span>}
            <input type="text" placeholder='Username' value={username}
              onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            {localization.password[language]}
            {errors.passwordBlank && <span>{localization.noBlank[language]}</span>}
            {errors.passwordShort && <span>{localization.passwordShort[language]}</span>}
            <input type="password" placeholder='Password' value={password}
              onChange={e => setPassword(e.target.value)} />
          </label>
          <label>
            {localization.confirmPassword[language]}
            {errors.passwordNoMatch && <span>{localization.passwordNoMatch[language]}</span>}
            <input type="password" placeholder='Confirm Password' value={cPassword}
              onChange={e => setCPassword(e.target.value)} />
          </label>
          <label>
            {localization.name[language]}
            {errors.nameBlank && <span>{localization.noBlank[language]}</span>}
            <input type="text" placeholder='Full Name' value={fullname}
              onChange={e => setFullname(e.target.value)} />
          </label>
          <label>
            Email
            {errors.emailBlank && <span>{localization.noBlank[language]}</span>}
            {errors.emailInvalid && <span>{localization.emailInvalid[language]}</span>}
            {errors.emailTaken && <span>{localization.emailTaken[language]}</span>}
            <input type="email" placeholder='Email Address' value={email}
              onChange={e => setEmail(e.target.value)} />
          </label>
          <label>
            {localization.phone[language]}
            {errors.phoneBlank && <span>{localization.noBlank[language]}</span>}
            <input type="tel" placeholder='Phone Number' value={phone}
              onChange={e => setPhone(e.target.value)} />
          </label>
          <label>
            {localization.address[language]}
            {errors.addressBlank && <span>{localization.noBlank[language]}</span>}
            <textarea placeholder='Shipping Address' value={address}
              onChange={e => setAddress(e.target.value)} />
          </label>
          <label>
            <input type='checkbox' checked={newsletter} onChange={() => setNewsletter(!newsletter)} />
            {localization.newsletter[language]}
          </label>
          {recaptchaError && <span>{localization.recaptcha[language]}</span>}
          <ReCaptcha sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY} onChange={val => setNotRobot(!!val)} />
          <button onClick={onSubmit}>{localization.signup[language]}</button>
          <hr />
        </Fragment>
      )}
      <button onClick={onLeave}>{localization.backToLogin[language]}</button>
    </Container>
  );
}

const LoginValidity: FC = () => {
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

export default Page;

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

  > label {
    display: block;
    margin-top: 20px;
    position: relative;

    // Form fields.
    :not(:last-of-type) {
      font-size: 12px;
      font-weight: 600;

      > span {
        color: #f44;
        font-weight: 400;
        margin-left: 10px;
      }
      
      > input, > textarea {
        width: 100%;
        background: transparent;
        border: 1px solid ${props => props.theme.accent};
        padding: 10px;
        margin-top: 2px;

        :focus {
          outline: none;
        }
      }

      > textarea {
        resize: vertical;
        min-height: 64px;
      }

      > button {
        position: absolute;
        bottom: 0;
        right: 0;

        background: none;
        border: none;
        display: flex;
        align-items: center;
        padding: 10px;

        :hover {
          cursor: pointer;
        }
      }
    }

    // Sign-up page Newsletter checkbox.
    :last-of-type {
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
  }

  > span:last-of-type {
    color: #f44;
    font-size: 12px;
  }

  > button {
    width: 100%;
    background: ${props => props.theme.accent};
    color: ${props => fgFromBg(props.theme.accent)};
    border: 1px solid ${props => props.theme.accent};
    padding: 10px 0;
    font-size: 14px;
    font-weight: 600;
    transition: all 100ms linear;

    :hover {
      cursor: pointer;
      background-color: ${props => props.theme.bg};
      color: ${props => fgFromBg(props.theme.bg)};
    }

    :first-of-type {
      margin-top: 25px;
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
