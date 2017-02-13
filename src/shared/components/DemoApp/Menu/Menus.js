import React from 'react';
import Menu from 'antd/lib/menu';
import Icon from 'antd/lib/icon';
import { Link } from 'react-router';
// import { menu } from '../../utils'

const menu = [{
  key: '',
  name: 'Home',
  icon: 'laptop',
},
{
  key: 'about',
  name: 'About',
  icon: 'list',
}];

const topMenus = menu.map(item => item.key);
const getMenus = function getMenus(menuArray, siderFold = null, parentPath) {
  parentPath = parentPath || '/';
  return menuArray.map(item => {
    if (item.child) {
      return (
        <Menu.SubMenu key={item.key} title={<span>{item.icon ? <Icon type={item.icon} /> : ''}{siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}</span>}>
          {getMenus(item.child, siderFold, parentPath + item.key + '/')}
        </Menu.SubMenu>
      );
    } else {
      return (
        <Menu.Item key={item.key}>
          <Link to={parentPath + item.key}>
            {item.icon ? <Icon type={item.icon} /> : ''}
            {siderFold && topMenus.indexOf(item.key) >= 0 ? '' : item.name}
          </Link>
        </Menu.Item>
      );
    }
  });
};

function Menus() {
  const menuItems = getMenus(menu);
  /*
  const onOpenChange = (openKeys) => {
    const latestOpenKey = openKeys.find(key => !(navOpenKeys.indexOf(key) > -1))
    const latestCloseKey = navOpenKeys.find(key => !(openKeys.indexOf(key) > -1))
    let nextOpenKeys = [];
    if (latestOpenKey) {
      nextOpenKeys = getAncestorKeys(latestOpenKey).concat(latestOpenKey)
    }
    if (latestCloseKey) {
      nextOpenKeys = getAncestorKeys(latestCloseKey)
    }
    changeOpenKeys(nextOpenKeys)
  }
  const getAncestorKeys = (key) => {
    const map = {
      // navChildParent: ['navParent'],
      navigation2: ['navigation']
    }
    return map[key] || []
  }
  */
  const menuProps = {};
  /*
  if(!siderFold) {//菜单栏收起时，不能操作openKeys
    menuProps = {
      onOpenChange: onOpenChange,
      openKeys: navOpenKeys
    }
  }
  */
  return (
    <Menu
      {...menuProps}
      mode="inline"
      theme="light"
    >{menuItems}</Menu>
  );
}

export default Menus;
