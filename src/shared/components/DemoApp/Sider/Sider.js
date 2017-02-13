import React from 'react';
// import { Icon } from 'antd/lib/icon';
// import { safeConfigGet } from '../../../utils/config';
import Menus from '../Menu';

function Sider () {
  const menusProps = {
    /*  
    siderFold,
    darkTheme,
    location,
    navOpenKeys,
    changeOpenKeys
    */
  };

  return (
    <div>
      <Menus {...menusProps} />
    </div>
  );
}

export default Sider;
