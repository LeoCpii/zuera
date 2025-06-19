import { ChangeEvent, InputHTMLAttributes, useEffect, useMemo, useState } from 'react';

import { wait } from '@zuera/toolkit/promise';
import { getFileSize } from '@zuera/toolkit/file';

import Icon from '../Icon';
import Stack from '../Stack';
import Loading from '../Loading';
import ButtonIcon from '../ButtonIcon';
import Typography from '../Typography';
import { joinClass } from '../../utils';
import Zoom from '../../animations/Zoom';
import Slide from '../../animations/Slide';

import './InputFile.scss';

type State = 'empty' | 'dragging' | 'loading' | 'success' | 'error';

interface InputFileProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    files: File[];
    label?: string;
    error?: boolean;
    maxSize?: number;
    helperText?: string;
    onChange?: (files: File[]) => void;
}
export default function InputFile({
    files,
    error,
    maxSize,
    helperText,
    onChange,
    ...props
}: InputFileProps) {
    const [state, setState] = useState<State>('empty');

    const [_error, setError] = useState('');

    const isBlocked = useMemo(() => Boolean(!props.multiple) && Boolean(files.length), [files]);

    const classes = joinClass([
        'ui-input-file',
        state === 'dragging' && !isBlocked && 'ui-input-file--dragging',
        state === 'success' && 'ui-input-file--success',
        (error || state === 'error') && 'ui-input-file--error',
    ]);

    useEffect(() => { setError(_error); }, [error]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const targetFiles = e.target.files;

        const newFiles = targetFiles ? Array.from(targetFiles) : [];

        wait(() => setState('loading'), 0)
            .then(() => {
                if (!maxSize) { return; }

                const hasError = newFiles.some(file => file.size > maxSize);

                if (hasError) { throw `O arquivo não pode ser maior que ${getFileSize(maxSize)}`; }
            })
            .then(() => wait(() => setState('success'), 1000))
            .then(() => {
                if (!onChange) { return; }

                setError('');

                onChange([...files, ...newFiles]);
            })
            .catch((e) => wait(() => {
                setState('error');
                setError(e);
            }, 1000))
            .finally(() => wait(() => setState('empty'), 750));
    };

    const handleRemove = (nameFile: string) => {
        const newFiles = files.filter(file => file.name !== nameFile);

        if (!onChange) { return; }

        onChange(newFiles);
    };

    return (
        <Stack spacing="small">
            <div
                className={classes}
                onDragOver={() => setState('dragging')}
                onDragLeave={() => setState('empty')}
                onDrop={() => setState('empty')}
            >
                <input type="file"
                    {...props}
                    disabled={isBlocked}
                    onChange={handleChange}
                    onInput={() => ''}
                    onBlur={() => ''}
                />
                <Stack spacing="small" justifyContent="center" alignItems="center">
                    {
                        ['empty', 'dragging'].includes(state) && (
                            <Slide enter direction="top" style={{ textAlign: 'center' }}>
                                <Icon
                                    name={isBlocked ? 'image-check' : 'cloud-upload'}
                                    color={state === 'empty' ? 'text.secondary' : 'primary.main'}
                                    style={{ fontSize: 42 }}
                                />
                                <Typography
                                    noMargin
                                    color={state === 'empty' ? 'text.secondary' : 'primary.main'}
                                    variant="body2"
                                >
                                    {!isBlocked && props.multiple && 'Carrege seus arquivos aqui'}
                                    {!isBlocked && !props.multiple && 'Carrege seu arquivo aqui'}
                                    {isBlocked && 'Arquivo carregado'}
                                </Typography>
                            </Slide>
                        )
                    }
                    {
                        ['loading'].includes(state) && (
                            <Slide enter direction="top" style={{ textAlign: 'center' }}>
                                <Loading style={{ fontSize: 42 }} />
                                <Typography
                                    noMargin
                                    color={state === 'empty' ? 'text.secondary' : 'primary.main'}
                                    variant="body2"
                                >
                                    Carregando...
                                </Typography>
                            </Slide>
                        )
                    }
                    {
                        ['success'].includes(state) && (
                            <Zoom enter style={{ textAlign: 'center' }}>
                                <Icon
                                    name="check-circle"
                                    color="success.main"
                                    style={{ fontSize: 42 }}
                                />
                            </Zoom>
                        )
                    }
                    {
                        ['error'].includes(state) && (
                            <Zoom enter style={{ textAlign: 'center' }}>
                                <Icon
                                    name="exclamation-octagon"
                                    color="error.main"
                                    style={{ fontSize: 42 }}
                                />
                            </Zoom>
                        )
                    }
                </Stack>
            </div>

            <Typography noMargin variant="body2" color={_error ? 'error.main' : 'text.secondary'}>
                {_error || helperText}
            </Typography>

            <Stack>
                {
                    files && files.map((file, index) => (
                        <Zoom enter key={file.name} delay={(index + 1) * 100}>
                            <Stack

                                orientation="row"
                                alignItems="center"
                                className="ui-input-file__file-box"
                            >
                                <Icon name="file" />
                                <Stack orientation="column" style={{ gap: 0 }}>
                                    <Typography noMargin variant="body2" style={{ fontWeight: 600 }}>
                                        {file.name}
                                    </Typography>
                                    <Typography noMargin variant="body2" color="text.secondary">
                                        {getFileSize(file.size)}
                                    </Typography>
                                </Stack>
                                <ButtonIcon color="error.main" onClick={() => handleRemove(file.name)}>
                                    <Icon name="trash" />
                                </ButtonIcon>
                            </Stack>
                        </Zoom>
                    ))
                }
            </Stack>
        </Stack>
    );
}