import {
    List,
    Datagrid,
    TextField,
    EditButton,
    Edit,
    Create,
    SimpleForm,
    TextInput,
    ReferenceField,
    DateField,
    NumberField,
    NumberInput,
    ReferenceInput,
    RadioButtonGroupInput,
    DateTimeInput,
    AutocompleteInput,
    FunctionField,
    DateInput,
    DatagridProps,
    useListContext,
} from "react-admin";
import React, { ReactNode } from 'react';

const validatePrice = (value: number | undefined ): string | undefined => {
    if (value === undefined || value === null || value === 0) {
        return 'Ціна обов’язкова';
    }
    if (value <= 0) {
        return 'Ціна повинна бути більше нуля';
    }
    return undefined;
};

const transactionFilters = [
    <ReferenceInput source="accountId" label="Рахунок" reference="accounts" alwaysOn />,
    <ReferenceInput source="clientId" label="Клієнт" reference="clients" alwaysOn />,
    <ReferenceInput source="categoryId" label="Категорія" reference="categories" alwaysOn />,
    <DateInput source="date_from" label="Від дати" alwaysOn />,
    <DateInput source="date_to" label="До дати" alwaysOn />
];
interface SumFooterProps {
    field: string;
}

const SumFooter: React.FC<SumFooterProps> = ({ field }) => {
    const { data } = useListContext();

    const sum = React.useMemo(() => {
        return data ? Object.values(data).reduce((total, record) => total + (parseFloat(record[field]) || 0), 0) : 0;
    }, [data, field]);

    return (
        <tfoot>
        <tr>
            <td colSpan={8} style={{ textAlign: 'right', padding: '10px' }}>
                Звгальна сума сторінки:
            </td>
            <td style={{ textAlign: 'right', fontWeight: 'bold' }}>
                {sum.toFixed(2)} грн.
            </td>
        </tr>
        </tfoot>
    );
};

interface CustomDatagridProps extends DatagridProps {
    footerField: string; // Назва поля для футера
    children: ReactNode; // Вкладені компоненти (колонки)
}

const CustomDatagrid: React.FC<CustomDatagridProps> = ({ children, footerField }) => {
    return (
        <>
            <Datagrid rowClick={false}>
                {children}
            </Datagrid>
            <SumFooter field={footerField} />
        </>
    );
};

export const TransactionsList = () => (
    <List filters={transactionFilters}>
        <CustomDatagrid footerField="summ">
            <TextField source="id" />
            <DateField source="createdAt" showTime label="Дата транзакции" />
            <ReferenceField source="accountId" reference="accounts" label="З рахунку" />
            <ReferenceField source="clientId" reference="clients" label="На рахунок" />
            <ReferenceField source="categoryId" reference="categories" label="Категорія" />
            <FunctionField source="typeId" label="Тип" render={record => record.typeId === 1 ? 'Дохід' : 'Витрата' } /> //TODO
            <NumberField source="summ" label="Сума операції" options={{
                style: 'currency',
                currency: 'UAH',
                minimumFractionDigits: 2,
                textAlign: 'left'
            }} />
            <EditButton />
        </CustomDatagrid>
    </List>
);

const filterToQuery = (searchText: string) => ({ name: `%${searchText}%` });

export const TransactionEdit = () => (
    <Edit>
        <SimpleForm>
            <RadioButtonGroupInput
                source="typeId"
                label="Тип"
                choices={[
                    { id: 1, name: 'Дохід' },
                    { id: 2, name: 'Витрата' },
                ]}
                defaultValue={1}
            />
            <NumberInput
                label="Сума"
                source="summ"
                defaultValue={0}
                validate={validatePrice}
                min={0}
                step={0.01}
            />
            <ReferenceInput source="categoryId" reference="categories">
                <AutocompleteInput label="Виберіть категорію" filterToQuery={filterToQuery} />
            </ReferenceInput>
            <ReferenceInput source="accountId" reference="accounts">
                <AutocompleteInput label="З рахунку" filterToQuery={filterToQuery} />
            </ReferenceInput>
            <ReferenceInput source="clientId" reference="clients">
                <AutocompleteInput label="На рахунок" filterToQuery={filterToQuery} />
            </ReferenceInput>
            <DateTimeInput
                source="createdAt"
                label="Дата транзакції"
                defaultValue={new Date().toISOString()}
                parse={(date: Date) => (date ? date.toISOString() : null)}
            />
            <TextInput label="Коментар" source="comment" defaultValue='' multiline fullWidth/>
        </SimpleForm>
    </Edit>
);

export const TransactionCreate = () => (
    <Create>
        <SimpleForm>
            <RadioButtonGroupInput
                source="typeId"
                label="Тип"
                choices={[
                    { id: 1, name: 'Дохід' },
                    { id: 2, name: 'Витрата' },
                ]}
                defaultValue={1}
            />
            <NumberInput
                label="Сума"
                source="summ"
                defaultValue={0}
                validate={validatePrice}
                min={0}
                step={0.01}
            />
            <ReferenceInput source="categoryId" reference="categories">
                <AutocompleteInput label="Виберіть категорію"  filterToQuery={filterToQuery} />
            </ReferenceInput>
            <ReferenceInput source="accountId" reference="accounts">
                <AutocompleteInput label="З рахунку"  filterToQuery={filterToQuery} />
            </ReferenceInput>
            <ReferenceInput source="clientId" reference="clients">
                <AutocompleteInput label="На рахунок" filterToQuery={filterToQuery} />
            </ReferenceInput>
            <DateTimeInput
                source="createdAt"
                label="Дата транзакції"
                defaultValue={new Date().toISOString()}
                parse={(date: Date) => (date ? date.toISOString() : null)}
            />
            <TextInput label="Коментар" source="comment" defaultValue='' multiline fullWidth/>
        </SimpleForm>
    </Create>
);