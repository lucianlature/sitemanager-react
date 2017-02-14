import React, { PureComponent } from 'react';
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
import Breadcrumb from 'antd/lib/breadcrumb'

class CollectionEdit extends PureComponent {
  render() {
    // const { collections } = this.props.data;

    return (
      <section>
        <div>You are now at {this.props.location.pathname}</div>
        <Breadcrumb separator="&raquo;">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Collections List</a></Breadcrumb.Item>
            <Breadcrumb.Item>Edit Collection</Breadcrumb.Item>
        </Breadcrumb>
      </section>
    );
  }
};

export default CollectionEdit //graphql(gql`query CollectionsQuery { collections { id, slug, title } }`)(withRouter(Collections))
