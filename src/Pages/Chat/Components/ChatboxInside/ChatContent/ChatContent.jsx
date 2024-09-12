import classNames from 'classnames';
import PropTypes from 'prop-types';
import './ChatContent.scss';

function ChatContent({ text, receive, send }) {
     return (
          <div className="chat-content">
               <p className={classNames('text-box', { 'receive': receive }, { 'send': send })}>{text}</p>
               {/* <span className={classNames('time', { 'receive': receive }, { 'send': send })}>12:99</span> */}
          </div>
     );
}

export default ChatContent;

ChatContent.propTypes = {
     text: PropTypes.string,
     receive: PropTypes.bool,
     send: PropTypes.bool
}

