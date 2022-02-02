import sgMail from '@sendgrid/mail';
import { sign } from 'jsonwebtoken';

import { environmentVariables } from '../../../config/environment';
import { generateEmailHTML } from '../../../utils/generateHtmlForEmailConfirmation';

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

  const linkToConfirmEmail = `${CURRENT_DOMAIN}users/emailvalidation?token=${verificationToken}`;
  const html = generateEmailHTML(linkToConfirmEmail);
  const msg = {
    to: userEmail,
    from: SENDGRID_EMAIL_FROM,
    subject: 'Email Verification',
    text: 'Please click on the link to confirm your email.',
    html: `<html>
    <form method='POST' action='${CURRENT_DOMAIN}users/emailvalidation?token=${verificationToken}'><input type='hidden' value='1'>
    <button type=submit'>Please click here to confirm your email</button>
    </form>
    </html>`,
  };

  try {
    await sgMail.send(msg);
    console.log('Email sent');
  } catch (error) {
    console.error(error);
  }
};
