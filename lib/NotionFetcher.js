import  { Client } from "@notionhq/client";

const fetchPageData = async (page_id) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${process.env.NOTION_COOKIE_V2}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return await fetch(`https://notion-api.splitbee.io/v1/page/${page_id}`, requestOptions)
    .then(res => {
        console.log(res.status)
        // console.log(res.body)
        return res.json()
      }
    );
}

const notionLookup = [
  /*
  This object is used to map 'li's to notion pages.
  // todo -- replace this hard coded object with a table fetch in notion to lookup relevant pages
   */
  {slug: 'meta', meta: 'Meta [on Living Ideas]', number: 0, pages: ['14efb174e0e748d9a52fe0e6094336b6']},
  {slug: '001', meta: 'Trust', number: 1, pages: ['2f1ac65e5e3c4c90a6541989c006f073', '6afaa3bc574343268662fb8f6e8e42f5']}
]

const fetchPagesDataFromSlug = async(slug) => {
  return await Promise.all(
    notionLookup
      .find(n => slug === n.slug).pages
      .map(async (p) => await fetchPageData(p))
  )
}

const cleanDates = (data) => {
  data.forEach(d => {
    for (let k in d) {
      if (d[k]["value"]
        && d[k]["value"].properties
        && d[k]["value"].properties.title
        && d[k]["value"].properties.title.some(t =>  t.includes("‣"))
      ){
        // console.log('hit')
        const indexTitle = d[k]["value"].properties.title.map( (_,i) => i).filter(i => d[k]["value"].properties.title[i].includes("‣"))
        // console.log({indexTitle})
        const index = d[k]["value"].properties.title[indexTitle].indexOf("‣")
        // console.log({index: index})
        // console.log({changed: [d[k]["value"].properties.title[indexTitle][1][0][1].start_date]})
        d[k]["value"].properties.title[indexTitle] = [d[k]["value"].properties.title[indexTitle][1][0][1].start_date];
      }
    }
  })
  return data
}

const fetchMasterDatabaseHeaders = async (slug) => {
  const databaseId= '42a2e53ca0584e8398dad4a013e430f9'
  const notion = new Client({
    auth: process.env.NOTION_TOKEN,
  })
  const database = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and:[
        {
          property: "state",
          select: {
            "equals": "publicizing"
          }
        },
        {
          property: "destination",
          select: {
            "equals": "traversing-in.space"
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
  // console.log(database.results.map(x => x.properties['created'].date.start))
  return database.results.map(x => ({
    title: x.properties.title.title[0].plain_text,
    subDestination: x.properties['sub-destination'].multi_select[0].name,
    created: x.properties['created'].date.start
  }))
}

const lookupLinkDatabase = (pagesData, dbHeaders) => {
  return pagesData.map(data => {
    const pageTitle = Object.values(data).find(y => y.value.type === 'page' ).value.properties.title[0][0]
    const header = dbHeaders.find( dh => dh.title === pageTitle)
    return {
      title: pageTitle,
      header,
      data
    }
  })
}

export {
  fetchPageData,
  notionLookup,
  fetchPagesDataFromSlug,
  cleanDates,
  fetchMasterDatabaseHeaders,
  lookupLinkDatabase
}