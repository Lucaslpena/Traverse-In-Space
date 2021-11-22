import  { Client } from "@notionhq/client";
import { getPageTitle, getAllPagesInSpace } from 'notion-utils'
import { Collection, CollectionRow, NotionRenderer } from 'react-notion-x'
import styles from '../styles/Home.module.scss';
import {RenderItemRow, SubscribeForm} from '../components';
import {InfoCircledIcon} from '@radix-ui/react-icons';
// import { NotionAPI } from 'notion-client'

// const notion = new NotionAPI()

export default function Blog({data}) {
  console.log(data)
  return (
    <main>
      Blog
    </main>
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

  // const cleaned = database.results.map(o => ({
  //   title: o.properties.title.title[0].plain_text,
  //   published: o.properties.state.select.name === 'publicizing',
  // }));

  const pageId = "1faef10c-fe58-4858-b456-99e14b9c6c51"
  return {
    props: {data: database}, // will be passed to the page component as props
  }
}