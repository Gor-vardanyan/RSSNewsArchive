import dayjs from 'dayjs';
import 'dayjs/locale/es';
import utc from'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.extend(utc);
dayjs.extend(timezone);

export default { 
    defaultColums: [
        {
            title: "Title",
            render : row => row.title
        },
        {
            title: "Description",
            render : row => row.description
        },    
        {
            title: "Date",
            render : row => {
                return <div style={{ width:"6em" }}>
                    { dayjs( row.pubDate ).tz("Europe/Madrid").local().format("DD-MM-YYYY") }
                </div>
            },
            sorter: (a, b) => {
                let ini = dayjs( a.pubDate ).tz("Europe/Madrid").local().unix();
                let bini = dayjs( b.pubDate ).tz("Europe/Madrid").local().unix();
                if ( ini === bini ) ini++
                
                return ini - bini ;
            },
            sortDirections: ['descend','ascend'],
            defaultSortOrder: 'descend',
        }
    ]
}