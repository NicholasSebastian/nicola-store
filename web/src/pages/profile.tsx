import React, { FC, useState } from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getSession, signOut } from 'next-auth/react';
import styled from 'styled-components';
import db from '../lib/firestore';
import useLanguage, { ILocalization } from '../hooks/useLanguage';
import { fgFromBg } from '../utils/lightOrDark';
import SEO from '../components/SEO';

const localization: ILocalization = {
  'username': { en: 'Username', id: 'Nama Pengguna' },
  'name': { en: 'Full Name', id: 'Nama Penuh' },
  'phone': { en: 'Phone Number', id: 'Nomor HP' },
  'address': { en: 'Shipping Address', id: 'Alamat Pengiriman' }
};

const Information: FC<IProfileProps> = props => {
  const [language] = useLanguage();
  const [fullname, setFullname] = useState(props.fullname);
  const [email, setEmail] = useState(props.email);
  const [phone, setPhone] = useState(props.phone);
  const [address, setAddress] = useState(props.address);

  const updateProfile = async () => {
    // TODO
  }

  return (
    <Form>
      <label>
        {localization.username[language]}
        <input value={props.username} disabled />
      </label>
      <label>
        {localization.name[language]}
        <input value={fullname} onChange={e => setFullname(e.target.value)} />
      </label>
      <label>
        Email
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        {localization.phone[language]}
        <input value={phone} onChange={e => setPhone(e.target.value)} />
      </label>
      <label>
        {localization.address[language]}
        <textarea value={address} onChange={e => setAddress(e.target.value)} />
      </label>
      <button onClick={updateProfile}>Save Changes</button>
    </Form>
  );
}

const Orders: FC = () => {
  // TODO
  return (
    <div>Orders</div>
  );
}

const Profile: FC = (props: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [currentPage, setCurrentPage] = useState<Page>('profile');

  const pages: Pages = {
    profile: <Information {...props as IProfileProps} />,
    orders: <Orders />
  };

  return (
    <Container>
      <SEO pageTitle='Profile' />
      <nav>
        <button onClick={() => setCurrentPage('profile')} 
          className={currentPage === 'profile' && 'selected'}>
          Profile
        </button>
        <button onClick={() => setCurrentPage('orders')}
          className={currentPage === 'orders' && 'selected'}>
          Order History
        </button>
        <button onClick={() => signOut()}>Sign Out</button>
      </nav>
      {pages[currentPage]}
    </Container>
  );
}

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  if (session) {
    const { name } = session.user;
    const accountsRef = db.collection('accounts');
    const account = await accountsRef.doc(name).get();

    if (account.exists) {
      const { fullname, email, address, phone } = account.data();
      return {
        props: {
          username: name,
          fullname,
          email,
          address,
          phone
        }
      };
    }

    return { notFound: true };
  }

  return { 
    redirect: { 
      destination: '/', 
      permanent: false 
    } 
  };
}

const Container = styled.div`
  width: 90%;
  max-width: 600px;
  margin: 0 auto;
  padding-top: 50px;
  padding-bottom: 130px;

  > nav:first-child > button.selected {
    background-color: ${props => props.theme.accent};
    color: ${props => fgFromBg(props.theme.accent)};
  }

  @media only screen and (max-width: 1024px) {
    > nav:first-child {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      margin-bottom: 30px;

      > button {
        background-color: transparent;
        border: 1px solid ${props => props.theme.accent};
        padding: 5px 0;
        font-size: 12px;
        font-weight: 600;

        :first-child {
          border-right: none;
        }

        :last-child {
          border-left: none;
        }

        :hover:not(.selected) {
          cursor: pointer;
        }
      }
    }
  }

  @media only screen and (min-width: 1024px) {
    max-width: 900px;
    display: grid;
    grid-template-columns: 300px 1fr;

    > nav:first-child {
      border-right: 1px solid ${props => props.theme.shadow};
      padding-right: 50px;

      > button {
        display: block;
        width: 100%;
        background: transparent;
        border: none;
        padding: 10px 0;
        font-size: 13px;
        font-weight: 600;

        :hover:not(.selected) {
          cursor: pointer;
          background: ${props => props.theme.highlight};
        }
      }
    }
  }

  @media only screen and (min-width: 1366px) {
    max-width: 1300px;
  }
`;

const Form = styled.section`
  max-width: 320px;
  margin: 0 auto;

  > label {
    display: block;
    margin-bottom: 24px;
    font-size: 12px;
    font-weight: 600;

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
  }
`;

type Page = 'profile' | 'orders';
type Pages = { [key in Page]: JSX.Element }

interface IProfileProps {
  username: string
  fullname: string
  email: string
  address: string
  phone: string
}