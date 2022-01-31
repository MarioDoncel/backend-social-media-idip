import sgMail from '@sendgrid/mail';
import { sign } from 'jsonwebtoken';

import { environmentVariables } from '../../../config/environment';

const {
  SENDGRID_API_KEY,
  CURRENT_DOMAIN,
  SENDGRID_EMAIL_FROM,
  VERIFICATION_EMAIL_SECRET,
} = environmentVariables;

sgMail.setApiKey(SENDGRID_API_KEY);

export const sendUserVerificationEmailService = async (
  userEmail: string,
  id: string
) => {
  const verificationToken = sign({}, VERIFICATION_EMAIL_SECRET, {
    subject: id,
    expiresIn: '1d',
  });

  const msg = {
    to: userEmail,
    from: SENDGRID_EMAIL_FROM,
    subject: 'Email Verification',
    text: 'Please click on the link to confirm your email.',
    html: `<html>
    <p>Please click on the link to confirm your email</p>
    <a href="${CURRENT_DOMAIN}users/emailvalidation?token=${verificationToken}">Confirm Email</a>
    <p>Link to confirm email:</br> ${CURRENT_DOMAIN}/users/validation/${verificationToken}</p></html>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.error(error);
  }
};
