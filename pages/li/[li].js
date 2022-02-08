import styles from '../../styles/li.module.scss'
import {
  fetchPageData,
  notionLookup,
  fetchPagesDataFromSlug,
  cleanDates,
  fetchMasterDatabaseHeaders,
  lookupLinkDatabase
} from '../../lib/NotionFetcher';
import { RenderItemRow, ThumbnailRow } from '../../components';
import { NotionRenderer } from "react-notion";
import { useInView } from 'react-intersection-observer';
import {useCallback, useEffect, useRef, useState} from 'react';

const LinterDupe = () => {
  return useInView(
    { threshold: 0,
      rootMargin: '-300px'}
  );
}

const LI = ({pageData, livingIdea}) => {

  const pageRefs = pageData.map(d => {
    const { ref, inView, entry } = LinterDupe();
    return({ ref, inView, entry})
  })
  const domRefs = useRef([])

  const [article, setArticle] = useState(0)
  useEffect(() => {
    console.log({pageRefs})
    if (pageRefs && pageRefs.some(x => x.inView === true)){
      const currentPage = pageRefs.length - pageRefs.reverse().findIndex(x => x.inView === true)
      if (currentPage !== article+1){
        console.log(`changing to ${currentPage}`)
        setArticle(currentPage-1)
      }
    }
  }, [pageRefs]);

  const scrollToPos = (articleNum) => {
    console.log(articleNum)
    console.log({dom: domRefs.current})
    // domRefs.current[articleNum].scrollIntoView({behavior: 'smooth'});
    window.scrollTo({top: domRefs.current[articleNum].offsetTop-(16 * 3), behavior: 'smooth'});
    setArticle(articleNum)
  }

  const generateText = () => (
    pageData.map((d, i) => (
      <section
        key={i}
        className={styles.notionPage}
        ref={pageRefs[i].ref}
        // style={{backgroundColor: pageRefs[i].inView ? 'red' : 'green'}}
      >
        <div ref={ref=>domRefs.current.push(ref)} >
          <h3>{d.title}</h3>
          <NotionRenderer blockMap={d.data}/>
        </div>
      </section>
    ))
  )

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
    pageData.map((d, i) => {
        // console.log(i)
        return( <ThumbnailRow
            title={d.title}
            created={d.header.created}
            key={i}
            active={(article === i)}
            clickCallback={() => scrollToPos(i)}
          />
        )
      }
    )
  )

  return(
    <main className={styles.LivingIdea}>
      <aside className={styles.toc}>
        <section>
          {generateHeader()}
          {generateThumbnails()}
        </section>
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
export default LI;

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
