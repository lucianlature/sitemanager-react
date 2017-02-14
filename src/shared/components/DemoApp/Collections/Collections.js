import React, { PureComponent, PropTypes } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Table from 'antd/lib/table'
import Tag from 'antd/lib/tag'
import Button from 'antd/lib/button'
import Modal from 'antd/lib/modal'

import { color } from '../theme';

const status = {
  1: {
    color: color.green,
    text: 'SALE',
  },
  2: {
    color: color.yellow,
    text: 'REJECT',
  },
  3: {
    color: color.red,
    text: 'TAX',
  },
  4: {
    color: color.blue,
    text: 'EXTENDED',
  },
};

const confirm = () => {
  Modal.confirm({
    title: 'Confirm',
    content: 'Are you sure you want to delete it?',
    okText: 'OK',
    cancelText: 'Cancel',
  })
}

const ButtonToNavigateEditPage = withRouter(({ push, to }) => (
    <Button onClick={() => push(to)}>Edit</Button>
  )
);
ButtonToNavigateEditPage.propTypes = {
  push: PropTypes.func.isRequired,
};


class Collections extends PureComponent {
  render() {
    const { collections } = this.props.data;

    const columns = [{
      title: 'ID',
      dataIndex: 'id',
      sorter: true,
    },
    {
      title: 'Slug',
      dataIndex: 'slug',
      sorter: true,
      render: slug => (<Tag color={color.green}>{slug}</Tag>),
    }, {
      title: 'Title',
      dataIndex: 'title',
      sorter: true,
    }, {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <span>
          <ButtonToNavigateEditPage to={`/collections/${record.id}`} {...this.props} />
          <span className="ant-divider" />
          <Button type="danger" onClick={confirm}>Delete</Button>
        </span>
      ),
    }];

    return (
      <section>
        <div>You are now at {this.props.location.pathname}</div>
        <Table
          pagination={false}
          columns={columns}
          rowKey={(record, key) => key}
          dataSource={collections} 
        />
      </section>
    );
  }
};

Collections.propTypes = {
  location: PropTypes.object.isRequired
}

export default graphql(gql`query CollectionsQuery { collections { id, slug, title } }`)(withRouter(Collections))
