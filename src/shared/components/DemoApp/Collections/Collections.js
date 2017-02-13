import React from 'react';
// import { Link, Match } from 'react-router';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Table from 'antd/lib/table';
import Tag from 'antd/lib/tag';

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

const Collections = (props) => {
  const columns = [
    {
      title: 'NAME',
      dataIndex: 'name',
    }, {
      title: 'STATUS',
      dataIndex: 'status',
      render: text => (<Tag color={status[text].color}>{status[text].text}</Tag>),
    }, {
      title: 'DATE',
      dataIndex: 'date',
      render: text => new Date(text).format('yyyy-MM-dd'),
    },
  ];

  return (
    <Table pagination={false} columns={columns} rowKey={(record, key) => key} dataSource={null} />
  );
};

export default graphql(gql`query CollectionsQuery { collections { id, slug, title } }`)(Collections)
