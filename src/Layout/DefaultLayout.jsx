import Header from "../Components/Header/Header";
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';

function DefaultLayout({ children }) {
     return (
          <Row wrap={false}>
               <Col flex="55px"><Header /></Col>
               <Col flex="auto">{children}</Col>
          </Row>

     );
}

export default DefaultLayout;

DefaultLayout.propTypes = {
     children: PropTypes.node
}