import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';
import * as LabelPrimitive from '@radix-ui/react-label';
import styles from './RenderItem.module.scss'

const StyledLabel = styled(LabelPrimitive.Root, {
  fontSize: 14,
  fontWeight: 500,
  color: blackA.blackA12,
  userSelect: 'none',
  letterSpacing: 2
});


function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

export const RenderItemRow = ({title, number, link, published, updated, ...props}) => {
  return(
    <section
      {...props}
      className={styles.renderTitles}
    >
      <StyledLabel>n.{pad(number, 3)}</StyledLabel>
      <div>
      <p>{title}</p>
      {/*/!*{published ? *!/*/}
      {/*<StyledLabel>Soon to be public</StyledLabel>*/}
      {/*/!*}*!/*/}
      </div>
    </section>
  )
}