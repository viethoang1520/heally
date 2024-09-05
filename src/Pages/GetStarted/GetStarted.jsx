import { Badge, Calendar } from 'antd';
const getListData = (value) => {
     let listData = []; // Specify the type of listData
     switch (value.date()) {
          case 8:
               listData = [
                    {
                         type: 'warning',
                         content: 'This is warning event.',
                    },
                    {
                         type: 'success',
                         content: 'This is usual event.',
                    },
               ];
               break;
          case 10:
               listData = [
                    {
                         type: 'warning',
                         content: 'Bận.',
                    },
                    {
                         type: 'success',
                         content: 'Bận.',
                    },
                    {
                         type: 'error',
                         content: 'Bận.',
                    },
               ];
               break;
          case 15:
               listData = [
                    {
                         type: 'warning',
                         content: 'Rảnh',
                    },
                    {
                         type: 'success',
                         content: 'Rảnh.....',
                    },
                    {
                         type: 'error',
                         content: 'Rảnh....',
                    },
                    {
                         type: 'error',
                         content: 'Rảnh....',
                    },
                    {
                         type: 'success',
                         content: 'Khá rảnh',
                    },
                    {
                         type: 'error',
                         content: 'This is error event 4.',
                    },
               ];
               break;
          default:
     }
     return listData || [];
};
const getMonthData = (value) => {
     if (value.month() === 8) {
          return 1394;
     }
};
const GetStarted = () => {
     const monthCellRender = (value) => {
          const num = getMonthData(value);
          return num ? (
               <div className="notes-month">
                    <section>{num}</section>
                    <span>Backlog number</span>
               </div>
          ) : null;
     };
     const dateCellRender = (value) => {
          const listData = getListData(value);
          return (
               <ul className="events">
                    {listData.map((item) => (
                         <li key={item.content}>
                              <Badge status={item.type} text={item.content} />
                         </li>
                    ))}
               </ul>
          );
     };
     const cellRender = (current, info) => {
          if (info.type === 'date') return dateCellRender(current);
          if (info.type === 'month') return monthCellRender(current);
          return info.originNode;
     };
     return <Calendar cellRender={cellRender} />;
};
export default GetStarted;