const fetchPageData = async (page_id) => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${process.env.NOTION_COOKIE_V2}`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
  };

  return await fetch(`https://notion-api.splitbee.io/v1/page/${page_id}`, requestOptions)
    .then(res => res.json());
}


/*
This function is used to map 'li's to notion pages.
// todo -- replace this hard coded object with a table fetch in notion to lookup relevant pages
 */

const notionLookup = [
  {slug: 'meta', meta: 'Meta [of Living Ideas]', pages: ['14efb174e0e748d9a52fe0e6094336b6']},
  {slug: '001', pages: ['2f1ac65e5e3c4c90a6541989c006f073', '6afaa3bc574343268662fb8f6e8e42f5']}
]

const fetchPagesDataFromSlug = async(slug) => {
  return await Promise.all(
    notionLookup
      .find(n => slug === n.slug).pages
      .map(async (p) => await fetchPageData(p))
  )
}

const cleanDates = (data) => {
  console.log('cleaning')

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


export {
  fetchPageData,
  notionLookup,
  fetchPagesDataFromSlug,
  cleanDates
}