import { useEffect, useState } from 'react'
import style from '../CSS/Services.module.css'
import ServiceCard from './CommonComponents/ServiceCard'
import axios from 'axios'
import { FilledButton } from './CommonComponents/Buttons'


const formatEventDate = (timestamp, duration) => {
    const startDate = new Date(timestamp * 1000);
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + duration - 1);

    const options = { month: 'long', year: 'numeric' };
    const startMonthYear = startDate.toLocaleDateString('en-US', options);
    const startDay = startDate.getDate();
    const endDay = endDate.getDate();

    return `${startMonthYear.split(' ')[0]} ${startDay}-${endDay}, ${startMonthYear.split(' ')[1]}`;
};


const Services = () => {
    const [loading,setLoading] = useState(false);
    const [error,setError] = useState(false);
    const [data,setData] = useState([])
    const [pagination,setPagination] = useState(1)
    const [totalPages,setTotalPages] = useState(1);
    const [filterOptions,setFilterOptions] = useState([])
    const [dateOptions,setDateOptions] = useState([])
    const [filter,setFilter] = useState("")
    const [search,setSearch] = useState("")

    const handleFilter = (e)=>{
        setFilter(e?.target?.value)
    }

    const handleSearch = (e)=>{
        setSearch(e?.target?.value)
    }

        

    
    useEffect(()=>{
        
        // data fetching using API
        axios.get(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats`)
        .then((res)=>{
            setTotalPages(Math.ceil(res?.data?.length / 6))
    
            const uniqueTypes = Array.from(new Set(res?.data?.map(event => event.type)));
            const uniqueTags = Array.from(new Set(res?.data?.flatMap(event => event.tag)));


            setFilterOptions([...uniqueTypes,...uniqueTags])

        })
        .catch((err)=>{
            console.log(err)
        })


        // data fetching using API according to pagination | filter | search
        setLoading(true)
        axios.get(`https://669f704cb132e2c136fdd9a0.mockapi.io/api/v1/retreats?page=${pagination}&limit=6&filter=${filter}&search=${search}`)
        .then((res)=>{
            setLoading(false)
            setData(res.data)
        })
        .catch((err)=>{
            console.log(err)
            setError(true)
        })
        
    },[pagination,filter,search])

  

  return <section id={style.Services}>

    {/* Options section */}
    <div id={style.options} className='flex'>

        {/* filter */}
        <div className='flex'>

            {/* filter by date */}
            <select name="" id="" 
                // onChange={(e)=>handleDate(e)}
            >
                <option value="">Filter by Date</option>
                {
                    dateOptions?.map((e,i)=>{
                        return <option key={i} value={e} >{e}</option>
                    })
                }
            </select>
            
            {/* filter by type */}
            <select name="" id="" onChange={(e)=>handleFilter(e)}>
                <option value="">Filter by Type</option>
                {
                    filterOptions?.map((e,i)=>{
                        return <option key={i} value={e} >{e}</option>
                    })
                }
            </select>

        </div>


        {/* search */}
        <div className='flex'>
            <input type="search" placeholder='Search retreats by title' value={search} onChange={(e)=>handleSearch(e)}/>
        </div>

    </div>



    {/* services list */}
    {
        loading ? <div className={`${style.loadingContainer} flex`}> <div className={style.spinner}></div> </div>
        :
        data ?
            <div id={style.servicesList}>
                {
                data?.map((e)=>{
                        return <ServiceCard key={e?.id} {...e} date={formatEventDate(e.date, e.duration)}/>
                    })
                    
                }
            </div>
        :
        error ? "Something wen wrong, Try after a minute!"
        :
        "No Data Found"
    }


    {/* pagination */}
    <div id={style.pagination} className='flex'>
        <FilledButton title={"Previous"} clickEvent={()=>setPagination(p=> p>1 ? p-1 : 1)}/>

        <input type="number" value={pagination} onChange={(e)=> setPagination(e?.target?.value)} disabled={ pagination==1 ? true : pagination==totalPages ? true : false }/>
        
        <FilledButton  title={"Next"} clickEvent={()=>setPagination(p=> p < totalPages ? p + 1 : totalPages)}/>
    </div>

  </section>
}

export default Services
