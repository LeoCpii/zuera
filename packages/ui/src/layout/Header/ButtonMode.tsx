import { useTheme } from '../../theme';
import Icon from '../../components/Icon';
import ButtonIcon from '../../components/ButtonIcon';

interface ButtonModeProps { onUpdateMode: () => void; }
export default function ButtonMode({ onUpdateMode }: ButtonModeProps) {
    const { theme } = useTheme();

    const modeIcon = theme.palette.mode === 'dark' ? 'moon' : 'sun';

    return (
        <ButtonIcon onClick={onUpdateMode} color="text.secondary">
            <Icon name={modeIcon} />
        </ButtonIcon>
    );
}