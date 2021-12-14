export const fieldTypes = {
  dateSingle: 'dateSingle',
  string: 'string',
  number: 'number',
  text: 'text',
  select: 'select'
}

// Fetch fields for Index
// (https://lucaslorenzop.notion.site/acae535a6e524f88aef67ac379fd3e12?v=063ae95f0e06442fac5badcd577611b2)
export function fetchFields(data, fields){
  return data.map(o=> {
    return fields.map(f => {
      if (o.properties[f.title]){
        let returnable
        if (f.type === fieldTypes.dateSingle){
          returnable =  o.properties[f.title].date ? o.properties[f.title].date.start : null
        }
        else if (f.type === fieldTypes.text){
          returnable =  o.properties[f.title].rich_text.length > 0 ? o.properties[f.title].rich_text[0].plain_text : null
        }
        else if (f.type === fieldTypes.number){
          returnable =  o.properties[f.title].number || null
        }
        else if (f.type === fieldTypes.select){
          returnable =  o.properties[f.title].select.name
        }
        else {
          returnable =  o.properties[f.title].title[0].plain_text
        }
        const obj = {}
        obj[f.title.toLowerCase()] = returnable
        return obj
      }
    })
  }).map(d => Object.assign({}, ...d))
}