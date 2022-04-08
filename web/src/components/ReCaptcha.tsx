import React, { FC } from 'react';
import ReCaptcha, { ReCAPTCHAProps } from 'react-google-recaptcha';

const Captcha: FC<CaptchaProps> = props => 
  <ReCaptcha sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY} {...props} />

export default Captcha;

type CaptchaProps = Omit<ReCAPTCHAProps, "sitekey">