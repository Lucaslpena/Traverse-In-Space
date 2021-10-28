import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import { getPageTitle, getAllPagesInSpace } from 'notion-utils'
// import { NotionAPI } from 'notion-client'
import { Collection, CollectionRow, NotionRenderer } from 'react-notion-x'

import  { Client } from "@notionhq/client";
import {RenderItemRow} from '../components';
export default function Home({data}) {
  console.log(data)
  const generateRenders = () => {
    return(
      <div className={styles.content}>
        { data.map((o,i) => (
          <RenderItemRow
            key={i}
            title={o.title}
            link={null}
            number={i+1}
            published={o.published}
            updated={null}
          />))}
      </div>
    )
  }
  return (
    <div className={styles.container}>


      <main className={styles.main}>
        <h1 className={styles.title}>
          Traverse in Space
        </h1>

        <p className={styles.description}>
          Emergent technologies, designed systems, and our social brain are part of a vast landscape that interlinks the current and future of value creation.
          <br /><br />
          Through intuitive insights, axiomatic explorations, living ideas, and engineered renders, this space traverses that landscape as a developmental and meta-developmental synthesis of my practice.
          <br /><br />
          Below is a short list of topics soon to be made available.
        </p>

        { generateRenders() }

      </main>

      <footer className={styles.footer}>
        <a href="https://lucaslorenzo.digital/" target="_blank" rel="noopener noreferrer">A project by Lucas Lorenzo Pena</a>
      </footer>
    </div>
  )
}

export async function getStaticProps(context) {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const databaseId = '42a2e53ca0584e8398dad4a013e430f9';
  const database = await notion.databases.query({
    database_id: databaseId,
    filter: {
      or:[
        {
          property: "state",
          select: {
            "equals": "publicizing"
          }
        },
        {
          property: "state",
          select: {
            "equals": "drafting"
          }
        }
      ]
    },
    sorts: [
      {
        property: 'updated',
        direction: 'ascending',
      },
    ],
  })

  const cleaned = database.results.map(o => ({
    title: o.properties.title.title[0].plain_text,
    published: o.properties.state.select.name === 'publicizing',
  }));
  return {
    props: {data: cleaned, ...database}, // will be passed to the page component as props
  }
}