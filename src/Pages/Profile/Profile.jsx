import { useContext } from 'react';
import { AppContext } from '../../Context/AppContext';
import UserCard from './Components/UserCard/UserCard';
import './Profile.scss';

function Profile() {
     const { userLogin } = useContext(AppContext);

     return (
          <div className="profile-page">
               {/* <Container>
                    <Row>
                         <Col md={4} className='user-card-block'>
                              <UserCard
                                   avatar={userLogin.avatar.link}
                                   fullname={userLogin.full_name}
                                   nickname={userLogin.nickname}
                                   location={userLogin.location}
                                   friends={userLogin.friends}
                                   rating={userLogin.rating}
                              />
                         </Col>
                    </Row>
               </Container> */}
          </div>
     );
}

export default Profile;