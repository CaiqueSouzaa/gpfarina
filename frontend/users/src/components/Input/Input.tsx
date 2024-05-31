import styles from './Input.module.css';

export interface InputProps {
    title: string;
    type: 'text' | 'password' | 'email';
    onChange: (e: string) => void;
    value: string;
    id?: string;
    icon?: {
        src: string;
        onClick?: () => void;
    };
}

const Input = ({ title, onChange, type, value, id, icon }: InputProps) => {
    const security = type === 'password' ? 'true' : 'false';
    const widgetIcon = icon ? <div className={styles.eyeLogo} onClick={icon.onClick}><img src={icon.src} alt="eye-logo.svg" /></div> : '';

    return (
        <div>
            <label className={styles.input}>
                <span>{title}</span>
                <div className={styles.inputAndEye}>
                    <input id={id} security={security} type={type} value={value} onChange={(e) => onChange(e.target.value)}/>
                    { widgetIcon }
                </div>
            </label>
        </div>
    );
};

export default Input;
