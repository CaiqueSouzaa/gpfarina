import style from './Button.module.css';

export interface ButtonProps {
    onClick: () => void;
    text: string;
    type: 'submit' | 'button';
    backgroundColor: '#FBD16D' | '#9F9F9F';
}

const Button = ({ onClick, text, type, backgroundColor }: ButtonProps) => {
    const styles = {
        backgroundColor: backgroundColor,
    }
    return (
        <button className={style.button} style={styles} type={type} onClick={onClick}>{text}</button>
    );
};

export default Button;
