import {styled} from '@stitches/react';
import * as LabelPrimitive from '@radix-ui/react-label';
import {blackA} from '@radix-ui/colors';

export const StyledLabel = styled(LabelPrimitive.Root, {
  fontSize: 14,
  fontVariationSettings: `"wght" 650`,
  color: blackA.blackA12,
  userSelect: 'none',
  letterSpacing: 2,
});
