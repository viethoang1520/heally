import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { useEffect, useState } from "react";
import { propTypes } from "prop-types";
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { getAvatar, getTypeAvatar } from "../../../../apis/avatar";
import { LoadingVocado } from "../../../../Components";
import Avatar from "./Avatar/Avatar";
import './SelectAvatar.scss';

function SelectAvatar() {
     const [listAvatar, setListAvatar] = useState([]);
     const [listTypeAvatar, setListTypeAvatar] = useState([]);
     const [isLoading, setIsLoading] = useState(false);

     const fetchAvatar = async (id) => {
          const { data } = await getAvatar(id);
          setListAvatar(data.message);
     }

     const handleSelectType = (id) => {
          fetchAvatar(id);
     }

     useEffect(() => {
          const fetchType = async () => {
               const { data } = await getTypeAvatar();
               setListTypeAvatar(data.message);
               if (listAvatar.length == 0) {
                    fetchAvatar(data.message[0]._id);
               }
          }
          if (listTypeAvatar.length == 0) {
               fetchType();
          }
     }, [listTypeAvatar, listAvatar]);

     const responsive = {
          desktop: {
               breakpoint: { max: 3000, min: 1024 },
               items: 5,
               slidesToSlide: 3 // optional, default to 1.
          },
          tablet: {
               breakpoint: { max: 1024, min: 464 },
               items: 2,
               slidesToSlide: 2 // optional, default to 1.
          },
          mobile: {
               breakpoint: { max: 464, min: 0 },
               items: 1,
               slidesToSlide: 1 // optional, default to 1.
          }
     }

     const responsiveSmall = {
          desktop: {
               breakpoint: { max: 3000, min: 1024 },
               items: 5,
               slidesToSlide: 3 // optional, default to 1.
          },
          tablet: {
               breakpoint: { max: 1024, min: 464 },
               items: 2,
               slidesToSlide: 2 // optional, default to 1.
          },
          mobile: {
               breakpoint: { max: 464, min: 0 },
               items: 1,
               slidesToSlide: 1 // optional, default to 1.
          }
     }

     const CustomLeftArrow = ({ onClick }) => {
          CustomLeftArrow.propTypes = {
               onClick: propTypes.func
          }
          return (
               <button
                    onClick={() => onClick()}
                    style={{
                         position: "absolute",
                         left: "-14px",
                         top: "50%",
                         transform: "translateY(-50%)",
                         background: "transparent",
                         border: "none",
                         cursor: "pointer",
                         fontSize: '3rem',
                         opacity: '60%'
                    }}
               >
                    <Icon icon="iconamoon:arrow-left-2-bold" />
               </button>
          )
     }

     const CustomRightArrow = ({ onClick }) => {
          CustomRightArrow.propTypes = {
               onClick: propTypes.func
          }
          return (
               <button
                    onClick={() => onClick()}
                    style={{
                         position: "absolute",
                         right: "-14px",
                         top: "50%",
                         transform: "translateY(-50%)",
                         background: "transparent",
                         border: "none",
                         cursor: "pointer",
                         fontSize: '3rem',
                         opacity: '60%'
                    }}
               >
                    <Icon icon="iconamoon:arrow-right-2-bold" />
               </button>
          )
     }

     return (
          <div className="select-avatar">
               {isLoading && <LoadingVocado />}

               <h1 className="title">CHỌN ẢNH ĐẠI DIỆN CỦA BẠN</h1>

               <Carousel
                    responsive={responsiveSmall}
                    infinite={true}
                    containerClass="carousel-type-avatar"
                    customLeftArrow={<CustomLeftArrow />}
                    customRightArrow={<CustomRightArrow />}
               >
                    {listTypeAvatar.map((type) => {
                         return (
                              <p
                                   key={type._id}
                                   className="type"
                                   onClick={() => handleSelectType(type._id)}
                              >
                                   {type.type}
                              </p>
                         )
                    })}
               </Carousel>

               <Carousel
                    responsive={responsive}
                    infinite={false}
                    containerClass="carousel-container"
                    centerMode={true}
               >
                    {listAvatar.map((avatar) => {
                         return (
                              <Avatar
                                   key={avatar._id}
                                   avatar={avatar.link}
                                   id={avatar._id}
                                   price='0'
                              />
                         )
                    })}

               </Carousel>


          </div>
     )
}

export default SelectAvatar
