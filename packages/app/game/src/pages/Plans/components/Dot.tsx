export default function Dot({ color }: { color: string }) {
    return (
        <div style={{
            width: 10,
            height: 10,
            background: color,
            borderRadius: 50
        }} />
    );
}