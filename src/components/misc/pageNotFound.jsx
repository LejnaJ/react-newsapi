import './pageNotFound.scss';

const PageNotFound = () => {
    return(
        <div className="err-wrapper">
          
            <div className="err-num">404</div>
            <div className="err-text">Oh no! Page not found. Click <a href="/">here</a> to go home!</div>
        </div>
    )
};
export default PageNotFound;