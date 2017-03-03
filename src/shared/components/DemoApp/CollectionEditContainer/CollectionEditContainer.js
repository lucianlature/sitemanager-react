import React from 'react'

import Breadcrumb from 'antd/lib/breadcrumb'
import CollectionEditForm from './CollectionEditForm'

export default () => (
    <section>
        <Breadcrumb separator="&raquo;">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Collections List</a></Breadcrumb.Item>
            <Breadcrumb.Item>Edit Collection</Breadcrumb.Item>
        </Breadcrumb>
        <div style={{ background: '#FAFAFA', padding: '30px', marginTop: '20px' }}>
            <CollectionEditForm collectionID="10" />
        </div>
    </section>
);
