import styles from '../../styles/li.module.scss'
import {
  fetchPageData,
  notionLookup,
  fetchPagesDataFromSlug,
  cleanDates,
  fetchMasterDatabaseHeaders,
  lookupLinkDatabase
} from '../../lib/NotionFetcher';
import { RenderItemRow } from '../../components';
import { NotionRenderer } from "react-notion";
import {ThumbnailRow} from '../../components/RenderItem';

export default function li({pageData, livingIdea}) {

  const generateText = () => (
    pageData.map((d, i) => (
      <section key={i} className={styles.notionPage}>
        <NotionRenderer blockMap={d.data}/>
      </section>
    ))
  )


//     <div className={styles.thumbnails} key={1}>
//     <p>{d.title}</p>
//   <p>{d.header.created}</p>
// </div>

  const generateHeader = () => (
    <RenderItemRow
      title={livingIdea.meta}
      link={null}
      number={livingIdea.number}
      published={true}
      updated={null}
    />
  )

  const generateThumbnails = () => (
    pageData.map((d, i) =>
      <ThumbnailRow title={d.title} created={d.header.created} key={i}/>
    )
  )

  return(
    <main className={styles.LivingIdea}>
      <aside className={styles.toc}>
        <>
          {generateHeader()}
          {generateThumbnails()}
          </>
      </aside>
      <article>
        { generateText() }
      </article>
      {/*<aside className={styles.visual}>*/}
      {/*  branches of trust here*/}
      {/*</aside>*/}
    </main>
  )
}

export async function getStaticProps(context) {
  const pagesData = cleanDates(await fetchPagesDataFromSlug(context.params.li));
  const dbHeaders = await fetchMasterDatabaseHeaders();
  const linkedData = lookupLinkDatabase(pagesData, dbHeaders)
  return { props: { pageData: linkedData, livingIdea: notionLookup.find(x => x.slug === context.params.li) } }
}

export async function getStaticPaths() {
  return {
    paths: notionLookup.map(n => ({params: { li: n.slug }})),
    fallback: false
  };
}
