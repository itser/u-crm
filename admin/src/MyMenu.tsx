import { Menu } from 'react-admin';

export const MyMenu = () => (
    <Menu>
        <Menu.ResourceItem name="transactions" />
        <Menu.ResourceItem name="categories" />
        <Menu.ResourceItem name="accounts" />
        <Menu.ResourceItem name="clients" />
    </Menu>
);