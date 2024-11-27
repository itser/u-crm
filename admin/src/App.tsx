import {Admin, Resource, ShowGuesser} from "react-admin";
import { dataProvider } from "./dataProvider";
import { ClientList, ClientEdit, ClientCreate } from "./clients";
import { CategoriesList, CategoryEdit, CategoryCreate } from "./categories";
import { AccountsList, AccountEdit, AccountCreate } from "./accounts";
import {TransactionsList, TransactionEdit, TransactionCreate} from "./transactions";
import polyglotI18nProvider from 'ra-i18n-polyglot';
import ukrainianMessages from 'ra-language-ukrainian';
import { MyLayout } from './MyLayout';

// @ts-ignore
const i18nProvider = polyglotI18nProvider(() => ukrainianMessages, 'ua');

export const App = () => (
  <Admin layout={MyLayout} dataProvider={dataProvider} i18nProvider={i18nProvider}>
      <Resource name="transactions" list={TransactionsList} edit={TransactionEdit} create={TransactionCreate} show={ShowGuesser} options={ {label: "Транзакції"} } />
      <Resource name="categories" list={CategoriesList} edit={CategoryEdit} create={CategoryCreate} show={ShowGuesser} options={ {label: "Категорії"} } />
      <Resource name="accounts" list={AccountsList} edit={AccountEdit} create={AccountCreate} show={ShowGuesser} options={ {label: "Рахунки"} } />
      <Resource name="clients" list={ClientList} edit={ClientEdit} create={ClientCreate} show={ShowGuesser} options={ {label: "Клієнти"} } />
  </Admin>
);
