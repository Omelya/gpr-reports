import ClipLoader from "react-spinners/ClipLoader";

export const Spinner = () => {
    return (
        <ClipLoader
            color={'#ffffff'}
            loading={true}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
    );
}
