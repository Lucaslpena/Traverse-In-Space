import { styled } from '@stitches/react';
import { blackA } from '@radix-ui/colors';
import * as LabelPrimitive from '@radix-ui/react-label';
import styles from '../styles/RenderItem.module.scss'
import {useState} from 'react';
import { StyledLabel } from '.';
import { useRouter } from 'next/router'

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

export const RenderItemRow = ({title, number, link, published, updated, children, ...props}) => {
  const router = useRouter()
  const [isHovering, setIsHovering] = useState(false)

  return(
    <section
      {...props}
      className={published ? styles.renderTitlesPublished : styles.renderTitles}
      onClick={(published && link) ? () => router.push(`/li/${link}`) : null}
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
        <p style={{opacity: (published ? 1 : 0.4 ) }}>{title}</p>
        {children}
        {/*/!*{published ? *!/*/}
        {/*<StyledLabel>Soon to be public</StyledLabel>*/}
        {/*/!*}*!/*/}
      </div>
    </section>
  )
}

export const ThumbnailRow = ({title, created, active = false, clickCallback, ...props}) => {
  return(
    <div
      className={active ? styles.thumbnailTilesActive : styles.thumbnailTiles}
      onClick={clickCallback}
      {...props}
    >
      <p>{title}</p>
      <em>{created}</em>
    </div>
  )
}