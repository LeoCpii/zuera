
import Icon from '../../components/Icon';
import Button from '../../components/Button';

interface ButtonGuideProps { onStartGuide: () => void; }
export default function ButtonGuide({ onStartGuide }: ButtonGuideProps) {
    return (
        <Button
            size="small"
            variant="text"
            startIcon={<Icon name="question-circle" />}
            onClick={onStartGuide}
        >
            Ajuda
        </Button>
    );
}