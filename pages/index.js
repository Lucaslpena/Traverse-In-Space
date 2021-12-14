import Image from 'next/image'
import styles from '../styles/Home.module.scss'

import { getPageTitle, getAllPagesInSpace } from 'notion-utils'
// import { NotionAPI } from 'notion-client'
import { Collection, CollectionRow, NotionRenderer } from 'react-notion-x'

import  { Client } from "@notionhq/client";
import {RenderItemRow, SubscribeForm} from '../components';

import { InfoCircledIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import {fetchFields, fieldTypes} from '../lib/NotionDatabaseHelper';


export default function Home({data}) {
  console.log(data)

  const generateRenders = () => {
    return(
      <div className={styles.content}>
        <p><InfoCircledIcon/>&nbsp;Soon to be explored:</p>
        <div>
          { data.map((o,i) => (
            <RenderItemRow
              key={i}
              title={o.name}
              link={null}
              number={i}
              published={o.published}
              updated={null}
            />))}
        </div>
      </div>
    )
  }

  return (
    <main>
      <div className={styles.container}>

        <h1 className={styles.title}>
          Traverse <span>in Space</span>
        </h1>

        <p className={styles.description}>
          Emergent technologies, designed systems, and our social brain are part of a vast landscape that interlinks current and future value creation.
          <br /><br />
          This space:
          <span>
              <ChevronRightIcon />
              establishing meta-meaning and axiomatic exploration of selected tangents within this landscape
            </span>
          <span>
              <ChevronRightIcon />
              is a system representing value creation within my practice—the development of living ideas.
            </span>
        </p>

        <p className={styles.description}>
          Starting in 2022 this space will regularly communicate new living ideas and invite practitioners in intersubjective spaces to engage in a monthly discussion/workshop cadence around a selected living idea.
        </p>

        <SubscribeForm />

        { generateRenders() }
      </div>

      {/*<footer className={styles.footer}>*/}
      {/*  <a href="https://lucaslorenzo.digital/" target="_blank" rel="noopener noreferrer">A project by Lucas Lorenzo Pena</a>*/}
      {/*</footer>*/}
    </main>
  )
}

export async function getStaticProps(context) {
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })

  const databaseId = 'acae535a6e524f88aef67ac379fd3e12';
  const database = await notion.databases.query({
    database_id: databaseId,
    sorts: [
      {
        property: 'Month',
        direction: 'ascending',
      },
    ],
  })

  // add filter to make sure we dont get new & incomplete field
  // https://github.com/makenotion/notion-sdk-js
  const data = fetchFields(database.results, [
    {title: 'Name', type: fieldTypes.string},
    {title: 'Month', type: fieldTypes.dateSingle},
    {title: 'Price', type: fieldTypes.number},
    {title: 'Slug', type: fieldTypes.text},
    {title: 'Published', type: fieldTypes.select},
  ])

  const meta = data.pop()
  data.unshift(meta)
  return { props: { data: data} }
}