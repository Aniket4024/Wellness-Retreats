import style from "../../CSS/Buttons.module.css"


export const FilledButton = ({title,clickEvent,styling})=>{
    return <button onClick={clickEvent ? clickEvent : ""} style={styling} className={style.FilledButton}>{title}</button>
}