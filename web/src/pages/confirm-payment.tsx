import React, { FC, Fragment, useEffect, useState } from 'react';
import ReCaptcha from 'react-google-recaptcha';
import { BiCalendarMinus, BiCalendarPlus } from 'react-icons/bi';
import styled from 'styled-components';
import useLanguage, { ILocalization } from '../hooks/useLanguage';
import FormInput from '../components/FormInput';
import FormOption from '../components/FormOption';

const localization: ILocalization = {
  'confirmation': { en: 'Payment Confirmation', id: 'Konfirmasi Pembayaran' },
  'orderNo': { en: 'Order Number', id: 'Nomor Pemesanan' },
  'date': { en: 'Date', id: 'Tanggal' },
  'destination': { en: 'Destination Bank', id: 'Bank Tujuan' },
  'holder': { en: 'Account Holder Name', id: 'Nama Pemegang Akun' },
  'bank': { en: 'Bank Name', id: 'Nama Bank' },
  'amount': { en: 'Amount Paid', id: 'Jumlah Terbayar' },
  'confirm': { en: 'Confirm Payment', id: 'Konfirmasi Pembayaran' }
};

const ConfirmPayment: FC = () => {
  const [language] = useLanguage();
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState(new Date());
  const [bank, setBank] = useState('bca');
  const [accHolder, setAccHolder] = useState('');
  const [bankName, setBankName] = useState('');
  const [amount, setAmount] = useState('');
  const [notRobot, setNotRobot] = useState(false);
  
  useEffect(() => console.log(bank), [bank]);

  const onSubmit = () => {
    // TODO
  }

  return (
    <Container>
      <h1>{localization.confirmation[language]}</h1>
      <div>
        <div>
          <FormInput label={localization.orderNo[language]} placeholder='Order Number' 
            value={orderNumber} onChange={setOrderNumber} />
          <FormInput label='Email' placeholder='Email Address' 
            value={email} onChange={setEmail} type='email' />
          <FormInput label={localization.date[language]} value={date.toDateString()}
            extra={
              <Fragment>
                <button onClick={() => setDate(date => new Date(date.getTime() - 86400000))}>
                  <BiCalendarMinus size={22} />
                </button>
                <button onClick={() => setDate(date => new Date(date.getTime() + 86400000))}>
                  <BiCalendarPlus size={22} />
                </button>
              </Fragment>
            } />
          <FormOption label={localization.destination[language]} id='bank' 
            value={bank} onChange={setBank}
            options={[
              { label: 'BCA', value: 'bca' },
              { label: 'Panin Bank', value: 'panin' }
            ]} />
        </div>
        <div>
          <FormInput label={localization.holder[language]} placeholder='Account Holder Name'
            value={accHolder} onChange={setAccHolder} />
          <FormInput label={localization.bank[language]} placeholder='Issued Bank Name' 
            value={bankName} onChange={setBankName} />
          <FormInput label={localization.amount[language]} placeholder='Amount (Rp.)' 
            value={amount} onChange={setAmount} />
          <ReCaptcha sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY} onChange={val => setNotRobot(!!val)} />
        </div>
      </div>
      <button onClick={onSubmit}>{localization.confirm[language]}</button>
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