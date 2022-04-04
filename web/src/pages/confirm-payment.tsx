import React, { FC, useState } from 'react';
import ReCaptcha from 'react-google-recaptcha';
import styled from 'styled-components';
import FormItem from '../components/FormItem';
import useLanguage, { ILocalization } from '../hooks/useLanguage';

const localization: ILocalization = {
  'confirmation': { en: 'Payment Confirmation', id: 'Konfirmasi Pembayaran' },
  'orderNo': { en: 'Order Number', id: 'Nomor Pemesanan' },
  'date': { en: 'Date', id: 'Tanggal' },
  'destination': { en: 'Destination Bank', id: 'Bank Tujuan' },
  'holder': { en: 'Account Holder Name', id: 'Nama Pemegang Akun' },
  'bank': { en: 'Bank Name', id: 'Nama Bank' },
  'amount': { en: 'Amount Paid', id: 'Jumlah Terbayar' }
};

const ConfirmPayment: FC = () => {
  const [language] = useLanguage();
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [accHolder, setAccHolder] = useState('');
  const [bankName, setBankName] = useState('');
  const [amount, setAmount] = useState('');
  const [notRobot, setNotRobot] = useState(false);

  const dateToday = new Date();

  return (
    <Container>
      <h1>{localization.confirmation[language]}</h1>
      <div>
        <div>
          <FormItem label={localization.orderNo[language]} placeholder='Order Number' 
            value={orderNumber} onChange={setOrderNumber} />
          <FormItem label='Email' placeholder='Email Address' 
            value={email} onChange={setEmail} type='email' />
          <FormItem label={localization.date[language]} value={dateToday.toDateString()} />
          {/* TODO: Destination Bank */}
        </div>
        <div>
          <FormItem label={localization.holder[language]} placeholder='Account Holder Name'
            value={accHolder} onChange={setAccHolder} />
          <FormItem label={localization.bank[language]} placeholder='Issued Bank Name' 
            value={bankName} onChange={setBankName} />
          <FormItem label={localization.amount[language]} placeholder='Amount (Rp.)' 
            value={amount} onChange={setAmount} />
          <ReCaptcha sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY} onChange={val => setNotRobot(!!val)} />
        </div>
      </div>
    </Container>
  );
}

export default ConfirmPayment;

const Container = styled.div`
  max-width: 320px;
  margin: 0 auto;
  padding-top: 20px;
  margin-bottom: 110px;

  > h1 {
    font-size: 28px;
  }

  @media only screen and (min-width: 800px) {
    max-width: 680px;

    > div {
      display: flex;
      justify-content: space-between;
      
      > div {
        width: 320px;
      }
    }
  }
`;