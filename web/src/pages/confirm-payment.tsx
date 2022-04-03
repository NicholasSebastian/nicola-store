import React, { FC, useState } from 'react';
import ReCaptcha from 'react-google-recaptcha';
import styled from 'styled-components';

const ConfirmPayment: FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [notRobot, setNotRobot] = useState(false);

  return (
    <Container>
      <h1>Payment Confirmation</h1>
      <label>
        Order Number
        <input value={orderNumber} onChange={e => setOrderNumber(e.target.value)} />
      </label>
      <label>
        Email Address
        <input value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      {/* TODO: Date */}
      {/* TODO: Destination Bank */}
      {/* TODO: Account Holder Name */}
      {/* TODO: Bank Name */}
      {/* TODO: Amount */}
      <ReCaptcha sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY} onChange={val => setNotRobot(!!val)} />
    </Container>
  );
}

export default ConfirmPayment;

const Container = styled.div`
  // TODO
`;