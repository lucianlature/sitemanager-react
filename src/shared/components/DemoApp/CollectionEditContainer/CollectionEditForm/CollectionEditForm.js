import React from 'react'
import { graphql } from 'react-apollo'
import { pure, branch, renderComponent, compose } from 'recompose'
import gql from 'graphql-tag'

import Spin from 'antd/lib/spin'
import Form from 'antd/lib/form'
import CollectionEdit from './CollectionEdit';

const data = graphql(gql`query CollectionQuery { 
  collection(id: 10) {
    id
    title   
    slug
    recipes_count
    articles_count
    description
    short_description
    dfp_keyword
    dfp_tag
    syndicated
    type
    updated_at
    created_at
    collection_status
    assets {
      id
      type
      url
    }
    items {
      id
      position
      type
      title
      thumb_url
    }
  } 
}`, {
  // The variable $collection_id for the query is computed from the
  // React props passed to this container.
  options: ({ collectionID }) => ({ variables: { collectionID } }),
});

// Define a very basic loading state component - you could make this
// a nice animation or something
const Loading = () => (
  <Spin size="large" />
);

// Define an HoC that displays the Loading component instead of the
// wrapped component when props.data.loading is true
const displayLoadingState = branch(
  (props) => props.data.loading,
  renderComponent(Loading),
);

// Put everything together!
export default compose(
  data,
  displayLoadingState,
  pure,
)(Form.create()(CollectionEdit));
