import Tooltip from '@zuera/ui/components/Tooltip';
import './Color.scss';

interface ColorProps { color: string; }
export default function Color({ color }: ColorProps) {
    return (
        <Tooltip label={color}>
            <div className="color" style={{ background: color }} />
        </Tooltip>
    );
}