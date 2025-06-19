import { uuid } from '@zuera/toolkit/uuid';

import type { Colors } from '../../theme';

type Icon = React.JSX.Element;
type Message = React.JSX.Element | string;

export interface AlertData {
    icon?: Icon;
    color: Colors;
    message: Message;
    delay?: number;
}

export default class Alert {
    public visible = true;
    public readonly id = uuid();
    public readonly icon?: Icon;
    public readonly color!: Colors;
    public readonly message!: Message;
    public readonly delay: number = 5000;

    constructor({ color, message, delay, icon }: AlertData) {
        this.color = color;
        this.message = message;
        this.icon = icon;

        if (delay) { this.delay = delay; };
    }
}