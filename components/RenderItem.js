import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';
import * as LabelPrimitive from '@radix-ui/react-label';
import styles from '../styles/RenderItem.module.scss'
import {useState} from 'react';

const StyledLabel = styled(LabelPrimitive.Root, {
  fontSize: 14,
  fontVariationSettings: `"wght" 650`,
  color: blackA.blackA12,
  userSelect: 'none',
  letterSpacing: 2,
});

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

export const RenderItemRow = ({title, number, link, published, updated, children, ...props}) => {
  const [isHovering, setIsHovering] = useState(false)
  return(
    <section
      {...props}
      className={styles.renderTitles}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <StyledLabel>
        <span className={`${styles.ExpandingLabel} ${isHovering ? styles.ExpandedLabel : ''}`}>
          li
        </span>
        .{pad(number, 3)}
      </StyledLabel>
      <div>
        <p>{title}</p>
        {children}
        {/*/!*{published ? *!/*/}
        {/*<StyledLabel>Soon to be public</StyledLabel>*/}
        {/*/!*}*!/*/}
      </div>
    </section>
  )
}

export const ThumbnailRow = ({title, created, current = false, ...props}) => {
  return(
    <div className={styles.thumbnailTiles} {...props}>
      <p>{title}</p>
      <p>{created}</p>
    </div>
  )
}