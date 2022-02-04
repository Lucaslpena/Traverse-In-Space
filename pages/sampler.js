import "react-notion/src/styles.css";
import { NotionRenderer } from "react-notion";
import { fetchPageData } from '../lib/NotionFetcher';

export async function getStaticProps() {
  const data  = await fetchPageData('38e770d1999a48d9a3fffb2067e3f073')
  // https://www.notion.so/lucaslorenzop/Innovation-at-Concepcion-c6bbb30e4f66474c9f2ce6a8877e05f3
  // https://www.notion.so/lucaslorenzop/Axioms-of-Trust-The-Foundation-of-All-Things-2f1ac65e5e3c4c90a6541989c006f073
  // https://lucaslorenzop.notion.site/Axioms-of-Trust-The-Foundation-of-All-Things-2f1ac65e5e3c4c90a6541989c006f073
  // https://www.notion.so/lucaslorenzop/Trust-38e770d1999a48d9a3fffb2067e3f073

  return {
    props: {
      blockMap: data
    }
  };
}

export default ({ blockMap }) => (
  <div style={{ maxWidth: 768 }}>
    <NotionRenderer blockMap={blockMap} />
  </div>
);