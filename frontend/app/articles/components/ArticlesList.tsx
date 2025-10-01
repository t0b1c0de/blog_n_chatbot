import { Article } from "../page";

interface ArticlesListProps {
  articles: Article[];
}

const ArticlesList = ({ articles }: ArticlesListProps) => {
  return (
    <div>
      {articles.map((article) => (
        <div key={article.id}>
          <h2 className="text-black-500 font-bold ">{article.title}</h2>
          <p>{article.date}</p>
          <p>{article.summary}</p>
        </div>
      ))}
    </div>
  );
};

export default ArticlesList;
