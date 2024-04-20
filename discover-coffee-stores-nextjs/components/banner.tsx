import styles from "./banner.module.css";

type IProps = {
    buttonText: string;
    handleOnClick: () => void;
}

const Banner = (props: IProps) => {
    return (
        <div className={styles.container}>
            <h1 className={styles.title}>
                <span className={styles.title1}>Coffee</span>
                <span className={styles.title2}>Connoisseur</span>
            </h1>
            <p className={styles.subTitle}>Discover your local coffee stores!</p>
            <div className={styles.buttonWrapper}>
                <button className={styles.button} onClick={props.handleOnClick}>
                    {props.buttonText}
                </button>
            </div>
        </div>
    );
};

export default Banner;