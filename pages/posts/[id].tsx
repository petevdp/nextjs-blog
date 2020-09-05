import Layout from "../../components/layout";
import { getAllPostIds, getPostData, postData } from "../../lib/posts";
import Date from "../../components/date";
import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import utilStyles from "../../styles/utils.module.css";

const Post: React.FunctionComponent<{postData: postData}> = ({ postData }) => {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <article>
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
    </Layout>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const id = params.id instanceof Array ? params.id[0] : params.id;
  const postData = await getPostData(id);
  return {
    props: { postData },
  };
};
