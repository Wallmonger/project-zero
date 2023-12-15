import './Loader.css';

const Loader = ({ loadingMsg, styling}) => {
    return (
        <>
            <div className="loader"></div>
            <p className={styling}>
                { loadingMsg }
            </p>
        </>
    )
}

export default Loader