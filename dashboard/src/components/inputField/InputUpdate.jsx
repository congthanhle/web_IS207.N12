export default function InputUpdate(props) {
    const {setData, data, inputType, classStyle, autoFocus} = props;
    return (
        <>
            {
                inputType === 'textarea' ? <textarea type="text" className={classStyle} value={data} onChange={e=>setData(e.target.value)} autoFocus={autoFocus}/> :
                <input type="text" value={data} onChange={e=>setData(e.target.value)} className={classStyle} autoFocus={autoFocus} />
            }
            
        </>
    )
}