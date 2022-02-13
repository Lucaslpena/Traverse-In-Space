import React, {useEffect, useState} from 'react';
import { styled } from '@stitches/react';
import { violet, blackA } from '@radix-ui/colors';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import {Label, MotionLabel} from '.';
import styles from '../styles/MobileNav.module.scss';
import {AnimatePresence} from 'framer-motion';

export const MobileNav = ({onChange, items, current}) => {
  const [currentIndex, setCurrentIndex] = useState(current)
  useEffect(() => {
    console.log(`current changed: ${current}`)
    console.log(`on index: ${currentIndex}`)
    setCurrentIndex(current)
  }, [current])
  const StyledRadio = styled(RadioGroupPrimitive.Item, {
    all: 'unset',
    backgroundColor: 'white',
    width: 25,
    height: 25,
    borderRadius: '100%',
    boxShadow: `0 2px 10px ${blackA.blackA7}`,
    '&:hover': { backgroundColor: blackA.blackA },
    '&:focus': { boxShadow: `0 0 0 2px black` },
  });
  const StyledIndicator = styled(RadioGroupPrimitive.Indicator, {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    position: 'relative',
    '&::after': {
      content: '""',
      display: 'block',
      width: 11,
      height: 11,
      borderRadius: '50%',
      backgroundColor: blackA.blackA11,
    },
  });

  const generatedLabels = items.map((data,i) =>
    <MotionLabel
      key={i}
      initial={ {opacity: 0}}
      exit={    {opacity: 0}}
      animate={ {opacity: 1}}
    >
      {data.title}
    </MotionLabel>
  )

  return(
    <nav>
      <form className={styles.MobileNavContainer}>

        <AnimatePresence exitBeforeEnter={true}>
          {generatedLabels[currentIndex]}
        </AnimatePresence>

        <RadioGroupPrimitive.Root
          defaultValue={current}
          value={currentIndex}
          aria-label="View density"
          className={styles.RadioGroup}
          onValueChange={(e) => {
            setCurrentIndex(parseInt(e))
            onChange(e)
          }}
        >
          { items.map((data,i) =>
            <StyledRadio key={i} value={i} id={i}>
              <StyledIndicator/>
            </StyledRadio>)
          }

          {/*<div className={styles.radioContainer}>*/}
          {/*  <StyledRadio value="comfortable" id="r1">*/}
          {/*    <StyledIndicator/>*/}
          {/*  </StyledRadio>*/}
          {/*  /!*<Label htmlFor="r1">Comfortable</Label>*!/*/}
          {/*</div>*/}

          {/*<div className={styles.radioContainer}>*/}
          {/*  <StyledRadio value="fabric" id="r2">*/}
          {/*    <StyledIndicator/>*/}
          {/*  </StyledRadio>*/}
          {/*  /!*<Label htmlFor="r2">Fabric</Label>*!/*/}
          {/*</div>*/}

          {/*<div className={styles.radioContainer}>*/}
          {/*  <StyledRadio value="sofa" id="r3">*/}
          {/*    <StyledIndicator/>*/}
          {/*  </StyledRadio>*/}
          {/*  /!*<Label htmlFor="r3">Sofa</Label>*!/*/}
          {/*</div>*/}
        </RadioGroupPrimitive.Root>
      </form>
    </nav>
  )
}