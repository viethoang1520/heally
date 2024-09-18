import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import './Profile.scss';
import { Row, Col, Button } from 'antd';

function Profile() {
     const { userLogin } = useContext(AppContext);
     console.log(userLogin);

     return (
          <div className="profile-page">
               <div className="btn-block">
                    <Button type="primary">Primary Button</Button>
                    <Button>Default Button</Button>
                    <Button type="text" danger>
                         Text
                    </Button>
               </div>

               <div className="container user-infor-top">
                    <Row>
                         <Col md={3} className='avatar-block'>
                              <img className='avatar-img' src={userLogin.avatar.link} alt="" />
                         </Col>

                         <Col md={10}>
                              <h1>alo</h1>
                         </Col>
                    </Row>
               </div>
          </div>
     );
}

export default Profile;