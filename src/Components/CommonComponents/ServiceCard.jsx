import style from '../../CSS/ServiceCard.module.css'

const ServiceCard = ({id,image,title,description,date,location,price}) => {
  return <div className={style.servicesCard}>

        {/* service image */}
        <img src={image ? image : require("../../Media/1ac230c9-b0d5-46c6-aa06-c40cc20c9557.png")} alt="" />


        {/* service info */}
        <div className={style.serviceInfo}>
            <h3>{title ? title : "Forest Yoga Retreat"}</h3>
            <p>{description ? description : "A weekend retreat focused on yoga and meditation to relieve stress. A weekend retreat focused on yoga and meditation to relieve stress."}</p>
            <p>Date: {date ? date : "June 10-15, 2024"}</p>
            <p>Location: {location ? location : "Redwood Forest, CA"}</p>
            <p>Price: ${price ? price : "1200"}</p>
        </div>

  </div>
}

export default ServiceCard
