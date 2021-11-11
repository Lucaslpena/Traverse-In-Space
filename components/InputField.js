import React from 'react';
import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';
import * as LabelPrimitive from '@radix-ui/react-label';

// Todo -- children prop doesnt uniformly fit here

const StyledLabel = styled(LabelPrimitive.Root, {
  fontSize: 14,
  fontVariationSettings: `"wght" 650`,
  color: blackA.blackA12,
  userSelect: 'none',
});

const StyledContainer = styled('div', {
  display: 'grid',
  grid: 'min-content 1fr / 320px 40px',
  gridRowGap: '.5rem'
})

const Input = styled('input', {
  all: 'unset',
  width: 300,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  padding: '0 10px',
  height: 35,
  fontSize: 15,
  lineHeight: 1,
  color: blackA.blackA12,
  gridColumn: '1 / 2',
  backgroundColor: blackA.blackA3,
  boxShadow: `0 0 0 1px ${blackA.blackA9}`,
  '&:focus': { boxShadow: `0 0 0 2px black` },
});

export const InputField = ({id, label, onUpdate, type, children, ...props}) => (
  <StyledContainer>
    <StyledLabel htmlFor={id}>{label}</StyledLabel>
    <Input
      type={type}
      namille={label}
      id={id}
      onChange={e => onUpdate(e.target.value)}
      {...props}
    />
    {children}
  </StyledContainer>
)

