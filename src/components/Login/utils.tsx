import { forwardRef } from 'react';
import { CountryType, MaskPhoneProps } from './types';
import { IMaskInput } from 'react-imask';

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
        mask={`+${name} (#00) 000-0000`}
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
