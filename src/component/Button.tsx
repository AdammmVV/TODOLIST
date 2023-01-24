

type PropsType = {
    name: string
    callBack: ()=> void
    style: string
}

export const Button = (props: PropsType) => {
    const onClickHandler = () => {
        props.callBack()
    }
    return (
        <button className={props.style} onClick={onClickHandler}>{props.name}</button>
    )
}