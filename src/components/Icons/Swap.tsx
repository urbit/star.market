interface SwapProps {
    className?: string
}

export default function Swap(props:SwapProps) {
    return (
        <svg className={props.className} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M8.01912 16.6287L11.5677 13.0801L12.6284 14.1407L7.26912 19.5L1.96582 14.1967L3.02648 13.136L6.51912 16.6287L6.51912 5.71142H8.01912V16.6287Z" fill="black"/>
            <path fillRule="evenodd" clipRule="evenodd" d="M17.0194 7.83274L13.4708 11.3814L12.4102 10.3207L17.7694 4.96142L23.0727 10.2647L22.0121 11.3254L18.5194 7.83274V18.75L17.0194 18.75V7.83274Z" fill="black"/>
        </svg>
    )
}

Swap.defaultProps = {
    className: ''
}