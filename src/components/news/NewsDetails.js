import {  useSelector } from 'react-redux'
import { useParams } from 'react-router'
import slugify from 'slugify'
import defaultPic from "../../assets/img/default.jpg"
export const NewsDetails = () => {
	const { newsId } = useParams()
	const news = useSelector((state) => state.allNews.news)

	const rendernews = news.find((article) => slugify(article.title) === newsId)

	if (!news || news.length === 0 || !rendernews) {
		return (
			<section>
				<h2>Post not found!</h2>
			</section>
		)
	}

 //Set default pic in case we get error on imgUrl
 const imageErr = (e) => {
	e.target.src = defaultPic;
  }

	const { title, content, source, author, description, urlToImage, publishedAt, url } = rendernews

	return (
		<div className="article-wrapper">
			<div className="article-column-wrapper">
				<div className="article left-section">
					<h1 className="article-title">{title}</h1>
					<p className="description">Description: {description}</p>

					<div className="article-source-author">
						<p>Source: {source.name}</p>
						<p>Author: {author}</p>
					</div>
					<div className="date"> {new Date(publishedAt).toLocaleDateString()}</div>
				</div>
				<div className="article right-section">
					<img onError={imageErr} src={urlToImage ? urlToImage : 'defaultPic'} alt="pic" />
				</div>
			</div>
			<p dangerouslySetInnerHTML={{ __html: content }} className="article-content"></p>
			<div className="article-source-link">
				If you want to read the original article,{' '}
				<a href={url} target="_blank" rel="noreferrer">
					click here
				</a>
			</div>
		</div>
	)
}
export default NewsDetails
