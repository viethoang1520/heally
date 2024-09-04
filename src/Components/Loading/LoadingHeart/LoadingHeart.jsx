import './LoadingHeart.scss';

function LoadingHeart() {
     return (
          <div className="loading-heart overlay">
               <div className="cssload-main">
                    <div className="cssload-heart">
                         <span className="cssload-heartL"></span>
                         <span className="cssload-heartR"></span>
                         <span className="cssload-square"></span>
                    </div>
                    <div className="cssload-shadow"></div>
               </div>
          </div>
     );
}

export default LoadingHeart;