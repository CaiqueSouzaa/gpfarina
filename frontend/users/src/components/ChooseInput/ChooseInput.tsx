import styles from './ChooseInput.module.css';

export interface ChooseInputProps {
    title: string;
    value: string;
    onChange: (value: string) => void;
}

// @ts-ignore
const ChooseInput = ({ onChange, title, value }: ChooseInputProps) => {
    return (
        <label className={styles.chooseInput}>
            <span>Redefinir senha após primeiro acesso</span>
            <select className={styles.select} onChange={(e) => onChange(e.target.value)}>
                <option value="true">Sim</option>
                <option value="false">Não</option>
            </select>
        </label>
    );
}

export default ChooseInput;