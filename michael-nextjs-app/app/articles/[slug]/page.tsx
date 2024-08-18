import axios from 'axios';
import ArticleContent from '../../../components/ArticleContent';

const fetchArticle = async (slug: string) => {
  const response = await axios.get(`http://localhost:1337/api/articles/${slug}`);
  return response.data;
};

interface ArticlePageProps {
  params: { slug: string };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = params;
  let data;
  try {
    data = await fetchArticle(slug);
  } catch (error) {
    return (
      <div>Error loading article</div>
    );
  }

  return <ArticleContent data={data} />;
}