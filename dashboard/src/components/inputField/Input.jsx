export default function Input(props) {
    const {label, setData, data, inputType, classStyle, autoFocus, focus, blur, val} = props;
    return (
        <>
            <label>{label}</label>
            {
                inputType === 'textarea' ? <textarea className={classStyle} placeholder={data} onChange={e=>setData(e.target.value)} autoFocus={autoFocus} onFocus={focus} onBlur={blur}/> :
                <input type="text" placeholder={data} onChange={e=>{e.persist();setData(e.target.value)}} className={classStyle} autoFocus={autoFocus} onFocus={focus} onBlur={blur} value={val}/>
            }    
        </>
    )
}