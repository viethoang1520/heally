import Header from "../Components/Header/Header";
import PropTypes from 'prop-types';
import { Col, Row } from 'antd';

function DefaultLayout({ children }) {
     return (
          <Row>
               <Col span={1}><Header /></Col>
               <Col span={23}>{children}</Col>
          </Row>

     );
}

export default DefaultLayout;

DefaultLayout.propTypes = {
     children: PropTypes.node
}