import styles from '../../styles/li.module.scss'
import {fetchPageData, notionLookup, fetchPagesDataFromSlug, cleanDates} from '../../lib/NotionFetcher';
import { NotionRenderer } from "react-notion";

export default function li({pageData}) {

  const generateText = () => (
    pageData.map((d, i) => (
      <section key={i} className={styles.notionPage}>
        <NotionRenderer blockMap={d}/>
      </section>
    ))
  )

  return(
    <main className={styles.LivingIdea}>
      {/*<aside className={styles.toc}>*/}
      {/*  living idea with relevant articles, overview of the sections in the article*/}
      {/*</aside>*/}
      <article>
        { generateText() }
      {/*  <section>*/}
      {/*    <NotionRenderer blockMap={pageData[0]} />*/}
      {/*  </section>*/}
      {/*  <section>*/}
      {/*  </section>*/}
      {/*  <section>thoughts 3 on trust</section>*/}
      </article>
      {/*<aside className={styles.visual}>*/}
      {/*  branches of trust here*/}
      {/*</aside>*/}
    </main>
  )
}

export async function getStaticProps(context) {
  console.log({context})
  // const pageReference = notionLookup.find(n => context.params.li === n.slug)
  // console.log(pageReference)
  //
  // const pagesData = await Promise.all(
  //   pageReference.pages.map(async (p) => await fetchPageData(p))
  // )

  const pagesData = cleanDates(await fetchPagesDataFromSlug(context.params.li));

  // console.log({pagesData: pagesData[0]['f0e8c5d6-8d09-44f8-97c9-4b86d5c37691'].value.properties.title[0]})

  // const pagesData  = await fetchPageData('38e770d1999a48d9a3fffb2067e3f073')
  return { props: { pageData: pagesData} }
}

export async function getStaticPaths() {
  return {
    // paths: [
    //   { params: { li: 'meta' } },
    //   { params: { li: '001' } }
    // ],
    paths: notionLookup.map(n => ({params: { li: n.slug }})),
    fallback: false
  };
}
