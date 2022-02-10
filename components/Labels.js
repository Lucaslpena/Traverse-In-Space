import {styled} from '@stitches/react';
import * as LabelPrimitive from '@radix-ui/react-label';
import {blackA} from '@radix-ui/colors';
import {motion} from 'framer-motion';

export const StyledLabel = styled(LabelPrimitive.Root, {
  fontSize: 14,
  fontVariationSettings: `"wght" 650`,
  color: blackA.blackA12,
  userSelect: 'none',
  letterSpacing: 2,
});

export const Label = styled('label', {
  fontSize: 14,
  lineHeight: 1,
  paddingLeft: 15,
  fontVariationSettings: `"wght" 650`,
  color: blackA.blackA12,
  userSelect: 'none',
  letterSpacing: 2,
});

export const MotionLabel = ({...props}) => {
  const MotionLabel = styled(motion.label, {
    fontSize: 14,
    lineHeight: 1,
    fontVariationSettings: `"wght" 650`,
    color: blackA.blackA12,
    userSelect: 'none',
    letterSpacing: 2,
  });
  return <MotionLabel {...props} />
}


