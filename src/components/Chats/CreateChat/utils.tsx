import { forwardRef } from 'react';
import { CountryType, MaskPhoneProps, brazilCodes } from './types';
import { IMaskInput } from 'react-imask';
import { getUrl } from '../../../api/baseApi';

export const getCountryFlag = (country: CountryType) => {
  return (
    <img
      loading="lazy"
      width="20"
      srcSet={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png 2x`}
      src={`https://flagcdn.com/w20/${country.code.toLowerCase()}.png`}
      alt=""
    />
  );
};

export const MaskPhone = forwardRef<HTMLInputElement, MaskPhoneProps>(
  function MaskPhone(props, ref) {
    const { onChange, name, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask={name === '55' ? `+${name} #000 00-00` : `+${name} #00 000-00-00`}
        definitions={{
          '#': /[1-9]/,
        }}
        inputRef={ref}
        onAccept={(value: string) => onChange({ target: { name, value } })}
        overwrite
      />
    );
  }
);

export const checkNumber = async (
  idInstance: number | null,
  apiTokenInstance: string | null,
  phone: string
) => {
  try {
    if (idInstance && apiTokenInstance) {
      const response = await fetch(
        getUrl(idInstance, apiTokenInstance, 'checkWhatsapp'),
        {
          method: 'POST',
          body: JSON.stringify({ phoneNumber: phone }),
        }
      );
      const data: { existsWhatsapp: boolean } = await response.json();

      return data.existsWhatsapp;
    }
  } catch (error) {
    console.error('Error:', error);
  }
  return false;
};

export const getPhone = (
  phoneNumber: string,
  code: string,
  numCode: string,
  regionCode?: string
) => {
  let phone = `${phoneNumber}@c.us`;

  switch (code) {
    case 'MX': {
      phone = `${phoneNumber.replace(numCode, `${numCode}1`)}@c.us`;
      break;
    }
    case 'AR': {
      phone = `${phoneNumber.replace(numCode, `${numCode}9`)}@c.us`;
      break;
    }
    case 'BR': {
      const isAddNine =
        brazilCodes.findIndex((code) => {
          return code.toString() === regionCode;
        }) !== -1;

      phone = `${phoneNumber.replace(numCode, `${numCode}${regionCode}${isAddNine ? '9' : ''}`)}@c.us`;
      break;
    }
    default: {
      phone = `${phoneNumber}@c.us`;
      break;
    }
  }
  return phone;
};
