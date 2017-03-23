import React from 'react';
import { withRouter } from 'react-router-dom';

// Anty stuff
import Form from 'antd/lib/form'
import Button from 'antd/lib/button'
import Upload from 'antd/lib/upload'
import Icon from 'antd/lib/icon'
import message from 'antd/lib/message'
import Table from 'antd/lib/table'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Input from 'antd/lib/input'
import Tabs from 'antd/lib/tabs'
import PanelBox from '../../../PanelBox'

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;

/*
function beforeUpload(file) {
  const isJPG = file.type === 'image/jpeg';
  if (!isJPG) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJPG && isLt2M;
}

class CollectionCover extends React.Component {
  render() {
    const imageUrl = ''; // this.state.imageUrl;
    return (
      <Upload
        className="avatar-uploader"
        name="avatar"
        showUploadList={false}
        action="/upload.do"
        beforeUpload={beforeUpload}
        onChange={this.handleChange}
      >
        {
          imageUrl ?
            <img src={imageUrl} alt="" className="avatar" /> :
            <Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
    );
  }
}
*/
const featuredColumns = [{
  title: 'Title',
  dataIndex: 'title',
  key: 'title',
  render: text => <a href="#">{text}</a>,
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href="#">Featured 一 {record.title}</a>
      <span className="ant-divider" />
      <a href="#">Preview</a>
    </span>
  ),
}];

const contentColumns = [{
  title: 'ID',
  dataIndex: 'id',
  key: 'id',
}, {
  title: 'Content Type',
  dataIndex: 'type',
  key: 'type',
}, {
  title: 'Title',
  dataIndex: 'title',
  key: 'title',
}, {
  title: 'Action',
  key: 'action',
  render: (text, record) => (
    <span>
      <a href={record.id}>Featured</a>
      <span className="ant-divider" />
      <a href={record.id}>Preview</a>
      <span className="ant-divider" />
      <a href={record.id}>Remove</a>
    </span>
  ),
}];

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

export default ({ data: { collection } }) => (
    <Form>
        <PanelBox>
            <Row>
                <Col span={8}>
                    <FormItem
                        {...formItemLayout}
                        label="Title"
                    ><Input type="text" defaultValue={collection.title} /></FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Friendly URL"
                    ><Input type="text" defaultValue={collection.slug}/></FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Short description"
                    ><Input type="text" defaultValue={collection.short_description}/></FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="Description"
                    ><Input type="textarea" defaultValue={collection.description}/></FormItem>
                </Col>
                <Col span={8}>
                    <FormItem
                        {...formItemLayout}
                        label="DFP ad tag"
                    ><Input type="text" defaultValue={collection.dfp_tag}/></FormItem>
                    <FormItem
                        {...formItemLayout}
                        label="DFP ad keyword"
                    ><Input type="text" defaultValue={collection.dfp_keyword}/></FormItem>
                    <div>Collection Cover Image Uploader goes here!</div>
                </Col>
                <Col span={8}>
                    <h3>ADMIN</h3>
                    <dl>
                        <dt>ID</dt>
                        <dd>{collection.id}</dd>
                        <dt>Created</dt>
                        <dd>{collection.created_at}</dd>
                        <dt>Last Edited</dt>
                        <dd>{collection.updated_at}</dd>
                    </dl>
                </Col>
            </Row>
        </PanelBox>
        <Row>
            <Col>
                <PanelBox title="Featured Content">
                    <Table showHeader={false} rowKey={(record) => record.id} columns={featuredColumns} dataSource={collection.items.filter(item => item.position > 20000)} />   
                </PanelBox>
            </Col>
        </Row>
        <PanelBox title="All content">
            <Tabs defaultActiveKey="1">
                <TabPane tab="All" key="1">
                    <Table rowKey={(record) => record.id} columns={contentColumns} dataSource={collection.items} />
                </TabPane>
                <TabPane tab="Articles" key="2">
                    <Table rowKey={(record) => record.id} columns={contentColumns} dataSource={collection.items.filter(item => item.type === 'article')} />
                </TabPane>
                <TabPane tab="Recipes" key="3">
                    <Table rowKey={(record) => record.id} columns={contentColumns} dataSource={collection.items.filter(item => item.type === 'recipe')} />
                </TabPane>
            </Tabs>
        </PanelBox>
        <Row>
            <Col>
                <FormItem {...tailFormItemLayout}>
                    <Button type="primary" htmlType="submit" size="large">Save</Button>
                </FormItem>
            </Col>
        </Row>
    </Form>
);