import './LoadingRadar.scss';

function LoadingRadar() {
     return (
          <div className='loading-radar overlay'>
               <div className="loader">
                    <span></span>

                    <div id="dot-1" className="dot"></div>
                    <div id="dot-2" className="dot"></div>
                    <div id="dot-3" className="dot"></div>
                    <div id="dot-4" className="dot"></div>
                    <div id="dot-5" className="dot"></div>
               </div>

          </div>
     );
}

export default LoadingRadar;