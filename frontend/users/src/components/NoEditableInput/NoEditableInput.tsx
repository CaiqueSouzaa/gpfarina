import styles from './NoEditableInput.module.css';

export interface NoEditableInputProps {
    title: string;
    value: string | undefined;
}

const NoEditableInput = ({ title, value }: NoEditableInputProps) => {
    return (
        <label className={styles.input}>
            <span>{title}</span>
            <input readOnly={true} type="text" value={value ? value : ''} />
        </label>
    );
};

export default NoEditableInput;
