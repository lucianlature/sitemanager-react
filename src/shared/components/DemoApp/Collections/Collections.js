import React, { ReactComponent, PropTypes } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Table from 'antd/lib/table'
import Tag from 'antd/lib/tag'
import Button from 'antd/lib/button'
import Modal from 'antd/lib/modal'
import { default as CollectionCreateForm } from '../CollectionCreateForm'

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


const Collections = React.createClass({
  getInitialState() {
    return { visible: false };
  },

  showModal() {
    this.setState({ visible: true });
  },

  handleCancel() {
    this.setState({ visible: false });
  },

  handleCreate() {
    const form = this.form;
    form.validateFields((err, values) => {
      if (err) {
        return;
      }

      console.log('Received values of form: ', values);
      form.resetFields();
      this.setState({ visible: false });
    });
  },

  saveFormRef(form) {
    this.form = form;
  },

  render() {
    const { collections, loading, loadMoreEntries } = this.props;

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
      title: 'Recipes',
      dataIndex: 'recipes_count',
      sorter: true,
      render: slug => (<Tag color={color.blue}>{slug}</Tag>),
    }, {
      title: 'Title',
      dataIndex: 'title',
      sorter: true,
    }, {
      title: 'Actions',
      key: 'action',
      render: (text, record) => (
        <span>
          <ButtonToNavigateEditPage to={`/collection/${record.id}/edit`} {...this.props} />
          <span className="ant-divider" />
          <Button type="danger" onClick={confirm}>Delete</Button>
        </span>
      ),
    }];

    const pagination = {
      total: 24,
      showSizeChanger: true,
      onShowSizeChange: (current, pageSize) => {
        console.log('Current: ', current, '; PageSize: ', pageSize);
      },
      onChange: (current) => {
        console.log('Current: ', current);
        loadMoreEntries();
      },
    };

    return (
      <section>
        <div>You are now at {this.props.location.pathname}</div>
        <Button type="primary" style={{left: "90%", position: "relative", marginBottom: "12px"}} onClick={this.showModal}>Create New Collection</Button>
        <CollectionCreateForm
          ref={this.saveFormRef}
          visible={this.state.visible}
          onCancel={this.handleCancel}
          onCreate={this.handleCreate}
        />
        <Table
          pagination={false}
          columns={columns}
          rowKey={(record, key) => key}
          dataSource={collections}
          loading={loading}
          pagination={pagination}
        />
      </section>
    );
  }
});

Collections.propTypes = {
  location: PropTypes.object.isRequired
}

const COLLECTIONS_QUERY = gql`
  query CollectionsQuery($offset: Int, $limit: Int) {
    collections(offset: $offset, limit: $limit) {
      id
      slug
      title
      recipes_count
    }
  }
`;

const ITEMS_PER_PAGE = 10

export default graphql(COLLECTIONS_QUERY, {
  options() {
    return {
      variables: {
        offset: 0,
        limit: ITEMS_PER_PAGE,
      },
      forceFetch: true,
    };
  },
  props({ data: { loading, collections, fetchMore } }) {
    return {
      loading,
      collections,
      loadMoreEntries() {
        return fetchMore({
          // query: ... (you can specify a different query. COLLECTIONS_QUERY is used by default)
          variables: {
            // We are able to figure out which offset to use because it matches
            // the collections length, but we could also use state, or the previous
            // variables to calculate this (see the cursor example below)
            offset: collections.length,
          },
          updateQuery: (previousResult, { fetchMoreResult }) => {
            if (!fetchMoreResult.data) { return previousResult; }
            return Object.assign({}, previousResult, {
              // Append the new collections results to the old one
              collections: [...previousResult.collections, ...fetchMoreResult.data.collections],
            });
          },
        });
      },
    };
  },
})(withRouter(Collections))
