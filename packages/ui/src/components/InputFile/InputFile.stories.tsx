import { useState } from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { generateBytesSize } from '@zuera/toolkit/file';

import { Control, Form, FormControl, useForm } from '../Form';
import InputFile from './InputFile';

const meta: Meta<typeof InputFile> = {
    title: 'components/Fields/InputFile',
    component: InputFile,
};

export const InputFileTemplate: StoryObj<typeof InputFile> = {
    render: () => {
        const [files, setFiles] = useState<File[]>([]);

        const handleChange = (files: File[]) => {
            setFiles(files);
        };

        return (
            <InputFile
                files={files}
                onChange={handleChange}
                helperText="Tamanho máximo 200MB"
            />
        );
    }
};

export const InputFileControlled: StoryObj<typeof InputFile> = {
    render: () => {
        const [formGroup] = useForm<{ files: File[] }>({
            form: {
                files: new FormControl({ defaultValue: [] })
            },
            handle: {
                change: (form) => { console.debug('change', form.values); }
            }
        }, []);

        return (
            <Form formGroup={formGroup} debug>
                <Control
                    controlName="files"
                    action="onChange"
                    type="object"
                    field={(control) => (
                        <InputFile
                            maxSize={generateBytesSize(30, 'KB')}
                            files={control.value}
                            error={control.isInvalid}
                            helperText={control.error || 'Tamanho máximo 30BK'}
                        />
                    )}
                />
            </Form>
        );
    }
};

export default meta;
