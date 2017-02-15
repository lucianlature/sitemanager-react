import React, { PureComponent } from 'react';
import Button from 'antd/lib/button'
import Form from 'antd/lib/form'
import Input from 'antd/lib/input'
// import { graphql } from 'react-apollo';
// import gql from 'graphql-tag';
import Breadcrumb from 'antd/lib/breadcrumb'

const FormItem = Form.Item;

const CollectionEditForm = Form.create()(React.createClass({
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                span: 14,
                offset: 6,
            },
        };

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormItem
                    {...formItemLayout}
                    label="slug"
                ><Input type="text" /></FormItem>
                <FormItem
                    {...formItemLayout}
                    label="title"
                ><Input type="text" /></FormItem>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">Save</Button>
                </FormItem>
            </Form>
        )
    }
}))

class CollectionEdit extends PureComponent {
  render() {
    // const { collections } = this.props.data;

    return (
      <section>
        {/* <div>You are now at {this.props.location.pathname}</div> */}
        <Breadcrumb separator="&raquo;">
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item><a href="">Collections List</a></Breadcrumb.Item>
            <Breadcrumb.Item>Edit Collection</Breadcrumb.Item>
        </Breadcrumb>
        <CollectionEditForm />
      </section>
    );
  }
};

export default CollectionEdit //graphql(gql`query CollectionsQuery { collections { id, slug, title } }`)(withRouter(Collections))
