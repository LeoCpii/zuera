import type { HTMLAttributes } from 'react';

import { joinClass } from '../../utils';
import Logo from '../../components/Logo';
import Stack from '../../components/Stack';

import './Header.scss';

interface HeaderProps extends HTMLAttributes<HTMLDivElement> {
    actions?: React.JSX.Element;
    buttonProfile?: React.JSX.Element;
}
export default function Header({
    actions,
    buttonProfile,
    ...props
}: HeaderProps) {
    return (
        <div className={joinClass(['ui-header', props.className])} {...props}>
            <div className="ui-header__logo">
                <button aria-label="Ir para tela inicial">
                    <Logo width={75} secondary="text.primary" />
                </button>
            </div>

            {
                (
                    actions || buttonProfile) && (
                    <Stack orientation="row" justifyContent="flex-end" alignItems="center">
                        {actions}
                        {buttonProfile}
                    </Stack>
                )
            }
        </div>
    );
}