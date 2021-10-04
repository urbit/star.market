interface BubbleLinkTypes {
    className?: string;
    title?: string;
    caption?: string;
    children?: JSX.Element;
    href?: string;
    target?: string;
}

export default function BubbleLink(props:BubbleLinkTypes) {
    return (
        <li className={'bubbleLink ' + props.className}>
            <a href={props.href} target={props.target}>
            {
                props.children
            }
            <div className="textGroup">
                <p className="title">
                    {props.title}
                </p>
                <p className="caption">
                    {props.caption}
                </p>
            </div>
            </a>
        </li>
    )
}

BubbleLink.defaultProps = {
    className: '',
    title: '',
    caption: '',
    children: <div className="bubble" />,
    target: '_blank'
}