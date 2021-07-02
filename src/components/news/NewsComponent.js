import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import slugify from "slugify";

import defaultPic from "../../assets/img/default.jpg"
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
const NewsComponent = () => {
  const news = useSelector((state) => state.allNews.news);
  console.log('New component', news)
  const renderList = news.map((article, i) => {
    const { source, title, content, urlToImage, publishedAt } = article;
    const slug = slugify(title);

    //Remove the remaining characters number
    let newContent = "";
    if (content && content.length > 0)
      newContent = (content).replace(/\[\+\d+ chars\]$/, "");

    //Set default pic in case we get error on imgUrl
    const imageErr = (e) => {
      e.target.src = defaultPic;
    }

    return (
      <Col xs={12} md={6} lg={4} className="col-card">
        <Card key={Math.floor(Math.random() * 10000000)} style={{ height: '100%' }} >
          <Card.Img variant="top" onError={imageErr} src={(urlToImage) ? urlToImage : defaultPic} />

          <Card.Body>
            <div className="date"> {new Date(publishedAt).toLocaleDateString()}</div>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              {newContent}
            </Card.Text>
            <div className="seemore-wrapper"> <Link to={`/news/${slug}`}>
              <Button variant="dark">Read more</Button>
            </Link>
            </div>
          </Card.Body>
        </Card>
      </Col>


    )
  })

  return (
    <>{renderList}</>
  );

};
export default NewsComponent;