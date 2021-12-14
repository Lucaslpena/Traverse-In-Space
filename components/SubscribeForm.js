import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';
import * as LabelPrimitive from '@radix-ui/react-label';
import {InputField} from './index';
import { RocketIcon } from '@radix-ui/react-icons'
import {useState} from 'react';
import styles from '../styles/SubscribeForm.module.scss'

const FormSubmit = styled('button',{
  all: 'unset',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:disabled': {color: blackA.blackA10}
})
const isEmail = (val) => {
  let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regEmail.test(val)
}

export const SubscribeForm = ({title, number, link, published, updated, ...props}) => {
  const [isValidEmail, setIsValidEmail] = useState(false)
  return(
    <form
      action="https://buttondown.email/api/emails/embed-subscribe/traverse-in.space"
      method="post"
      target="popupwindow"
      onSubmit={() => window.open('https://buttondown.email/traverse-in.space', 'popupwindow')}
      className={styles.Form}
    >
      {/*<label htmlFor="bd-email">Subscribe for updates:</label>*/}
      {/*<input type="email" name="email" id="bd-email"/>*/}
      <InputField
        type={'email'}
        label={'Subscribe for future updates'}
        id={'bd-email'}
        name={'email'}
        placeholder={"ex. Your@email.com"}
        onUpdate={e => {setIsValidEmail(isEmail(e))}}>
        <FormSubmit
          type="submit"
          value="Subscribe"
          disabled={!isValidEmail}
        >
          <RocketIcon />
        </FormSubmit>
      </InputField>

      {/*<p>*/}
      {/*  <a href="https://buttondown.email" target="_blank">Powered by Buttondown.</a>*/}
      {/*</p>*/}
    </form>
  )
}