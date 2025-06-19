import Avatar from '../../components/Avatar';

export interface User {
    name: string;
    email: string;
    picture: string;
}

interface ButtonProfileProps { user: User; onProfile: () => void; }
export default function ButtonProfile({ user, onProfile }: ButtonProfileProps) {
    const { name, picture } = user;

    return (
        <Avatar
            alt={name}
            name={name}
            src={picture}
            sx={{
                backgroundColor: ({ secondary }) =>
                    picture
                        ? 'transparent'
                        : secondary.main
            }}
            onClick={onProfile}
        />
    );
}